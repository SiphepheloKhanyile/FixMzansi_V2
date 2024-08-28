import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import { useEffect, useState } from "react";

type mediaData = {
  id: number;
  file: string;
  uploaded_at: string;
  issue: number;
};

function CarouselComponent({ issue_id }: { issue_id: number }) {
  const [mediaData, setMediaData] = useState<mediaData[]>([]);

  useEffect(() => {
    async function fetchMedia() {
      const response = await fetch(
        `http://localhost:8000/issues/media/?issue=${issue_id}`,
        {
          cache: "no-cache",
        }
      );
      const data = await response.json();
      setMediaData(data);
    }

    fetchMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("media", mediaData);

  return (
    <div className="w-full">
      <Carousel className="">
        <CarouselContent className="p-0">
          {mediaData.map((data, index) => (
            <CarouselItem key={index} className="h-[200px] w-[315px]">
              <Image
                src={`http://localhost:8000${data.file}`}
                alt="Issue Image"
                width={1920}
                height={1080}
                className="w-full h-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-5 m-20" />
        <CarouselNext className="-right-5 m-20" />
      </Carousel>
    </div>
  );
}

export default CarouselComponent;
