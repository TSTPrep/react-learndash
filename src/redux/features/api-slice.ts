import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react';
import queries from '../queries';
import {
    Evaluation,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from './api.types';
import { getLocalStorage } from '../../utils/localstorage';
import { BaseEndpointDefinition } from '@reduxjs/toolkit/dist/query/endpointDefinitions';

const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

type BaseQuery = BaseQueryFn<
    {
        query: keyof typeof queries;
        variables: Record<string, any>;
    },
    unknown,
    string[]
>;

const baseQuery: BaseQuery = async ({ query, variables }) => {
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
        const response = await fetch(`https://TSTPrep-tstprep-writing.hf.space/${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer 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',
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
        }),
        register: builder.mutation<RegisterResponse, RegisterRequest>({
            query: variables => ({
                query: 'register',
                variables,
            }),
        }),
    }),
});

export const {
    useEvaluationTitleQuery,
    useEvaluateMutation,
    useFeedbackMutation,
    useLoginMutation,
    useRegisterMutation,
} = api;
