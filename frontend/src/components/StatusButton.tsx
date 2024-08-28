import { Badge } from "@/components/ui/badge";

function StatusButton({ status }: { status: string }) {
  if (status == "P") {
    return (
      <Badge variant={"default"} className="bg-amber-300 text-white rounded-xl">
        <span>Pending</span>
      </Badge>
    );
  }

  if (status == "R") {
    return (
      <Badge className="bg-green-300 text-white rounded-xl">
        <span>Resolved</span>
      </Badge>
    );
  }

  if (status == "D") {
    return (
      <Badge className="bg-red-400 text-white rounded-xl">
        <span>Duplicate</span>
      </Badge>
    );
  }

  if (status == "I") {
    return (
      <Badge className="bg-blue-500 text-white rounded-xl">
        <span>In Progress</span>
      </Badge>
    );
  }

  return (
    <Badge className="bg-gray-500 text-white rounded-xl">
      <span>Unknown</span>
    </Badge>
  );
}

export default StatusButton;
