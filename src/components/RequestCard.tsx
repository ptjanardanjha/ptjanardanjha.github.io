import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, BookOpen, User } from "lucide-react";

export const RequestCard = ({ request, children }: { request: any; children: React.ReactNode }) => {
  const getStatusBadge = (status: string) => {
    if (status === "Confirmed") return <Badge className="bg-green-600 text-white">{status}</Badge>;
    if (status === "Pending") return <Badge className="bg-yellow-500 text-white">{status}</Badge>;
    if (status === "Cancelled") return <Badge className="bg-red-600 text-white">{status}</Badge>;
    return <Badge variant="secondary">{status}</Badge>;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Consultation":
        return <User className="w-5 h-5 text-blue-600" />;
      case "Pooja":
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case "Kundli":
        return <Calendar className="w-5 h-5 text-pink-600" />;
      default:
        return <Users className="w-5 h-5" />;
    }
  };

  return (
    <>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">{getTypeIcon(request.type)}</div>
            <div>
              <CardTitle className="text-lg">{request.type}</CardTitle>
              <p className="text-xs text-muted-foreground font-mono">ID: #{request.id}</p>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2">
            {getStatusBadge(request.status)}
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(request.date).toLocaleString("en-GB")}
            </span>
          </div>
        </div>
      </CardHeader>
      {children}
    </>
  );
};
