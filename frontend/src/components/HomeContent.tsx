"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

type ResponseData = {
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


function HomeContent() {
  const searchParams = useSearchParams();
  const state = searchParams.get('state');
  const category = searchParams.get('category');
  const status = searchParams.get('status');

  const [data, setData] = useState<ResponseData[]>([]);

  useEffect(() => {

    async function fetchProperties() {

      if (state || category || status) {
        const response = await fetch(`http://localhost:8000/issues/?state=${state}&category=${category}&status=${status}`);
        const data: ResponseData[] = await response.json();
        setData(data);
      }
      else {  
        const response = await fetch('http://localhost:8000/api/properties/');
  
        const data: ResponseData[] = await response.json();
        setData(data);
      }
      console.log(data);
    }  
  });


  

  console.log(data);

  return (
    <div className="">

    </div>
  )
}

export default HomeContent


function CardComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>Card Description</CardDescription>
      </CardContent>
      <CardFooter>Card Footer</CardFooter>
    </Card>
  )
}



{/* <Image
        src="http://localhost:8000/media/issue_media/crumbling.webp"
        alt="Home"
        width={1920}
        height={1080}
        layout="responsive"
      /> */}
