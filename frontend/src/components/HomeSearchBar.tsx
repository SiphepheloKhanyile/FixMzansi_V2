"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import { useState } from "react";
import { useRouter, redirect } from "next/navigation";

function HomeSearchBar() {
  const [provinceValue, setProvinceValue] = useState<string | null>(null);
  const [typeValue, setTypeValue] = useState<string | null>(null);
  const [statusValue, setStatusValue] = useState<string | null>(null);
  const router = useRouter();

  function Search_info() {
    let query = "";

    if (provinceValue == "All") setProvinceValue(null);
    if (typeValue == "All") setTypeValue(null);
    if (statusValue == "All") setStatusValue(null);

    if (provinceValue) query += `state=${provinceValue}`;
    if (typeValue) query += `&category=${typeValue}`;
    if (statusValue) query += `&status=${statusValue}`;
    
    const queryString = new URLSearchParams(query).toString();
    // redirect(`/?${queryString}`);
    router.replace(`/?${query}`);
    // router.refresh();
  }

  
  return (
    <div className="w-full flex justify-center pb-2">
      <div className="md:w-3/4 flex flex-col space-y-2 border p-3 bg-white shadow rounded-[10px] mt-1">
        <div className="flex space-x-1 justify-center items-center">
          <Search className="stroke-slate-500 stroke-1" size={35}/>
          <Input  placeholder="Search for issues" className="focus-visible:ring-1 focus-visible:ring-indigo-300" id="search"/>
          <Button className="h-[90%] shadow bg-indigo-800" onClick={() => Search_info()}>Search</Button>
        </div>

        <div className="flex space-x-1 pt-1">
          <Select onValueChange={setProvinceValue}>
            <SelectTrigger className="text-xs md:w-[25%] h-[20%] p-3 m-0 focus:ring-1 focus:ring-slate-400">
              <SelectValue placeholder="Filter by province" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>Provinces</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Eastern Cape">Eastern Cape</SelectItem>
                <SelectItem value="Free State">Free State</SelectItem>
                <SelectItem value="Gauteng">Gauteng</SelectItem>
                <SelectItem value="KwaZulu-Natal">KwaZulu-Natal</SelectItem>
                <SelectItem value="Limpopo">Limpopo</SelectItem>
                <SelectItem value="Mpumalanga">Mpumalanga</SelectItem>
                <SelectItem value="North West">North West</SelectItem>
                <SelectItem value="Northern Cape">Northern Cape</SelectItem>
                <SelectItem value="Western Cape">Western Cape</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          

          <Select onValueChange={setTypeValue}>
            <SelectTrigger className="text-xs md:w-[25%] h-[20%] p-3 m-0 focus:ring-1 focus:ring-slate-400">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>Issue Categories</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="INF">Infrastructure</SelectItem>
                <SelectItem value="ENV">Environment</SelectItem>
                <SelectItem value="SAF">Safety</SelectItem>
                <SelectItem value="SOC">Social</SelectItem>
                <SelectItem value="ECO">Economic</SelectItem>
                <SelectItem value="HEA">Health</SelectItem>
                <SelectItem value="EDU">Educational</SelectItem>
                <SelectItem value="OTH">Other</SelectItem>                
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setStatusValue}>
            <SelectTrigger className="text-xs md:w-[25%] h-[20%] p-3 m-0 focus:ring-1 focus:ring-slate-400">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>Status Types </SelectLabel>
                {/* <SelectItem value="all">All</SelectItem> */}
                <SelectItem value="P">Pending</SelectItem>
                <SelectItem value="R">Resolved</SelectItem>
                <SelectItem value="I">In Progess</SelectItem>
                <SelectItem value="D">Duplicate</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

        </div>
      </div>
    </div>
  );
}

export default HomeSearchBar;
