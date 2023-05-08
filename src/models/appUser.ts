import {Organization} from "@models/organization";

export interface AppUser{
  id: number,
  name: string,
  email: string,
  phone: string,
  gender: string,
  address: string,
  organization: Organization,
  age: number,
  role: string[],
  password: string,
}
