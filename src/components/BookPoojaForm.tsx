import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { PoojaCombobox } from "./PoojaCombobox";
import DatePicker from "react-datepicker";
import { API_URL } from "@/config/api";

interface BookPoojaFormData {
  poojaIds: string[];
  name: string;
  email: string;
  phone: string;
  poojaDate: Date | null;
  mode: "online" | "offline";
  requireSamagri: boolean;
  language: "sanskrit" | "hindi" | "both";
  priest: "any" | "expert" | "specific";
  specificPriestId?: string;
  participants: number;
  address?: string;
  additionalServices: {
    recording: boolean;
    certificates: boolean;
    prasad: boolean;
  };
  message: string;
}

interface BookPoojaFormProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedPoojaIds?: string[];
}

export const BookPoojaForm = ({ isOpen, onClose, preSelectedPoojaIds = [] }: BookPoojaFormProps) => {
  console.log("Pre-selected Pooja IDs:", preSelectedPoojaIds);
  const handleChange = (field: keyof BookPoojaFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFeedbackOpen(false);
  };

  const [formData, setFormData] = useState<BookPoojaFormData>({
    poojaIds: preSelectedPoojaIds,
    name: "",
    email: "",
    phone: "",
    poojaDate: null,
    mode: "online",
    requireSamagri: false,
    language: "sanskrit",
    priest: "any",
    participants: 1,
    address: "",
    additionalServices: {
      recording: false,
      certificates: false,
      prasad: false,
    },
    message: "",
  });
    // 🔹 Sync whenever prop changes
  useEffect(() => {
    if (preSelectedPoojaIds.length > 0) {
      setFormData((prev) => ({
        ...prev,
        poojaIds: preSelectedPoojaIds,
      }));
    }
  }, [preSelectedPoojaIds]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be 10 digits";
    if (!formData.poojaDate) newErrors.poojaDate = "Date & Time is required";
    if (formData.poojaIds.length === 0) newErrors.poojaIds = "Select at least one Pooja";
    if (formData.participants < 1) newErrors.participants = "At least 1 participant is required";
    if (formData.mode === "offline" && !formData.address?.trim()) newErrors.address = "Address is required for offline mode";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/pooja-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          poojaDate: formData.poojaDate?.toISOString(),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setFeedbackMessage(data.error || "Failed to book Pooja");
        setFeedbackType("error");
      } else {
        setFeedbackMessage("Pooja booked successfully!");
        setFeedbackType("success");
        // Reset form
        setFormData({
          poojaIds: [],
          name: "",
          email: "",
          phone: "",
          poojaDate: null,
          mode: "online",
          requireSamagri: false,
          language: "sanskrit",
          priest: "any",
          participants: 1,
          address: "",
          additionalServices: { recording: false, certificates: false, prasad: false },
          message: "",
        });
      }
    } catch (err) {
      console.error(err);
      setFeedbackMessage("Something went wrong!");
      setFeedbackType("error");
    } finally {
      setFeedbackOpen(true);
      setLoading(false);
    }
  };

  const minDateTime = new Date().toISOString().slice(0, 16);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <label className="text-2xl font-bold mb-4 block text-center">Book Pooja</label>
          <DialogDescription className="text-center mb-6 text-muted-foreground">
            Fill in your details to book a personalized pooja session.
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name, Email, Phone, Participants */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <Label htmlFor="participants">Participants *</Label>
                <Input id="participants" type="number" min={1} value={formData.participants} onChange={(e) => setFormData({ ...formData, participants: parseInt(e.target.value) })} />
                {errors.participants && <p className="text-red-500 text-sm">{errors.participants}</p>}
              </div>
            </div>

            {/* Pooja Selection */}
            <div>
              <Label>Select Poojas *</Label>
              <PoojaCombobox
                values={formData.poojaIds}
                onChange={(values) => setFormData({ ...formData, poojaIds: values })}
                readOnly={preSelectedPoojaIds.length === 1} // true if coming from PoojaDetail
              />
              {errors.poojaIds && <p className="text-red-500 text-sm">{errors.poojaIds}</p>}
            </div>

            {/* Date & Time */}
            <div>
              <Label htmlFor="poojaDate">
                Preferred Date & Time <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                id="poojaDate"
                selected={formData.poojaDate}
                onChange={(date) => handleChange("poojaDate", date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy h:mm aa"
                timeIntervals={15}
                minDate={new Date()}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.poojaDate && <p className="text-red-500 text-sm">{errors.poojaDate}</p>}
            </div>

            {/* Mode */}
            <div>
              <Label>Mode *</Label>
              <RadioGroup value={formData.mode} onValueChange={(v) => setFormData({ ...formData, mode: v as BookPoojaFormData["mode"] })} className="flex space-x-4 mt-1">
                <div className="flex items-center space-x-2"><RadioGroupItem value="online" id="online" /><Label htmlFor="online">Online</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="offline" id="offline" /><Label htmlFor="offline">Offline</Label></div>
              </RadioGroup>
            </div>

            {formData.mode === "offline" && (
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea id="address" value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>
            )}

            {/* Additional Services */}
            <div className="space-y-2">
              <Label>Additional Services</Label>
              <div className="flex flex-col space-y-2">
                {[
                  { id: "samagri", label: "Pooja Samagri", value: formData.requireSamagri },
                  // { id: "recording", label: "Video Recording", value: formData.additionalServices.recording },
                  // { id: "certificates", label: "Certificates", value: formData.additionalServices.certificates },
                  // { id: "prasad", label: "Prasad Delivery", value: formData.additionalServices.prasad },
                ].map(s => (
                  <div key={s.id} className="flex items-center space-x-2">
                    <Checkbox id={s.id} checked={s.value} onCheckedChange={(checked) => {
                      setFormData(prev => {
                        if(s.id==="samagri") return {...prev, requireSamagri: checked as boolean};
                        return {...prev, additionalServices: {...prev.additionalServices, [s.id]: checked as boolean}};
                      });
                    }} />
                    <Label htmlFor={s.id}>{s.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message">Additional Details (Optional)</Label>
              <Textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Any specific requirements..." />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Booking..." : "Book Pooja"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={() => setFeedbackOpen(false)}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <h3 className={`text-xl font-semibold mb-4 ${feedbackType==="success" ? "text-green-600":"text-red-600"}`}>
            {feedbackType==="success" ? "Success":"Error"}
          </h3>
          <p className="mb-6">{feedbackMessage}</p>
          <Button onClick={() => {setFeedbackOpen(false); if(feedbackType==="success") onClose();}}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
