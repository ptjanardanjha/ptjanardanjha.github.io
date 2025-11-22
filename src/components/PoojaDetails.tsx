import { CardContent } from "@/components/ui/card";
import {
  Calendar,
  Info,
  Package,
  Users,
  MapPin,
  User,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle2,
  XCircle,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PoojaDetails = ({ data }: { data: any }) => {
  return (
    <CardContent className="p-6">
      <div className="space-y-6">
        {/* ✅ Booked Poojas */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground border-b pb-2 mb-4">
            Booked Poojas
          </h3>
          {data.poojas && data.poojas.length > 0 ? (
            <ul className="space-y-4">
              {data.poojas.map((pooja: any) => (
                <li
                  key={pooja.poojaId}
                  className="p-4 border rounded-lg bg-muted/30 space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <p className="font-medium text-foreground">
                      {pooja.name}{" "}
                      <span className="text-muted-foreground text-sm">
                        ({pooja.hindiName})
                      </span>
                    </p>
                  </div>
                  {/* <p className="text-sm text-muted-foreground">
                    Price: ₹{pooja.price}
                  </p> */}
                  {/* {pooja.html_description && (
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground"
                      dangerouslySetInnerHTML={{
                        __html: pooja.html_description,
                      }}
                    />
                  )} */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground italic">
              No Poojas selected.
            </p>
          )}
        </div>

        {/* ✅ Booking Details */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground border-b pb-2 mb-4">
            Pooja Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium text-foreground">
                  {new Date(data.poojaDate).toLocaleString("en-GB")}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Mode</p>
                <p className="font-medium text-foreground">{data.mode}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Package className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Samagri Required</p>
                <p className="font-medium text-foreground">
                  {data.requireSamagri ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Participants</p>
                <p className="font-medium text-foreground">{data.participants}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 col-span-1 sm:col-span-2">
              <MapPin className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Address</p>
                <p className="font-medium text-foreground">{data.address || "N/A"}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 col-span-1 sm:col-span-2">
              <User className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Specific Priest</p>
                <p className="font-medium text-foreground">
                  {data.specificPriest || "Not selected"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Additional Services */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground border-b pb-2 mb-4">
            Additional Services
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              {data.additionalServices.recording ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              Recording
            </li>
            <li className="flex items-center">
              {data.additionalServices.certificates ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              Certificates
            </li>
            <li className="flex items-center">
              {data.additionalServices.prasad ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              Prasad
            </li>
          </ul>
        </div>

        {/* ✅ Contact Information */}
        <div>
          <h3 className="text-lg font-semibold text-card-foreground border-b pb-2 mb-4">
            Contact Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium text-foreground">
                  {data.request.contactInfo.name}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-foreground">
                  {data.request.contactInfo.email}
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Phone className="h-5 w-5 mt-1 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium text-foreground">
                  {data.request.contactInfo.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Message & Status */}
        <div>
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
      </div>

      {/* ✅ Footer */}
      <div className="border-t mt-6 pt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Request Created At:{" "}
          {new Date(data.request.createdAt).toLocaleString("en-GB")}
        </p>
      </div>
    </CardContent>
  );
};
