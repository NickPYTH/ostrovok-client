import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {host} from "shared/config/constants";
import {CityModel} from "entities/CityModel";

export const cityAPI = createApi({
    reducerPath: 'cityAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/city`,
    }),
    tagTypes: ['city'],
    endpoints: (build) => ({
        getAll: build.mutation<CityModel[], void>({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            invalidatesTags: ['city']
        }),
        get: build.mutation<CityModel, number>({
            query: (id) => ({
                url: `/get?id=${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['city']
        }),
        update: build.mutation<CityModel, CityModel>({
            query: (body) => ({
                url: `/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['city']
        }),
        create: build.mutation<CityModel, CityModel>({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['city']
        }),
    })
});
