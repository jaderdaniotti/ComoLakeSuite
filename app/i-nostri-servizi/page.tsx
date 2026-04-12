import type { Metadata } from "next";
import { cookies } from "next/headers";
import {
  CircleParking,
  Wifi,
  Sun,
  Bubbles,
  EggFried,
  ChefHat,
  Shirt,
  Thermometer,
  Baby,
  Building2,
  CreditCard,
  MapPin,
  Lock,
  Star,
  Bath,
  Car,
  Key,
  Tv,
  Sofa,
  UtensilsCrossed,
  Sparkles,
  Coffee,
  Wind,
  ShieldCheck,
  Bike,
  Mountain,
  Flame,
  Package,
  Scissors,
  Languages,
  Gamepad2,
  Dumbbell,
  Waves,
  Palmtree,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import images from "@/src/images";
import ServiziCategorieAccordion from "@/src/components/ServiziCategorieAccordion";
import { buildPageMetadata } from "@/src/lib/seo";
import { getServerLocale, t } from "@/src/lib/i18n";

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Servizi - Como Lake Suites",
    description:
      "Parcheggio privato, Wi-fi, terrazza vista lago, pulizie, colazione, cucina attrezzata, biancheria, climatizzatore e molti altri servizi.",
    pathname: "/i-nostri-servizi",
    keywords: [
      "servizi suite Como",
      "parcheggio privato Como",
      "suite con wifi Como",
      "suite con terrazza Lago di Como",
      "alloggi con colazione Como",
    ],
  }),
};

