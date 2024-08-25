"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

function HomeSearchBar() {
  const [provinceValue, setProvinceValue] = useState<string | null>(null);
  const [typeValue, setTypeValue] = useState<string | null>(null);

  return (
    <div className="w-full flex justify-center bg-orange-5000 mt-5">
      <div className="md:w-1/2 flex flex-col space-y-1 border p-3 bg-white shadow rounded-[10px]">
        <div className="flex space-x-1 justify-center items-center">
          <Input placeholder="Search for issues"/>
          <Button className="h-[90%] shadow bg-indigo-800">Search</Button>
        </div>

        <div className="flex space-x-1 pt-1">
          <Select onValueChange={setProvinceValue}>
            <SelectTrigger className="text-xs md:w-[25%] h-[20%] p-3 m-0">
              <SelectValue placeholder="Filter by province" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>Provinces</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ec">Eastern Cape</SelectItem>
                <SelectItem value="fs">Free State</SelectItem>
                <SelectItem value="gp">Gauteng</SelectItem>
                <SelectItem value="kzn">KwaZulu-Natal</SelectItem>
                <SelectItem value="lp">Limpopo</SelectItem>
                <SelectItem value="mp">Mpumalanga</SelectItem>
                <SelectItem value="nw">North West</SelectItem>
                <SelectItem value="nc">Northern Cape</SelectItem>
                <SelectItem value="wc">Western Cape</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={setTypeValue}>
            <SelectTrigger className="text-xs md:w-[25%] h-[20%] p-3 m-0">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectGroup>
                <SelectLabel>Issue Categories</SelectLabel>
                <SelectItem value="INF">Infrastructure</SelectItem>
                <SelectItem value="ENV">Environment</SelectItem>
                <SelectItem value="SOC">Social</SelectItem>
                <SelectItem value="ECO">Economic</SelectItem>
                <SelectItem value="HEA">Health</SelectItem>
                <SelectItem value="EDU">Educational</SelectItem>
                <SelectItem value="OTH">Other</SelectItem>
                
              </SelectGroup>
            </SelectContent>
          </Select>

        </div>
      </div>
    </div>
  );
}

export default HomeSearchBar;
