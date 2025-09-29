import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {host} from "shared/config/constants";
import {GuestRequestModel} from "entities/GuestRequestModel";

export const guestRequestAPI = createApi({
    reducerPath: 'guestRequestAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/guestRequestAPI`,
    }),
    tagTypes: ['guestRequestAPI'],
    endpoints: (build) => ({
        getAll: build.mutation<GuestRequestModel[], void>({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            invalidatesTags: ['guestRequestAPI']
        }),
        get: build.mutation<GuestRequestModel, number>({
            query: (id) => ({
                url: `/get?id=${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['guestRequestAPI']
        }),
        update: build.mutation<GuestRequestModel, GuestRequestModel>({
            query: (body) => ({
                url: `/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['guestRequestAPI']
        }),
        create: build.mutation<GuestRequestModel, GuestRequestModel>({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['guestRequestAPI']
        }),
    })
});
