export type ApartmentMarker = {
  name: string;
  address: string;
  lat: number;
  lng: number;
  thumbnailSrc: string;
  href?: string;
};

export const APARTMENTS: ApartmentMarker[] = [
  {
    name: "Volta, Cavour",
    address: "Via Albertolli 22, Como",
    lat: 45.812658042252195,
    lng: 9.081317984131092,
    thumbnailSrc: "",
    href: "/le-suites/suite-volta",
  },
  {
    name: "Dante",
    address: "Via Dante 25, Como",
    lat: 45.80936947034892,
    lng: 9.08883481111386,
    thumbnailSrc: "",
    href: "/le-suites/suite-dante",
  },
  {
    name: "Vista Duomo",
    address: "Via Cinque Giornate 26, Como",
    lat: 45.81103901534894, 
    lng: 9.08203001296728,
    thumbnailSrc: "",
    href: "/le-suites/suite-vista-duomo",
  },
  {
    name: "Cernobbio",
    address: "Via Giuseppe Garibaldi 15, Cernobbio",
    lat: 45.84087470830077, 
    lng: 9.077118282278986,
    thumbnailSrc: "",
    href: "/le-suites/suite-cernobbio",
  },
];

export const CONTATTI_MARKER: Omit<ApartmentMarker, "thumbnailSrc"> = {
  name: "Como Lake Suites",
  address: "Piazza Cavour ang. Via Albertolli 22, 22100 Como, Italia",
  lat: 45.81347514776567,
  lng: 9.081470613918802,
};