/** Servizi da Booking.com – elenco completo con grafica esistente */
const serviziBooking: { icon: LucideIcon; titolo: string }[] = [
  { icon: Sparkles, titolo: "Spa & centro benessere" },
  { icon: Car, titolo: "Navetta aeroportuale" },
  { icon: ShieldCheck, titolo: "Camere non fumatori" },
  { icon: CircleParking, titolo: "Parcheggio privato" },
  { icon: Wifi, titolo: "Connessione WiFi gratuita" },
  { icon: Sun, titolo: "Terrazza" },
  { icon: Coffee, titolo: "Bar" },
  { icon: EggFried, titolo: "Colazione ottima" },
  { icon: Bath, titolo: "Bagno privato" },
  { icon: CircleParking, titolo: "Parcheggio" },
  { icon: Thermometer, titolo: "Aria condizionata" },
  { icon: Tv, titolo: "TV a schermo piatto" },
  { icon: UtensilsCrossed, titolo: "Area picnic" },
  { icon: Building2, titolo: "Ascensore" },
  { icon: Key, titolo: "Accesso con chiavi" },
  { icon: ShieldCheck, titolo: "Allarme antifumo" },
  { icon: Building2, titolo: "Appartamento privato in edificio" },
  { icon: Gamepad2, titolo: "Area giochi" },
  { icon: Palmtree, titolo: "Area giochi all'aperto" },
  { icon: Wind, titolo: "Aria condizionata" },
  { icon: Package, titolo: "Armadietti" },
  { icon: Shirt, titolo: "Armadio o guardaroba" },
  { icon: Sofa, titolo: "Arredamento da esterni" },
  { icon: Scissors, titolo: "Asciugacapelli" },
  { icon: Shirt, titolo: "Asciugamani" },
  { icon: Shirt, titolo: "Asciugatrice" },
  { icon: CircleParking, titolo: "Autorimessa" },
  { icon: Bath, titolo: "Bidet" },
  { icon: Coffee, titolo: "Bollitore elettrico" },
  { icon: Coffee, titolo: "Bollitore tè/macchina caffè" },
  { icon: Package, titolo: "Cabina armadio" },
  { icon: Mountain, titolo: "Campo da golf (nel raggio di 3 km)" },
  { icon: Tv, titolo: "Canali pay per view" },
  { icon: Tv, titolo: "Canali satellitari" },
  { icon: Tv, titolo: "Canali via cavo" },
  { icon: Waves, titolo: "Canoa" },
  { icon: Star, titolo: "Cappella o luogo di culto" },
  { icon: Bath, titolo: "Carta igienica" },
  { icon: Lock, titolo: "Cassaforte" },
  { icon: Key, titolo: "Check-in e check-out privati" },
  { icon: ChefHat, titolo: "Cucina" },
  { icon: Package, titolo: "Deposito bagagli" },
  { icon: Sofa, titolo: "Divano" },
  { icon: Bath, titolo: "Doccia" },
  { icon: Bike, titolo: "Escursioni in bicicletta" },
  { icon: Mountain, titolo: "Escursionismo" },
  { icon: ShieldCheck, titolo: "Estintori" },
  { icon: CreditCard, titolo: "Fattura disponibile su richiesta" },
  { icon: Shirt, titolo: "Ferro da stiro" },
  { icon: Shirt, titolo: "Ferro e asse da stiro" },
  { icon: ChefHat, titolo: "Forno" },
  { icon: ChefHat, titolo: "Forno a microonde" },
  { icon: ChefHat, titolo: "Frigorifero" },
  { icon: Gamepad2, titolo: "Giochi da tavolo/puzzle" },
  { icon: Languages, titolo: "Inglese" },
  { icon: Languages, titolo: "Italiano" },
  { icon: Languages, titolo: "Francese" },
  { icon: Key, titolo: "Ingresso indipendente" },
  { icon: Wind, titolo: "Insonorizzazione" },
  { icon: Sparkles, titolo: "Intrattenimento serale" },
  { icon: ChefHat, titolo: "Lavastoviglie" },
  { icon: Shirt, titolo: "Lavatrice" },
  { icon: Coffee, titolo: "Macchina da caffè" },
  { icon: Sparkles, titolo: "Massaggi" },
  { icon: EggFried, titolo: "Menù per diete particolari (su richiesta)" },
  { icon: Coffee, titolo: "Minibar" },
  { icon: Baby, titolo: "Mini club" },
  { icon: Package, titolo: "Minimarket sul posto" },
  { icon: Car, titolo: "Navetta aeroportuale" },
  { icon: Bike, titolo: "Noleggio biciclette" },
  { icon: Shirt, titolo: "Pantofole" },
  { icon: Shirt, titolo: "Accappatoio" },
  { icon: Sofa, titolo: "Parquet o pavimento in legno" },
  { icon: Sparkles, titolo: "Parrucchiere/salone di bellezza" },
  { icon: Waves, titolo: "Pesca" },
  { icon: Building2, titolo: "Piani superiori accessibili tramite ascensore" },
  { icon: ChefHat, titolo: "Piano cottura" },
  { icon: Sofa, titolo: "Presa elettrica vicino al letto" },
  { icon: Bath, titolo: "Prodotti da bagno in omaggio" },
  { icon: Bubbles, titolo: "Prodotti per le pulizie" },
  { icon: ShieldCheck, titolo: "Rilevatore di monossido di carbonio" },
  { icon: Flame, titolo: "Riscaldamento" },
  { icon: Gamepad2, titolo: "Sala giochi" },
  { icon: Tv, titolo: "Sala comune/zona TV" },
  { icon: Baby, titolo: "Seggiolone" },
  { icon: Baby, titolo: "Servizio baby-sitter" },
  { icon: Car, titolo: "Servizio di parcheggio e riconsegna auto" },
  { icon: Shirt, titolo: "Servizio lavanderia" },
  { icon: Car, titolo: "Servizio navetta" },
  { icon: Bubbles, titolo: "Servizio pulizie" },
  { icon: Tv, titolo: "Servizio streaming (per es. Netflix)" },
  { icon: Sparkles, titolo: "Servizi spa" },
  { icon: ShieldCheck, titolo: "Sicurezza 24 ore su 24" },
  { icon: ShieldCheck, titolo: "Soluzioni anallergiche" },
  { icon: Package, titolo: "Sportello bancomat" },
  { icon: Shirt, titolo: "Stand appendiabiti" },
  { icon: Shirt, titolo: "Stendibiancheria" },
  { icon: ShieldCheck, titolo: "Struttura interamente non fumatori" },
  { icon: UtensilsCrossed, titolo: "Tavolo da pranzo" },
  { icon: Sun, titolo: "Terrazza" },
  { icon: ChefHat, titolo: "Tostapane" },
  { icon: Mountain, titolo: "Tour a piedi" },
  { icon: Bike, titolo: "Tour in bicicletta" },
  { icon: Star, titolo: "Tour o lezioni sulla cultura locale" },
  { icon: Tv, titolo: "TV" },
  { icon: Tv, titolo: "TV a schermo piatto" },
  { icon: ChefHat, titolo: "Utensili da cucina" },
  { icon: Bath, titolo: "Vasca o doccia" },
  { icon: Coffee, titolo: "Vino/champagne" },
  { icon: Sun, titolo: "Vista Lago" },
  { icon: MapPin, titolo: "Vista città" },
  { icon: Star, titolo: "Vista luogo di interesse" },
  { icon: Mountain, titolo: "Vista montagna" },
  { icon: Bath, titolo: "WC" },
  { icon: UtensilsCrossed, titolo: "Zona pranzo" },
  { icon: Sofa, titolo: "Zona soggiorno" },
  { icon: CreditCard, titolo: "Pagamenti accettati" },
  { icon: Star, titolo: "Banco escursioni" },
  { icon: Dumbbell, titolo: "Aerobica" },
  { icon: Mountain, titolo: "Sci" },
  { icon: Mountain, titolo: "Equitazione" },
];

