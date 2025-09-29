import {GuestRequestModel} from "entities/GuestRequestModel";

export type InspectionReportModel = {
    id: number | null;
    guestRequest: GuestRequestModel;
    cleannessRating: number;
    serviceRating: number;
    roomConditionRating: number;
    moneyRating: number;
    overallRating: number;
    cleannessComment: string;
    serviceComment: string;
    roomConditionComment: string;
    improvementComment: string;
    finalVerdict: string;
    status: string;
    pointsFromAdmin: number | null;
}
