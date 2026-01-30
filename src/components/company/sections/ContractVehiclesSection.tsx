import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Check, X, Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type VehicleStatus = "held" | "not-held" | "pending";

type Vehicle = {
  name: string;
  status: VehicleStatus;
  pool?: string;
};

const DEFAULT_VEHICLES: Vehicle[] = [
  { name: "OASIS+ SB", status: "held", pool: "Pool 1: Management & Advisory" },
  { name: "GSA IT Schedule 70", status: "not-held" },
  { name: "CIO-SP3 SB", status: "pending" },
  { name: "SEWP V", status: "held", pool: "Group D: Cloud" },
  { name: "Alliant 2 SB", status: "not-held" },
  { name: "STARS III", status: "held" },
  { name: "8(a) STARS III", status: "not-held" },
  { name: "DISA SETI", status: "pending" },
];

type Props = {
  vehicles?: Vehicle[];
  onUpdate?: (vehicles: Vehicle[]) => void;
};

export function ContractVehiclesSection({ vehicles = DEFAULT_VEHICLES }: Props) {
  const getStatusStyle = (status: VehicleStatus) => {
    switch (status) {
      case "held":
        return "border-success/50 bg-success/5";
      case "pending":
        return "border-warning/50 bg-warning/5";
      case "not-held":
        return "border-muted-foreground/30 border-dashed bg-muted/20";
    }
  };

  const getStatusIcon = (status: VehicleStatus) => {
    switch (status) {
      case "held":
        return <Check className="h-5 w-5 text-success" />;
      case "pending":
        return <Clock className="h-5 w-5 text-warning" />;
      case "not-held":
        return <X className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: VehicleStatus) => {
    switch (status) {
      case "held":
        return <Badge className="bg-success/20 text-success text-xs">Held</Badge>;
      case "pending":
        return <Badge className="bg-warning/20 text-warning text-xs">Pending</Badge>;
      case "not-held":
        return <Badge className="bg-muted text-muted-foreground text-xs">Not Held</Badge>;
    }
  };

  const heldCount = vehicles.filter((v) => v.status === "held").length;
  const pendingCount = vehicles.filter((v) => v.status === "pending").length;

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Truck className="h-5 w-5 text-primary" />
            Contract Vehicles
          </CardTitle>
          <div className="flex gap-2 text-sm">
            <span className="text-success font-medium">{heldCount} Held</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-warning font-medium">{pendingCount} Pending</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {vehicles.map((vehicle) => (
            <div
              key={vehicle.name}
              className={cn(
                "border-2 rounded-xl p-4 transition-all hover:shadow-md cursor-pointer",
                getStatusStyle(vehicle.status)
              )}
            >
              <div className="flex items-start justify-between mb-2">
                {getStatusIcon(vehicle.status)}
                {getStatusBadge(vehicle.status)}
              </div>
              <p className="font-semibold text-foreground text-sm mb-1">{vehicle.name}</p>
              {vehicle.pool && (
                <p className="text-xs text-muted-foreground">{vehicle.pool}</p>
              )}
            </div>
          ))}
          
          {/* Add Vehicle Card */}
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-4 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors cursor-pointer min-h-[100px]">
            <Plus className="h-6 w-6 mb-2" />
            <span className="text-sm font-medium">Add Vehicle</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
