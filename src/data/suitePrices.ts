/**
 * Listino prezzi a notte (€) da prezzi.md.
 * Ogni array è in ordine cronologico; i periodi non si sovrappongono.
 *
 * Note:
 * - Secondo blocco con stesse date del primo in prezzi.md → interpretato come 21/12–31/12 (picco).
 * - Gen–Mar 2027 per Cavour/Volta/Duomo: stesse tariffe del periodo 01/11–20/12 (media invernale).
 * - "DAL 01/11/2026 AL 31/03/2026" (Dante/Cernobbio/Como Sole) → 31/03/2027.
 */

export type SuitePriceId =
  | "suite-cavour"
  | "suite-volta"
  | "suite-vista-duomo"
  | "suite-dante"
  | "suite-cernobbio"
  | "suite-como-sole";

export type OccupancyPrices = Partial<Record<1 | 2 | 3 | 4 | 5 | 6, number>>;

export type SuitePriceSeason = {
  start: string;
  end: string;
  label?: string;
  pricesEUR: OccupancyPrices;
};

export const SUITE_PRICES: Record<SuitePriceId, SuitePriceSeason[]> = {
  "suite-cavour": [
    {
      label: "Inverno (gen–mar 2026)",
      start: "2026-01-01",
      end: "2026-03-31",
      pricesEUR: { 1: 250, 2: 330, 3: 425, 4: 550 },
    },
    {
      label: "Alta stagione",
      start: "2026-04-01",
      end: "2026-10-31",
      pricesEUR: { 1: 340, 2: 430, 3: 530, 4: 660 },
    },
    {
      label: "Media / inverno pre-festività",
      start: "2026-11-01",
      end: "2026-12-20",
      pricesEUR: { 1: 250, 2: 330, 3: 425, 4: 550 },
    },
    {
      label: "Picco festività",
      start: "2026-12-21",
      end: "2026-12-31",
      pricesEUR: { 1: 310, 2: 410, 3: 500, 4: 630 },
    },
    {
      label: "Inverno (gen–mar 2027)",
      start: "2027-01-01",
      end: "2027-03-31",
      pricesEUR: { 1: 250, 2: 330, 3: 425, 4: 550 },
    },
  ],

  "suite-volta": [
    {
      label: "Inverno (gen–mar 2026)",
      start: "2026-01-01",
      end: "2026-03-31",
      pricesEUR: { 1: 250, 2: 330, 3: 425, 4: 550, 5: 680, 6: 810 },
    },
    {
      label: "Alta stagione",
      start: "2026-04-01",
      end: "2026-10-31",
      pricesEUR: { 1: 340, 2: 430, 3: 530, 4: 640, 5: 780, 6: 910 },
    },
    {
      label: "Media / inverno pre-festività",
      start: "2026-11-01",
      end: "2026-12-20",
      pricesEUR: { 1: 250, 2: 330, 3: 425, 4: 550, 5: 680, 6: 810 },
    },
    {
      label: "Picco festività (solo da 2 persone)",
      start: "2026-12-21",
      end: "2026-12-31",
      pricesEUR: { 2: 410, 3: 500, 4: 630, 5: 760, 6: 890 },
    },
    {
      label: "Inverno (gen–mar 2027)",
      start: "2027-01-01",
      end: "2027-03-31",
      pricesEUR: { 1: 250, 2: 330, 3: 425, 4: 550, 5: 680, 6: 810 },
    },
  ],

  "suite-vista-duomo": [
    {
      label: "Inverno (gen–mar 2026)",
      start: "2026-01-01",
      end: "2026-03-31",
      pricesEUR: { 1: 240, 2: 295, 3: 390, 4: 495 },
    },
    {
      label: "Alta stagione",
      start: "2026-04-01",
      end: "2026-10-31",
      pricesEUR: { 1: 340, 2: 400, 3: 490, 4: 595 },
    },
    {
      label: "Media / inverno pre-festività",
      start: "2026-11-01",
      end: "2026-12-20",
      pricesEUR: { 1: 240, 2: 295, 3: 390, 4: 495 },
    },
    {
      label: "Picco festività",
      start: "2026-12-21",
      end: "2026-12-31",
      pricesEUR: { 1: 310, 2: 395, 3: 485, 4: 610 },
    },
    {
      label: "Inverno (gen–mar 2027)",
      start: "2027-01-01",
      end: "2027-03-31",
      pricesEUR: { 1: 240, 2: 295, 3: 390, 4: 495 },
    },
  ],

  "suite-dante": [
    {
      label: "Gen–mar 2026",
      start: "2026-01-01",
      end: "2026-03-31",
      pricesEUR: { 2: 225, 3: 320, 4: 410, 5: 500, 6: 590 },
    },
    {
      label: "Alta stagione",
      start: "2026-04-01",
      end: "2026-10-31",
      pricesEUR: { 2: 310, 3: 400, 4: 490, 5: 580, 6: 690 },
    },
    {
      label: "Bassa nov–mar 2027",
      start: "2026-11-01",
      end: "2027-03-31",
      pricesEUR: { 2: 225, 3: 320, 4: 410, 5: 500, 6: 590 },
    },
  ],

  "suite-cernobbio": [
    {
      label: "Gen–mar 2026",
      start: "2026-01-01",
      end: "2026-03-31",
      pricesEUR: { 1: 150, 2: 200, 3: 290, 4: 370 },
    },
    {
      label: "Alta stagione",
      start: "2026-04-01",
      end: "2026-10-31",
      pricesEUR: { 1: 230, 2: 280, 3: 370, 4: 460 },
    },
    {
      label: "Bassa nov–mar 2027",
      start: "2026-11-01",
      end: "2027-03-31",
      pricesEUR: { 1: 150, 2: 200, 3: 290, 4: 370 },
    },
  ],

  "suite-como-sole": [
    {
      label: "Gen–mar 2026",
      start: "2026-01-01",
      end: "2026-03-31",
      pricesEUR: { 2: 130, 3: 200, 4: 300 },
    },
    {
      label: "Alta stagione",
      start: "2026-04-01",
      end: "2026-10-31",
      pricesEUR: { 2: 150, 3: 240, 4: 320 },
    },
    {
      label: "Bassa nov–mar 2027",
      start: "2026-11-01",
      end: "2027-03-31",
      pricesEUR: { 2: 130, 3: 200, 4: 300 },
    },
  ],
};
