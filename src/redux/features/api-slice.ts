import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import queries from '../queries';
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from './api.types';
import { getLocalStorage } from '../../utils/localstorage';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

const baseQuery =
    (): BaseQueryFn<
        {
            query: keyof typeof queries;
            variables: Record<string, any>;
        },
        unknown,
        string[]
    > =>
    async ({ query, variables }) => {
        try {
            const token = getLocalStorage<string>('token');
            const headers = {
                'Content-Type': 'application/json',
                ...(query === 'login'
                    ? {}
                    : {
                          Authorization: `Bearer ${token}`,
                      }),
            };

            const res = await fetch(API_URL, {
                headers,
                method: 'POST',
                body: JSON.stringify({
                    query: queries[query],
                    variables,
                }),
            });
            const json = await res.json();
            const data = json.data[query];
            if (data !== null) {
                return { data };
            }

            const errors = json.errors.map(e => e.message);
            return { error: errors };
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
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: variables => ({
                query: 'register',
                variables,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = api;