/** Categorie in stile Booking: etichetta + icona + elenco titoli servizi */
type CategoriaServizi = { id: string; label: string; icon: LucideIcon; titoli: string[] };
const categorieServizi: CategoriaServizi[] = [
  {
    id: "cucina",
    label: "Cucina",
    icon: ChefHat,
    titoli: [
      "Macchina da caffè", "Prodotti per le pulizie", "Tostapane", "Piano cottura", "Forno", "Asciugatrice",
      "Utensili da cucina", "Bollitore elettrico", "Cucina", "Lavatrice", "Lavastoviglie", "Forno a microonde",
      "Frigorifero", "Tavolo da pranzo", "Bollitore tè/macchina caffè",
    ],
  },
  {
    id: "camera",
    label: "Camera da letto",
    icon: Sofa,
    titoli: ["Armadio o guardaroba", "Cabina armadio"],
  },
  {
    id: "bagno",
    label: "Bagno",
    icon: Bath,
    titoli: [
      "Carta igienica", "Asciugamani", "Bidet", "Vasca o doccia", "Pantofole", "Bagno privato", "WC",
      "Prodotti da bagno in omaggio", "Accappatoio", "Asciugacapelli", "Doccia",
    ],
  },
  {
    id: "soggiorno",
    label: "Area soggiorno",
    icon: Sofa,
    titoli: ["Zona pranzo", "Divano", "Zona soggiorno", "Parquet o pavimento in legno", "Presa elettrica vicino al letto", "Stendibiancheria", "Stand appendiabiti", "Ferro da stiro", "Ferro e asse da stiro", "Ingresso indipendente", "Insonorizzazione", "Soluzioni anallergiche"],
  },
  {
    id: "esterni",
    label: "Spazi all'aperto",
    icon: Sun,
    titoli: ["Arredamento da esterni", "Terrazza", "Area picnic"],
  },
  {
    id: "comuni",
    label: "Aree comuni",
    icon: Building2,
    titoli: ["Cappella o luogo di culto", "Sala giochi"],
  },
  {
    id: "benessere",
    label: "Servizi benessere",
    icon: Sparkles,
    titoli: ["Servizi spa", "Massaggi", "Spa & centro benessere", "Parrucchiere/salone di bellezza"],
  },
  {
    id: "ristorazione",
    label: "Servizi di ristorazione",
    icon: Coffee,
    titoli: ["Vino/champagne", "Menù per diete particolari (su richiesta)", "Bar", "Minibar", "Colazione ottima"],
  },
  {
    id: "attivita",
    label: "Attività",
    icon: Mountain,
    titoli: ["Aerobica", "Tour o lezioni sulla cultura locale", "Tour in bicicletta", "Tour a piedi", "Equitazione", "Escursioni in bicicletta", "Escursionismo", "Canoa", "Sci", "Pesca", "Campo da golf (nel raggio di 3 km)"],
  },
  {
    id: "intrattenimento",
    label: "Intrattenimento e servizi per le famiglie",
    icon: Gamepad2,
    titoli: ["Area giochi all'aperto", "Giochi da tavolo/puzzle", "Sala comune/zona TV", "Area giochi", "Intrattenimento serale", "Mini club", "Servizio baby-sitter", "Seggiolone"],
  },
  {
    id: "pulizie",
    label: "Servizi di pulizia",
    icon: Bubbles,
    titoli: ["Servizio pulizie", "Servizio lavanderia", "Prodotti per le pulizie"],
  },
  {
    id: "negozi",
    label: "Negozi",
    icon: Package,
    titoli: ["Minimarket sul posto"],
  },
  {
    id: "parcheggio",
    label: "Parcheggio",
    icon: CircleParking,
    titoli: ["Parcheggio privato", "Parcheggio", "Autorimessa", "Servizio di parcheggio e riconsegna auto"],
  },
  {
    id: "internet",
    label: "Internet",
    icon: Wifi,
    titoli: ["Connessione WiFi gratuita"],
  },
  {
    id: "media",
    label: "Media e tecnologia",
    icon: Tv,
    titoli: ["Servizio streaming (per es. Netflix)", "TV a schermo piatto", "Canali via cavo", "Canali satellitari", "TV", "Canali pay per view"],
  },
  {
    id: "accessibilita",
    label: "Accessibilità",
    icon: Building2,
    titoli: ["Piani superiori accessibili tramite ascensore", "Ascensore"],
  },
  {
    id: "trasporti",
    label: "Trasporti",
    icon: Car,
    titoli: ["Navetta aeroportuale", "Noleggio biciclette", "Servizio navetta"],
  },
  {
    id: "accoglienza",
    label: "Servizi di accoglienza",
    icon: Key,
    titoli: ["Fattura disponibile su richiesta", "Armadietti", "Check-in e check-out privati", "Sportello bancomat", "Deposito bagagli", "Banco escursioni", "Accesso con chiavi", "Pagamenti accettati"],
  },
  {
    id: "vista",
    label: "Esterni e vista",
    icon: MapPin,
    titoli: ["Vista Lago", "Vista luogo di interesse", "Vista montagna", "Vista  città"],
  },
  {
    id: "edificio",
    label: "Caratteristiche dell'edificio",
    icon: Building2,
    titoli: ["Appartamento privato in edificio"],
  },
  {
    id: "sicurezza",
    label: "Protezione e sicurezza",
    icon: Lock,
    titoli: ["Estintori", "Allarme antifumo", "Sicurezza 24 ore su 24", "Rilevatore di monossido di carbonio", "Cassaforte", "Allarme di sicurezza"],
  },
  {
    id: "lingue",
    label: "Lingue parlate",
    icon: Languages,
    titoli: ["Inglese", "Italiano", "Francese"],
  },
  {
    id: "varie",
    label: "Varie",
    icon: Flame,
    titoli: ["Aria condizionata", "Struttura interamente non fumatori", "Riscaldamento", "Camere non fumatori"],
  },
];

