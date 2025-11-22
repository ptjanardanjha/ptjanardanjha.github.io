import { CardContent } from "@/components/ui/card";
import { Clock, Info, Mail, MessageSquare, Phone, User } from "lucide-react";
import { Badge } from "./ui/badge";

export const ConsultationDetails = ({ data }: { data: any }) => {
  return (
    <CardContent className="p-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground border-b pb-2 mb-4">
            Consultation Details
          </h3>
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 mt-1 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Preferred Date & Time</p>
              <p className="font-medium text-foreground">
                {new Date(data.preferredDateTime).toLocaleString("en-GB")}
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-card-foreground border-b pb-2 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">{data.request.contactInfo.name}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">{data.request.contactInfo.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">{data.request.contactInfo.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MessageSquare className="h-5 w-5 mt-1 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-sm text-muted-foreground">Message</p>
              <p className="font-medium italic text-foreground">
                "{data.request.message || "No message provided."}"
              </p>
            </div>
          </div>
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant="secondary">{data.request.status}</Badge>
              </div>
            </div>
        </div>
      </div>

      <div className="border-t mt-6 pt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Request Created At: {new Date(data.request.createdAt).toLocaleString("en-GB")}
        </p>
      </div>
    </CardContent>
  );
};
