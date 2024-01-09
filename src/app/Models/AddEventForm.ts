import {TypeDay} from "./TypeDay";
import {Status} from "./Status";

export interface AddEventForm {
  name : string;
  adress: string ;
  description : string;
  endDate: string;
  startDate : string ;
  location : string ;
  status : Status

}