function groupServiziByCategoria(
  servizi: { icon: LucideIcon; titolo: string }[],
  categorie: CategoriaServizi[]
): Map<string, { icon: LucideIcon; titolo: string }[]> {
  const titoloToCat = new Map<string, string>();
  for (const cat of categorie) {
    for (const t of cat.titoli) titoloToCat.set(t, cat.id);
  }
  const byCat = new Map<string, typeof servizi>();
  for (const s of servizi) {
    const catId = titoloToCat.get(s.titolo) ?? "varie";
    if (!byCat.has(catId)) byCat.set(catId, []);
    byCat.get(catId)!.push(s);
  }
  return byCat;
}

export default async function ServiziPage() {
  const locale = getServerLocale(await cookies());
  const getIconKey = (icon: LucideIcon) =>
    (icon as unknown as { displayName?: string; name?: string }).displayName ??
    (icon as unknown as { displayName?: string; name?: string }).name ??
    "";

  const byCat = groupServiziByCategoria(serviziBooking, categorieServizi);
  const categoryLabelMapEn: Record<string, string> = {
    cucina: "Kitchen",
    camera: "Bedroom",
    bagno: "Bathroom",
    soggiorno: "Living area",
    esterni: "Outdoor areas",
    comuni: "Common areas",
    benessere: "Wellness services",
    ristorazione: "Food and drink",
    attivita: "Activities",
    intrattenimento: "Entertainment & family services",
    pulizie: "Cleaning services",
    negozi: "Shops",
    parcheggio: "Parking",
    internet: "Internet",
    media: "Media & technology",
    accessibilita: "Accessibility",
    trasporti: "Transport",
    accoglienza: "Reception services",
    vista: "Outdoor & view",
    edificio: "Building features",
    sicurezza: "Safety & security",
    lingue: "Languages spoken",
    varie: "Miscellaneous",
  };
  const serviceTitleMapEn: Record<string, string> = {
    "Spa & centro benessere": "Spa & wellness center",
    "Navetta aeroportuale": "Airport shuttle",
    "Camere non fumatori": "Non-smoking rooms",
    "Parcheggio privato": "Private parking",
    "Connessione WiFi gratuita": "Free WiFi",
    Terrazza: "Terrace",
    Bar: "Bar",
    "Colazione ottima": "Excellent breakfast",
    "Bagno privato": "Private bathroom",
    Parcheggio: "Parking",
    "Aria condizionata": "Air conditioning",
    "TV a schermo piatto": "Flat-screen TV",
    "Area picnic": "Picnic area",
    Ascensore: "Elevator",
    "Accesso con chiavi": "Key access",
    "Allarme antifumo": "Smoke alarm",
    "Appartamento privato in edificio": "Private apartment in building",
    "Area giochi": "Play area",
    "Area giochi all'aperto": "Outdoor play area",
    Armadietti: "Lockers",
    "Armadio o guardaroba": "Wardrobe or closet",
    "Arredamento da esterni": "Outdoor furniture",
    Asciugacapelli: "Hairdryer",
    Asciugamani: "Towels",
    Asciugatrice: "Dryer",
    Autorimessa: "Parking garage",
    Bidet: "Bidet",
    "Bollitore elettrico": "Electric kettle",
    "Bollitore tè/macchina caffè": "Tea/Coffee maker",
    "Cabina armadio": "Walk-in closet",
    "Campo da golf (nel raggio di 3 km)": "Golf course (within 3 km)",
    "Canali pay per view": "Pay-per-view channels",
    "Canali satellitari": "Satellite channels",
    "Canali via cavo": "Cable channels",
    Canoa: "Canoeing",
    "Cappella o luogo di culto": "Chapel/shrine",
    "Carta igienica": "Toilet paper",
    Cassaforte: "Safe",
    "Check-in e check-out privati": "Private check-in/check-out",
    Cucina: "Kitchen",
    "Deposito bagagli": "Luggage storage",
    Divano: "Sofa",
    Doccia: "Shower",
    "Escursioni in bicicletta": "Cycling",
    Escursionismo: "Hiking",
    Estintori: "Fire extinguishers",
    "Fattura disponibile su richiesta": "Invoice available on request",
    "Ferro da stiro": "Iron",
    "Ferro e asse da stiro": "Ironing facilities",
    Forno: "Oven",
    "Forno a microonde": "Microwave",
    Frigorifero: "Refrigerator",
    "Giochi da tavolo/puzzle": "Board games/puzzles",
    Inglese: "English",
    Italiano: "Italian",
    Francese: "French",
    "Ingresso indipendente": "Private entrance",
    Insonorizzazione: "Soundproofing",
    "Intrattenimento serale": "Evening entertainment",
    Lavastoviglie: "Dishwasher",
    Lavatrice: "Washing machine",
    "Macchina da caffè": "Coffee machine",
    Massaggi: "Massage",
    "Menù per diete particolari (su richiesta)":
      "Special diet menus (on request)",
    Minibar: "Minibar",
    "Mini club": "Kids' club",
    "Minimarket sul posto": "On-site minimarket",
    "Noleggio biciclette": "Bicycle rental",
    Pantofole: "Slippers",
    Accappatoio: "Bathrobe",
    "Parquet o pavimento in legno": "Hardwood or parquet floors",
    "Parrucchiere/salone di bellezza": "Hair/beauty salon",
    Pesca: "Fishing",
    "Piani superiori accessibili tramite ascensore":
      "Upper floors accessible by elevator",
    "Piano cottura": "Stovetop",
    "Presa elettrica vicino al letto": "Socket near the bed",
    "Prodotti da bagno in omaggio": "Free toiletries",
    "Prodotti per le pulizie": "Cleaning products",
    "Rilevatore di monossido di carbonio": "Carbon monoxide detector",
    Riscaldamento: "Heating",
    "Sala giochi": "Games room",
    "Sala comune/zona TV": "Shared lounge/TV area",
    Seggiolone: "High chair",
    "Servizio baby-sitter": "Babysitting service",
    "Servizio di parcheggio e riconsegna auto": "Valet parking",
    "Servizio lavanderia": "Laundry service",
    "Servizio navetta": "Shuttle service",
    "Servizio pulizie": "Housekeeping",
    "Servizio streaming (per es. Netflix)": "Streaming service (e.g. Netflix)",
    "Servizi spa": "Spa services",
    "Sicurezza 24 ore su 24": "24-hour security",
    "Soluzioni anallergiche": "Hypoallergenic room",
    "Sportello bancomat": "ATM/cash machine on site",
    "Stand appendiabiti": "Clothes rack",
    Stendibiancheria: "Drying rack for clothing",
    "Struttura interamente non fumatori": "Non-smoking throughout",
    "Tavolo da pranzo": "Dining table",
    Tostapane: "Toaster",
    "Tour a piedi": "Walking tours",
    "Tour in bicicletta": "Bike tours",
    "Tour o lezioni sulla cultura locale":
      "Tour or class about local culture",
    TV: "TV",
    "Utensili da cucina": "Kitchenware",
    "Vasca o doccia": "Bathtub or shower",
    "Vino/champagne": "Wine/champagne",
    "Vista Lago": "Lake view",
    "Vista città": "City view",
    "Vista luogo di interesse": "Landmark view",
    "Vista montagna": "Mountain view",
    WC: "Toilet",
    "Zona pranzo": "Dining area",
    "Zona soggiorno": "Sitting area",
    "Pagamenti accettati": "Accepted payments",
    "Banco escursioni": "Tour desk",
    Aerobica: "Aerobics",
    Sci: "Skiing",
    Equitazione: "Horse riding",
  };
  const categoriePerAccordion = categorieServizi
    .map((cat) => {
      const list = byCat.get(cat.id);
      if (!list || list.length === 0) return null;
      return {
        id: cat.id,
        label: locale === "en" ? (categoryLabelMapEn[cat.id] ?? cat.label) : cat.label,
        items: list.map((s) => ({
          iconKey: getIconKey(s.icon),
          titolo: locale === "en" ? (serviceTitleMapEn[s.titolo] ?? s.titolo) : s.titolo,
        })),
      };
    })
    .filter(
      (c): c is NonNullable<typeof c> => c !== null
    );

  return (
    <div className="">
      <section className=" min-h-[600px] md:min-h-screen">
        <Image
          src={images.serviziHero}
          alt={t(locale, "Servizi", "Services")}
          fill
          className="object-cover h-full"
          priority
          sizes=""
        />
        <div className="absolute inset-0 flex flex-col justify-center bg-linear-to-t items-center from-black/80 to-transparent p-6 md:p-10">
          <p className="text-lg font-medium uppercase tracking-wide text-center text-bianco/70 ">
            {t(
              locale,
              "Tutto ciò che serve per un soggiorno indimenticabile.",
              "Everything you need for an unforgettable stay.",
            )}
          </p>
          <h1 className="text-3xl font-extralight tracking-tighter text-bianco md:text-9xl">
            {t(locale, "Servizi", "Services")}
          </h1>
        </div>
      </section>

      {/* Servizi per categoria – sezioni con titolo */}
      <section className="relative z-10 py-16 md:py-24 bg-bianco">
        <div className="mx-auto max-w-4xl xl:max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-light uppercase tracking-wide text-scuro text-center mb-14">
            {t(locale, "Servizi in struttura", "On-site services")}
          </h2>
          <ServiziCategorieAccordion categorie={categoriePerAccordion} />
        </div>
      </section>
    </div>
  );
}
