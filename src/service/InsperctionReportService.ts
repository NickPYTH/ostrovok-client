import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {host} from "shared/config/constants";
import {InspectionReportModel} from "entities/InspectionReportModel";

export const inspectionReportAPI = createApi({
    reducerPath: 'inspectionReportAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/inspectionReport`,
    }),
    tagTypes: ['inspectionReport'],
    endpoints: (build) => ({
        getAll: build.mutation<InspectionReportModel[], void>({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            invalidatesTags: ['inspectionReport']
        }),
        get: build.mutation<InspectionReportModel, number>({
            query: (id) => ({
                url: `/get?id=${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['inspectionReport']
        }),
        update: build.mutation<InspectionReportModel, InspectionReportModel>({
            query: (body) => ({
                url: `/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['inspectionReport']
        }),
        create: build.mutation<InspectionReportModel, InspectionReportModel>({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['inspectionReport']
        }),
    })
});
