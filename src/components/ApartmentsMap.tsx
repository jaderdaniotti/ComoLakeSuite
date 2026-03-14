"use client";

import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Eye } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import type { ApartmentMarker } from "@/src/data/apartmentsMapData";
import { APARTMENTS } from "@/src/data/apartmentsMapData";

function createThumbnailIcon(thumbnailSrc: string) {
  return L.divIcon({
    className: "apartment-marker",
    html: `
      <div class="apartment-marker__pin">
        <img src="${thumbnailSrc}" alt="" class="apartment-marker__img" />
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 48],
    popupAnchor: [0, -48],
  });
}

function FitBounds({ markers }: { markers: ApartmentMarker[] }) {
  const map = useMap();
  useEffect(() => {
    const valid = markers.filter(
      (m) => typeof m.lat === "number" && typeof m.lng === "number"
    );
    if (valid.length === 0) return;
    const bounds = L.latLngBounds(valid.map((m) => [m.lat, m.lng]));
    map.fitBounds(bounds.pad(0.15));
  }, [map, markers]);
  return null;
}

type Props = {
  apartments?: ApartmentMarker[];
};

function isValidMarker(a: ApartmentMarker): a is ApartmentMarker & { lat: number; lng: number } {
  return (
    typeof a.lat === "number" &&
    typeof a.lng === "number" &&
    !!a.thumbnailSrc
  );
}

export default function ApartmentsMap({ apartments }: Props) {
  const list = useMemo(() => {
    const withThumbs = apartments ?? APARTMENTS;
    return withThumbs.filter(isValidMarker);
  }, [apartments]);

  if (list.length === 0) return null;

  return (
    <section className="w-full overflow-hidden rounded-2xl border border-grigio bg-bianco shadow-sm" data-lenis-prevent>
      <div className="h-[420px] w-full [&_.leaflet-container]:h-full [&_.leaflet-container]:w-full [&_.leaflet-container]:rounded-2xl">
        <MapContainer
          center={[45.824, 9.077]}
          zoom={12}
          scrollWheelZoom={true}
          className="h-full w-full rounded-2xl"
          style={{ minHeight: 420 }}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <FitBounds markers={list} />
          {list.map((apt, index) => (
            <Marker
              key={`${apt.name}-${apt.address}-${index}`}
              position={[apt.lat, apt.lng]}
              icon={createThumbnailIcon(apt.thumbnailSrc)}
            >
              <Popup>
                <div className="flex min-w-0 items-center gap-3 py-0.5">
                  <span className=" font-light text-scuro">{apt.name}</span>
                  {apt.href && (
                    <a
                      href={apt.href}
                      title="Visita la suite"
                      className="flex shrink-0 rounded-full p-1.5 text-blu transition hover:bg-blu/10 hover:text-blu/90"
                    >
                      <Eye size={18} strokeWidth={1.5} />
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </section>
  );
}

