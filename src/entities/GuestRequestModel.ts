import {HotelInspectionRequestModel} from "entities/HotelInspectionRequestModel";
import {UserModel} from "entities/UserModel";

export type GuestRequestModel = {
    id: number | null;
    hotelInspectionRequest: HotelInspectionRequestModel;
    guest: UserModel,
    dateStart: number;
    dateFinish: number;
}
