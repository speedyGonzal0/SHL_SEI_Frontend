export interface Doctor{
  id: number,
  name?: string,
  phone?: string,
  email?: string,
  gender?: string,
  bmdc?: number,
  specialities?: string[],
  degrees?: string[],
  consultationFee?: number,
  followupFee?: number,
  reportFee?: number,
  availableTimes?: string[]
}
