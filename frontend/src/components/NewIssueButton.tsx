"use client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LocationSelector from "./LocationSelector";

import { Button } from "./ui/button";
import { FilePlus2, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type IssuePost = {
  title: string;
  description: string;
  street_name: null | string;
  city_name: string;
  town_name: null | string;
  suburb_name: string;
  municipality: string;
  state_name: string;
  address_type: string;
  latitude: string;
  longitude: string;
  category: string;
  posted_by: number;
};

type IssuePostResponse = {
  id: number;
  title: string;
  description: string;
  street_name: string | null;
  city_name: string;
  town_name: string | null;
  suburb_name: string;
  municipality: string;
  state_name: string;
  address_type: string;
  latitude: string;
  longitude: string;
  date_posted: Date;
  updated_at: Date;
  category: string;
  status: string;
  posted_by: number;
};

function NewIssueButton() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [streetName, setStreetName] = useState("");
  const [cityName, setCityName] = useState("");
  const [townName, setTownName] = useState("");
  const [suburbName, setSuburbName] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [stateName, setStateName] = useState("");
  const [addressType, setAddressType] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [category, setCategory] = useState("");
  const [media, setMedia] = useState<File[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  const setLocationDetails = (details: {
    streetName: string;
    cityName: string;
    townName: string;
    suburbName: string;
    municipality: string;
    stateName: string;
    addressType: string;
    latitude: string;
    longitude: string;
  }) => {
    setStreetName(details.streetName);
    setCityName(details.cityName);
    setTownName(details.townName);
    setSuburbName(details.suburbName);
    setMunicipality(details.municipality);
    setStateName(details.stateName);
    setAddressType(details.addressType);
    setLatitude(details.latitude);
    setLongitude(details.longitude);
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const issueData: IssuePost = {
      title,
      description,
      street_name: streetName,
      city_name: cityName,
      town_name: townName,
      suburb_name: suburbName,
      municipality,
      state_name: stateName,
      address_type: addressType,
      latitude,
      longitude,
      category,
      posted_by: session?.user.id,
    };

    try {
      // First POST request to submit the issue
      const issueResponse = await fetch("http://localhost:8000/issues/add/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${session?.user.accessToken}`,
        },
        body: JSON.stringify(issueData),
      });

      if (!issueResponse.ok) {
        throw new Error("Failed to submit issue");
      }

      const issuePostResponse: IssuePostResponse = await issueResponse.json();

      // Second POST request to submit the media files
      const formData = new FormData();
      media.forEach((file) => {
        formData.append("files", file);
      });
      formData.append("issue", issuePostResponse.id.toString());

      const mediaResponse = await fetch(
        "http://localhost:8000/issues/media/add/",
        {
          method: "POST",
          headers: {
            Authorization: `Token ${session?.user.accessToken}`,
          },
          body: formData,
        }
      );

      if (!mediaResponse.ok) {
        throw new Error("Failed to submit media");
      }

      // alert("Issue and media submitted successfully!");
      router.push('/logs');
    } catch (error) {
      console.error(error);
      alert("An error occurred while submitting the issue and media.");
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-slate-900 flex space-x-2 justify-center align-middle">
          <FilePlus2 className="stroke-slate-300 stroke-1" />
          <span>New Issue</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className="">
        <DrawerHeader className="flex w-full bg-orange-0 justify-between p-2">
          <DrawerTitle className="text-slate-700 place-self-center mx-auto">
            <h1 className="text-2xl font-medium">Log a new issue</h1>
          </DrawerTitle>
          {/* <DrawerDescription>Report an issue.</DrawerDescription> */}

          <DrawerClose>
            <Button
              variant="ghost"
              className="flex border-slate-200 border-2 rounded-full"
            >
              <X className="stroke-slate-900  stroke-1 w-[20px]" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <form action="submit" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-2 space-y-1">
              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-between">
                <Label htmlFor="type" className="self-center">
                  Type
                </Label>
                <SelectType setSelected={setCategory} />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-between">
                <Label htmlFor="title" className="self-end">
                  Title
                </Label>
                <Input
                  id="title"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-[400px] h-[35px] ml-2 self-center"
                />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[65px] justify-between">
                <Label htmlFor="description" className="self-center">
                  Description
                </Label>
                <Input
                  id="description"
                  type="textarea"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-[400px] h-[60px] ml-2 self-center"
                />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[65px] justify-between">
                <Label htmlFor="picture" className="self-center">
                  Media Files
                </Label>
                <Input
                  id="picture"
                  type="file"
                  multiple
                  className="w-[400px] h-[40px] ml-2 self-center"
                  onChange={(e) => setMedia(Array.from(e.target.files || []))}
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 p-2 space-y-1">
              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-between md:pr-5">
                <Label htmlFor="CityandTown" className="self-center">
                  City, Town
                </Label>
                <Input
                  id="CityandTown"
                  type="text"
                  value={`${cityName}, ${townName}`}
                  className="w-[400px] h-[35px] ml-2 self-center bg-slate-200"
                  disabled
                />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-between md:pr-5">
                <Label htmlFor="SuburbAndStreet" className="self-center">
                  Suburb,Street
                </Label>
                <Input
                  id="SuburbAndStreet"
                  type="text"
                  value={`${suburbName}, ${streetName}`}
                  className="w-[400px] h-[35px] ml-2 self-center bg-slate-200"
                  disabled
                />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-between md:pr-5">
                <Label htmlFor="Municipality" className="self-center">
                  Municipality
                </Label>
                <Input
                  id="Municipality"
                  type="text"
                  value={municipality}
                  className="w-[400px] h-[35px] ml-2 self-center bg-slate-200"
                  disabled
                />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-between md:pr-5">
                <Label htmlFor="State" className="self-center">
                  State
                </Label>
                <Input
                  id="State"
                  type="text"
                  value={stateName}
                  className="w-[400px] h-[35px] ml-2 self-center bg-slate-200"
                  disabled
                />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-between md:pr-5">
                <Label htmlFor="AddressType" className="self-center">
                  Address Type
                </Label>
                <Input
                  id="AddressType"
                  type="text"
                  value={addressType}
                  className="w-[400px] h-[35px] ml-2 self-center bg-slate-200"
                  disabled
                />
              </div>

              <div className="flex space-x-28 align-middle pl-2 h-[40px] justify-end md:pr-5">
                <LocationSelector setLocationDetails={setLocationDetails} />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button type="submit">Submit</Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export default NewIssueButton;

function SelectType({ setSelected }: { setSelected: (value: string) => void }) {
  return (
    <Select onValueChange={setSelected}>
      <SelectTrigger className="w-[400px] h-[35px] ml-2 self-center">
        <SelectValue placeholder="Select Type" />
      </SelectTrigger>
      <SelectContent className="self-center">
        <SelectGroup>
          <SelectLabel>Issue Types</SelectLabel>
          <SelectItem value="INF">Infrastucture</SelectItem>
          <SelectItem value="ENV">Environment</SelectItem>
          <SelectItem value="SAF">Safety</SelectItem>
          <SelectItem value="SOC">Social</SelectItem>
          <SelectItem value="ECO">Economical</SelectItem>
          <SelectItem value="EDU">Educational</SelectItem>
          <SelectItem value="HEA">Health</SelectItem>
          <SelectItem value="OTH">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
