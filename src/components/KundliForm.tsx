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

export interface KundliFormData {
  name: string;
  email: string;
  phone: string;
  birthDateTime: Date | null;
  birthPlace: string;
  taskDetails: string;
  gender: string; // ✅ Added gender
}

interface KundliFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KundliForm = ({ isOpen, onClose }: KundliFormProps) => {
  const [formData, setFormData] = useState<KundliFormData>({
    name: "",
    email: "",
    phone: "",
    birthDateTime: null,
    birthPlace: "",
    taskDetails: "",
    gender: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof KundliFormData, string>>
  >({});
  const [loading, setLoading] = useState(false);

  // Feedback dialog
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (field: keyof KundliFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
    setFeedbackOpen(false);
  };

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email address";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.birthDateTime)
      newErrors.birthDateTime = "Birth date & time is required";
    if (!formData.birthPlace.trim())
      newErrors.birthPlace = "Birth place is required";
    if (!formData.gender) newErrors.gender = "Gender is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/kundli-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          birthDateTime: formData.birthDateTime?.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setFeedbackMessage(data.error || "Error submitting form");
        setFeedbackType("error");
        setFeedbackOpen(true);
        return;
      }

      // success
      setFormData({
        name: "",
        email: "",
        phone: "",
        birthDateTime: null,
        birthPlace: "",
        taskDetails: "",
        gender: "",
      });
      setFeedbackMessage(
        "Your Kundli request has been submitted successfully!"
      );
      setFeedbackType("success");
      setFeedbackOpen(true);

      setTimeout(() => {
        setFeedbackOpen(false);
        onClose();
      }, 2000);
    } catch (err) {
      console.error(err);
      setFeedbackMessage("Something went wrong! Please try again.");
      setFeedbackType("error");
      setFeedbackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    id: keyof KundliFormData,
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
      {/* Main Kundli Form */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
          <label className="text-2xl font-bold mb-4 block text-center">
            Get Your Instant Kundli
          </label>
          <DialogDescription className="text-center mb-6 text-muted-foreground">
            Enter your details and birth information to generate your
            personalized Kundli chart.
          </DialogDescription>

          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto">
            {renderInput("name", "Full Name")}
            {renderInput("email", "Email", "email")}
            {renderInput("phone", "Phone Number", "tel")}

            {/* ✅ Gender Field */}
            <div>
              <Label>
                Gender <span className="text-red-500">*</span>
              </Label>
              <div className="flex items-center space-x-4 mt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  />
                  <span>Female</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    checked={formData.gender === "Other"}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  />
                  <span>Other</span>
                </label>
              </div>
              {errors.gender && (
                <p className="text-red-500 text-sm">{errors.gender}</p>
              )}
            </div>

            <div>
              <Label htmlFor="birthDateTime">
                Birth Date & Time <span className="text-red-500">*</span>
              </Label>
              <DatePicker
                id="birthDateTime"
                selected={formData.birthDateTime}
                onChange={(date) => handleChange("birthDateTime", date)}
                showTimeSelect
                dateFormat="dd/MM/yyyy h:mm aa"
                timeIntervals={15}
                maxDate={new Date()}
                placeholderText="Select birth date and time"
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {errors.birthDateTime && (
                <p className="text-red-500 text-sm">{errors.birthDateTime}</p>
              )}
            </div>

            {renderInput("birthPlace", "Birth Place")}

            <div>
              <Label htmlFor="taskDetails">Additional Details / Questions</Label>
              <Textarea
                id="taskDetails"
                value={formData.taskDetails}
                onChange={(e) => handleChange("taskDetails", e.target.value)}
                placeholder="Any specific questions, concerns, or additional details you'd like to share"
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Generate Kundli"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Feedback Dialog */}
      <Dialog open={feedbackOpen} onOpenChange={() => setFeedbackOpen(false)}>
        <DialogContent className="sm:max-w-[400px] text-center">
          <h3
            className={`text-xl font-semibold mb-4 ${
              feedbackType === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {feedbackType === "success" ? "Success" : "Error"}
          </h3>
          <p className="mb-6">{feedbackMessage}</p>
          <Button onClick={() => setFeedbackOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
