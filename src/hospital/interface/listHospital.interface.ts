export interface HospitalInterface {
  id: number;
  name: string;
  address: string;
  hlat: number;
  hlong: number;
  waitingTime?: number;
}