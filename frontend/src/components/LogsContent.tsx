"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  MapPinned,
  CalendarArrowUp,
  FileChartPie,
  ArrowBigUp,
  MessageCircleMore,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "./ui/button";
import CarouselComponent from "./CarouselComponent";
import StatusButton from "./StatusButton";

type IssuesData = {
  address_type: string;
  category: string;
  city_name: string | null;
  date_posted: string;
  description: string;
  id: number;
  latitude: string;
  longitude: string;
  municipality: string;
  posted_by: number;
  state_name: string;
  status: string;
  street_name: string | null;
  suburb_name: string;
  title: string;
  town_name: string | null;
  updated_at: string;
};

function LogsContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [issues, setIssues] = useState<IssuesData[]>([]);

  useEffect(() => {
    async function fetchIssues() {
      const response = await fetch(`http://localhost:8000/issues/${session?.user.id}`, {
        cache: "no-cache",
      });

      if (response.ok) {
        const data = await response.json();
        setIssues(data);
      }

    }

    fetchIssues();

  }, [session]);

  return (
    <div className="p-1 bg-range-50 flex flex-wrap space-x- bg-oange-100">
      {issues.map((issue) => (
        <div key={issue.id} className="w-[350px] b-blue-400 mt-2 ml-5 ">
          <CarouselComponent issue_id={issue.id} />

          <Card className="w-[312] rounded-t-none rounded-l-none">
            <CardHeader className="m-0 p-2">
              <CardTitle>{issue.title}</CardTitle>
              <CardDescription className="h-[32px]">
                {issue.description.split(" ").slice(0, 10).join(" ") +
                  "...(view more)"}
              </CardDescription>
              
            </CardHeader>

            <hr className="w-[95%] ml-2 h-[2px]" />
            <CardContent className="m-0 pl-5 pt-2">
              <div className="flex space-x-2 items-center h-[35px]">
                <MapPinned className="stroke-slate-500 stroke-1 " />
                <span className="text-xs text-slate-700">
                  {issue.city_name}, {issue.suburb_name} {issue.town_name}
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <CalendarArrowUp className="stroke-slate-500 stroke-1 " />
                <span className="text-xs text-slate-700">
                  {issue.date_posted}
                </span>
              </div>
              <div className="flex space-x-2 items-center">
                <FileChartPie className="stroke-slate-500 stroke-1 " />
                <span className="text-xs text-slate-700">
                  <StatusButton status={issue.status} />
                </span>
              </div>
            </CardContent>

            <hr className="block w-[95%] ml-2 h-[2px]" />            
            <CardFooter className="flex m-0 p-2 space-x-1">
                <div className="flex items-center">
                  <Button className="bg-idigo-800 ext-white flex space-x-1" size={"sm"} variant={"outline"}>
                    <ArrowBigUp className="stroke-slate-500 stroke-1 "/>
                    <span>Upvote</span>
                  </Button>
                </div>
                
                <div className="flex items-center">
                  <Button className="bg-idigo-800 ext-white flex space-x-1" size={"sm"} variant={"outline"}>
                    <MessageCircleMore  className="stroke-slate-500 stroke-1 "/>
                    <span>Comment</span>
                  </Button>
                </div>

                <Button size={"sm"}>View More</Button>

            </CardFooter>
            <hr className="block w-[95%] ml-2 mb-2 h-[2px]" />

            
          </Card>
        </div>
      ))}
    </div>
  );
}

export default LogsContent;
