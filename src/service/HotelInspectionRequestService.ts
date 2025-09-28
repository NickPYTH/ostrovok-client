import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {host} from "shared/config/constants";
import {HotelInspectionRequestModel} from "entities/HotelInspectionRequestModel";

export const hotelInspectionRequestAPI = createApi({
    reducerPath: 'hotelInspectionRequestAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/hotelInspectionRequest`,
    }),
    tagTypes: ['hotelInspectionRequest'],
    endpoints: (build) => ({
        getAll: build.mutation<HotelInspectionRequestModel[], void>({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            invalidatesTags: ['hotelInspectionRequest']
        }),
        get: build.mutation<HotelInspectionRequestModel, number>({
            query: (id) => ({
                url: `/get?id=${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['hotelInspectionRequest']
        }),
        update: build.mutation<HotelInspectionRequestModel, HotelInspectionRequestModel>({
            query: (body) => ({
                url: `/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['hotelInspectionRequest']
        }),
        create: build.mutation<HotelInspectionRequestModel, HotelInspectionRequestModel>({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['hotelInspectionRequest']
        }),
    })
});
