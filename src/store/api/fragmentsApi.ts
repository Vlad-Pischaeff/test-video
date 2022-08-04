import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IFragment } from '@assets/Types/Types';

export const fragmentsApi = createApi({
    reducerPath: 'fragmentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://www.mocky.io/v2',
    }),
    endpoints: (builder) => ({
        getFragments: builder.query<IFragment[], string>({
            query: () => ({
                url: '5e60c5f53300005fcc97bbdd'
            }),
        }),    
    }),
});

export const {
    useGetFragmentsQuery,
} = fragmentsApi;