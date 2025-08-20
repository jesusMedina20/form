import { AdditionalServices } from "./aditionalServices";
import { FlightInfo } from "./step1";
import { TravelersInfo } from "./step2";

export interface FormSummaryProps {
  step1: FlightInfo;
  step2: TravelersInfo;
  aditional: AdditionalServices;
}