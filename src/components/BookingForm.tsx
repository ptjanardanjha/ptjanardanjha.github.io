import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_URL } from "@/config/api";

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDateTime: Date | null;
  message: string;
}

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingForm = ({ isOpen, onClose }: BookingFormProps) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    phone: "",
    preferredDateTime: null,
    message: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [loading, setLoading] = useState(false);

  // Feedback dialog state
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">("success");

  const handleChange = (field: keyof BookingFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFeedbackOpen(false);
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim() || formData.name.length < 2) newErrors.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone must be a 10-digit number";
    if (!formData.preferredDateTime) newErrors.preferredDateTime = "Please select a date and time";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/consultation-bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          preferredDateTime: formData.preferredDateTime?.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // show server error in dialog
        setFeedbackMessage(data.error || "Error submitting form");
        setFeedbackType("error");
        setFeedbackOpen(true);
        return;
      }

      // success
      setFormData({ name: "", email: "", phone: "", preferredDateTime: null, message: "" });
      setFeedbackMessage("Your consultation booking has been submitted successfully!");
      setFeedbackType("success");
      setFeedbackOpen(true);

      // close both dialogs after 2 seconds
      setTimeout(() => {
        setFeedbackOpen(false);
        onClose();
      }, 2000);

    } catch (err) {
      console.error(err);
      setFeedbackMessage("Error submitting form. Please try again.");
      setFeedbackType("error");
      setFeedbackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    id: keyof BookingFormData,
    label: string,
    type: string = "text",
    required: boolean = true
  ) => (
    <div>
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={formData[id] as string}
        onChange={(e) => handleChange(id, e.target.value)}
      />
      {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
    </div>
  );

  return (
    <>
      {/* Main Booking Form */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <label className="text-2xl font-bold mb-4 block text-center">
            Book Free Consultation
          </label>
          <DialogDescription className="text-center mb-6 text-muted-foreground">
            Fill in your details and we'll contact you to schedule your free consultation.
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-4">
            {renderInput("name", "Name")}
            {renderInput("email", "Email", "email")}
            {renderInput("phone", "Phone Number", "tel")}

            <div>
              <Label htmlFor="preferredDateTime">
                Preferred Date & Time <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                id="preferredDateTime"
                selected={formData.preferredDateTime}
                onChange={(date) => handleChange("preferredDateTime", date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy h:mm aa"
                timeIntervals={30}
                minDate={new Date()}
                placeholderText="Select date and time"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.preferredDateTime && (
                <p className="text-red-500 text-sm">{errors.preferredDateTime}</p>
              )}
            </div>

            <div>
              <Label htmlFor="message">Message (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={() => setFeedbackOpen(false)}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <h3 className={`text-xl font-semibold mb-4 ${feedbackType === "success" ? "text-green-600" : "text-red-600"}`}>
            {feedbackType === "success" ? "Success" : "Error"}
          </h3>
          <p className="mb-6">{feedbackMessage}</p>
          <Button onClick={() => setFeedbackOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
