export interface Dog {
  id?: number;
  age?: number;
  name: string;
  colour: string;
  breed: string;
  gender: string;
  birthday: Date;
  dateOfArrival: Date;
  lastVaccination: Date;
  hasBeenNeutered: boolean;
  sicknesses: string[];
}

export interface DogToEdit extends Dog {
  isEditing: boolean;
}

export interface User {
  id?: number;
  isAdmin?: boolean;
  firstName: string;
  lastName: string;
  address: string;
  username: string;
  password: string;
  email: string;
  phone: string;
}

export interface Drive {
  id?: number;
  dogId: number;
  timeOfDeparture: Date;
  source: string;
  destination: string;
  userId: number;
}

export interface Adoption {
  id?: number;
  adoptionDate: Date;
  dogId: number;
  userId: number;
}
