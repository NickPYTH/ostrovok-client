import {GuestRequestModel} from "entities/GuestRequestModel";

export type InspectionReportModel = {
    id: number;
    guestRequest: GuestRequestModel;
    cleanRating: number;
    serviceRating: number;
    roomConditionRating: number;
    moneyRating: number;
    overallRating: number;
    cleanlessComment: string;
    serviceComment: string;
    roomConditionComment: string;
    improvementComment: string;
    finalVerdict: string;
    status: string;
    pointsFromAdmin: number | null;
}
