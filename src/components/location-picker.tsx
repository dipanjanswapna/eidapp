'use client';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { LocateFixed } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const LocationMarker = ({
  position,
  setPosition,
}: {
  position: LatLngExpression | null;
  setPosition: (pos: LatLngExpression) => void;
}) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

export default function LocationPicker({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  const { translations } = useLanguage();
  const dhakaPosition: LatLngExpression = [23.8103, 90.4125];
  const [position, setPosition] = useState<LatLngExpression | null>(null);
  const mapRef = useState<L.Map | null>(null);

  useEffect(() => {
    // Fix for default icon not showing in Next.js.
    // This needs to run only on the client.
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default.src,
      iconUrl: require('leaflet/dist/images/marker-icon.png').default.src,
      shadowUrl: require('leaflet/dist/images/marker-shadow.png').default.src,
    });
  }, []);

  useEffect(() => {
    if (position && 'lat' in position && 'lng' in position) {
        onLocationSelect(position.lat, position.lng);
    }
  }, [position, onLocationSelect]);

  const handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos: LatLngExpression = [latitude, longitude];
        setPosition(newPos);
        if (mapRef[0]) {
            mapRef[0].flyTo(newPos, 15);
        }
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  };

  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={dhakaPosition}
        zoom={12}
        className="h-full w-full"
        ref={mapRef[1]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
      <Button
        type="button"
        size="sm"
        onClick={handleGetCurrentLocation}
        className="absolute bottom-2 right-2 z-[1000] shadow-md"
      >
        <LocateFixed className="mr-2 h-4 w-4" />
        {translations.iftar.addSpotDialog.location.useCurrentLocation}
      </Button>
    </div>
  );
}
