export interface Traveler {
  fullName: string;
  birthdate: string;
  documentType: string;
  documentNumber: string;
}

export interface TravelersInfo {
  numberOfTravelers: number;
  travelers: Traveler[];
  hasPets: boolean;
  numberOfPets: number;
  hasSuitcases: boolean;
  numberOfSuitcases: number;
}