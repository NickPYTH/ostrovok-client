import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {host} from "shared/config/constants";
import {HotelModel} from "entities/HotelModel";

export const hotelAPI = createApi({
    reducerPath: 'hotelAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/hotel`,
    }),
    tagTypes: ['hotel'],
    endpoints: (build) => ({
        getAll: build.mutation<HotelModel[], void>({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            invalidatesTags: ['hotel']
        }),
        get: build.mutation<HotelModel, number>({
            query: (id) => ({
                url: `/get?id=${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['hotel']
        }),
        update: build.mutation<HotelModel, HotelModel>({
            query: (body) => ({
                url: `/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['hotel']
        }),
        create: build.mutation<HotelModel, HotelModel>({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['hotel']
        }),
    })
});
