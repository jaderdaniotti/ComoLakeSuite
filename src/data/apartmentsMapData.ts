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
    lat: 45.8076,
    lng: 9.0845,
    thumbnailSrc: "",
    href: "/le-suites/suite-volta",
  },
  {
    name: "Dante",
    address: "Via Dante 25, Como",
    lat: 45.8088,
    lng: 9.0832,
    thumbnailSrc: "",
    href: "/le-suites/suite-dante",
  },
  {
    name: "Vista Duomo",
    address: "Via Cinque Giornate 26, Como",
    lat: 45.8092,
    lng: 9.0825,
    thumbnailSrc: "",
    href: "/le-suites/suite-vista-duomo",
  },
  {
    name: "Cernobbio",
    address: "Via Giuseppe Garibaldi 15, Cernobbio",
    lat: 45.8408,
    lng: 9.0692,
    thumbnailSrc: "",
    href: "/le-suites/suite-cernobbio",
  },
];
