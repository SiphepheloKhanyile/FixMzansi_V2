import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { LatLng } from "leaflet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { PinIcon } from "lucide-react";

function LocationSelector({
  setLocationDetails,
}: {
  setLocationDetails: (locationDetails: any) => void;
}) {
  const [position, setPosition] = useState<LatLng | null>(null);

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        fetchLocationDetails(e.latlng.lat, e.latlng.lng);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup content={"You selected this point"} />
      </Marker>
    );
  }

  function fetchLocationDetails(lat: number, lng: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Geocoding error:", data.error);
          return;
        }
        if (!data.address) {
          console.error("Address not found for the given coordinates.");
          return;
        }
        updateFormFields(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function updateFormFields(data: any) {
    const locationDetails = {
      townName: data.address.town || "",
      streetName: data.address.road || "",
      cityName: data.address.city || "",
      suburbName: data.address.suburb || "",
      municipality: data.address.county || "",
      stateName: data.address.state || "",
      addressType: data.type || "",
      latitude: data.lat,
      longitude: data.lon,
    };

    setLocationDetails(locationDetails);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Select Location</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>
        <MapContainer
          center={[-26.11976158751007, 28.158826991453715]}
          zoom={5.5}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
      </DialogContent>
    </Dialog>
  );
}

export default LocationSelector;
