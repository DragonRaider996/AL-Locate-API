export interface HospitalInterface {
  id: number;
  name: string;
  hlat: number;
  hlong: number;
  waitingTime?: number;
}