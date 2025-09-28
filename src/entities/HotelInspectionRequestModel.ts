import {HotelModel} from "entities/HotelModel";

export type HotelInspectionRequestModel = {
    id: number | null;
    hotel: HotelModel;
    startDate: number;
    status: string;
    creator: string;
    description: string;
    sessionCount: number;
}
