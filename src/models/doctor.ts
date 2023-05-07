import {dayTimes} from "@models/dayTimes";

export interface Doctor{
  id: number,
  name?: string,
  phone?: string,
  email?: string,
  gender?: string,
  bmdc?: number,
  specialities?: string[],
  degrees?: string[],
  doctorType?: any,
  consultationFee?: number,
  followupFee?: number,
  reportFee?: number,
  availableDayTimes?: dayTimes[],
  doctor?: any;
}
