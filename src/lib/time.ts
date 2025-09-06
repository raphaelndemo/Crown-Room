import { DateTime } from "luxon";
export const toUTC = (iso: string, tz: string) => DateTime.fromISO(iso, { zone: tz }).toUTC().toISO(); 