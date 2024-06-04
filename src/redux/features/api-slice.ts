import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import queries from '../queries';
import {
    Evaluation,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
    Role,
} from './api.types';
import { getLocalStorage } from '../../utils/localstorage';
import { BaseEndpointDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL + '/wp/graphql';

console.log(process.env);
console.log(process);


type BaseQuery = BaseQueryFn<
    {
        query: keyof typeof queries;
        queryName?: string;
        variables?: Record<string, any>;
    },
    unknown,
    string[]
>;

const baseQuery: BaseQuery = async ({ query, queryName, variables = {} }) => {
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
        const data = json.data[queryName ?? query];
        if (data !== null) {
            return { data };
        }

        const errors = json.errors.map(e => e.message);
        return { error: errors };
    } catch (error) {
        return { error };
    }
};

type EvaluationQuery<QueryArg, ResultType> = BaseEndpointDefinition<
    QueryArg,
    BaseQuery,
    ResultType
>['queryFn'];

function evaluationQuery(
    url: 'get_title'
): EvaluationQuery<Evaluation.TitleRequest, Evaluation.TitleResponse>;
function evaluationQuery(
    url: 'correct_sent'
): EvaluationQuery<Evaluation.EvaluateRequest, Evaluation.EvaluateResponse>;
function evaluationQuery(
    url: 'get_feedback'
): EvaluationQuery<Evaluation.FeedbackRequest, Evaluation.FeedbackResponse>;
function evaluationQuery(url: string) {
    return async (data: any) => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_HF_URL}/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_SECRET_KEY}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) return { error: [response.statusText] };

        const item = await response.json();
        return { data: item };
    };
}

export const api = createApi({
    baseQuery,
    tagTypes: ['Token'],
    endpoints: builder => ({
        evaluationTitle: builder.query<Evaluation.TitleResponse, Evaluation.TitleRequest>(
            {
                queryFn: evaluationQuery('get_title'),
            }
        ),
        evaluate: builder.mutation<
            Evaluation.EvaluateResponse,
            Evaluation.EvaluateRequest
        >({
            queryFn: evaluationQuery('correct_sent'),
        }),
        feedback: builder.mutation<
            Evaluation.FeedbackResponse,
            Evaluation.FeedbackRequest
        >({
            queryFn: evaluationQuery('get_feedback'),
        }),

        login: builder.mutation<LoginResponse, LoginRequest>({
            query: variables => ({
                query: 'login',
                variables,
            }),
            transformResponse: (data: {
                authToken: string;
                user: { roles: { nodes: { name: Role }[] } };
            }) => ({
                authToken: data.authToken,
                roles: data.user.roles.nodes.map(role => role.name),
            }),
            invalidatesTags: ['Token'],
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: variables => ({
                query: 'register',
                variables,
            }),
            invalidatesTags: ['Token'],
        }),
        roles: builder.query<Role[], void>({
            query: () => ({
                query: 'roles',
                queryName: 'viewer',
            }),
            transformResponse: (data: { roles: { nodes: { name: Role }[] } }) =>
                data.roles.nodes.map(role => role.name),
            providesTags: ['Token'],
        }),
    }),
});

export const {
    useEvaluationTitleQuery,
    useEvaluateMutation,
    useFeedbackMutation,
    useLoginMutation,
    useRegisterMutation,
    useRolesQuery,
} = api;
