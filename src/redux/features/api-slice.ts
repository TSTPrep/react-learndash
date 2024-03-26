import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import queries from '../queries';
import { LoginRequest, LoginResponse } from './api.types';

const API_URL = process.env.WORDPRESS_API_URL;

const baseQuery =
    (): BaseQueryFn<{
        query: keyof typeof queries;
        variables: Record<string, any>;
    }> =>
    async ({ query, variables }) => {
        try {
            const res = await fetch(API_URL, {
                headers: {
                    Authorization: 'Bearer token',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({
                    query: queries[query],
                    variables,
                }),
            });
            return { data: (await res.json()).data };
        } catch (error) {
            return { error };
        }
    };

export const api = createApi({
    baseQuery: baseQuery(),
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: variables => ({
                query: 'login',
                variables,
            }),
        }),
    }),
});

export const { useLoginMutation } = api;
