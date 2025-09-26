import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {host} from "shared/config/constants";
import {ProfileModel} from "entities/ProfileModel";

export const profileAPI = createApi({
    reducerPath: 'profileAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${host}/api/profile`,
    }),
    tagTypes: ['profile'],
    endpoints: (build) => ({
        getAll: build.mutation<ProfileModel[], void>({
            query: () => ({
                url: `/getAll`,
                method: 'GET',
            }),
            invalidatesTags: ['profile']
        }),
        get: build.mutation<ProfileModel, number>({
            query: (id) => ({
                url: `/get?id=${id}`,
                method: 'GET',
            }),
            invalidatesTags: ['profile']
        }),
        update: build.mutation<ProfileModel, ProfileModel>({
            query: (body) => ({
                url: `/update`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['profile']
        }),
        create: build.mutation<ProfileModel, ProfileModel>({
            query: (body) => ({
                url: `/create`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['profile']
        }),
    })
});
