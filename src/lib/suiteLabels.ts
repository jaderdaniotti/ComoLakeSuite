/** Slug suite → nome visualizzato (prenotazioni, email, log) */
export const SUITE_LABELS: Record<string, string> = {
  "suite-cavour": "Suite Cavour",
  "suite-volta": "Suite Volta",
  "suite-vista-duomo": "Suite Vista Duomo",
  "suite-dante": "Suite Dante",
  "suite-cernobbio": "Suite Cernobbio",
  "suite-como-sole": "Suite Como Sole",
};

export function suiteDisplayName(suiteId: string): string {
  return SUITE_LABELS[suiteId] ?? suiteId;
}
