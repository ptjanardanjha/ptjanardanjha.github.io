import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Search, Users } from "lucide-react";
import Layout from "./Layout";
import { API_URL } from "@/config/api";
import { ConsultationDetails } from "./ConsultationDetails";
import { PoojaDetails } from "./PoojaDetails";
import { RequestCard } from "./RequestCard";
import { KundliDetails } from "./KundliDetails";

interface RequestStatus {
  id: string;
  type: "Consultation" | "Pooja" | "Kundli";
  date: string;
  status: string;
  details: string;
  data: any;
}

export const RequestStatusPage = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<RequestStatus[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter Email or Phone");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/request-status?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to fetch requests");
        setRequests([]);
        return;
      }
      const mappedRequests: RequestStatus[] = [];
      data.consultationBookings?.forEach((c: any) =>
        mappedRequests.push({
          id: c.request.requestId,
          type: "Consultation",
          date: c.request.createdAt,
          status: c.status || "Pending",
          details: `Name: ${c.request.contactInfo.name}, Email: ${c.request.contactInfo.email}, Phone: ${c.request.contactInfo.phone}`,
          data: c,
        })
      );
      data.poojaBookings?.forEach((p: any) => {
        const poojaNames = p.poojas?.map((pooja: any) => pooja.name).join(", ") || "N/A";
        mappedRequests.push({
          id: p.request.requestId,
          type: "Pooja",
          date: p.request.createdAt,
          status: p.status || "Pending",
          details: `Poojas: ${poojaNames}, Mode: ${p.mode}, Participants: ${p.participants}`,
          data: p,
        });
      });
      data.kundliRequests?.forEach((k: any) =>
        mappedRequests.push({
          id: k.request.requestId,
          type: "Kundli",
          date: k.request.createdAt,
          status: k.status || "Pending",
          details: `Birth Place: ${k.birthPlace}, Name: ${k.request?.contactInfo.name}`,
          data: k,
        })
      );
      mappedRequests.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setRequests(mappedRequests);
    } catch (err) {
      console.error(err);
      setError("Something went wrong!");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">🔍 Track Your Requests</h1>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Enter Email or Phone"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="rounded-full"
          />
          <Button onClick={handleSearch} disabled={loading} className="rounded-full">
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Search className="w-5 h-5" />}
          </Button>
        </div>

        {error && <div className="text-center text-red-500 mb-4 font-medium">{error}</div>}
        {requests.length === 0 && !loading && !error && (
          <p className="text-center text-muted-foreground">No requests found.</p>
        )}

        <div className="space-y-4">
          {requests.map((r) => (
            <Card key={r.id} className="shadow-md hover:shadow-lg transition-shadow">
              <RequestCard request={r}>
                {r.data?.request?.requestType == 100101 && <ConsultationDetails data={r.data} />}
                {r.data?.request?.requestType == 100103 && <PoojaDetails data={r.data} />}
                {r.data?.request?.requestType == 100102 && <KundliDetails data={r.data} />}
              </RequestCard>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};
