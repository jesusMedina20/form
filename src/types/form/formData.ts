import { AdditionalServices } from "./aditionalServices";
import { FlightInfo } from "./step1";
import { TravelersInfo } from "./step2";

export interface FormData {
  flight: FlightInfo;
  travelers: TravelersInfo;
  services: AdditionalServices;
}