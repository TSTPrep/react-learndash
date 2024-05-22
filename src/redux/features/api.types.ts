export namespace Evaluation {
    export type CorrectFragmentData = {
        op: 'nochange';
        word: string;
        replace?: undefined;
        indicator?: undefined;
        feedback?: undefined;
    };

    export type SingleFragmentData = {
        op: 'addition' | 'deletion';
        word: string;
        replace?: undefined;
        indicator: string;
        feedback: string;
    };

    export type DoubleFragmentData = {
        op: 'replacement';
        word: string;
        replace: string;
        indicator: string;
        feedback: string;
    };

    export type SentenceFragmentData =
        | CorrectFragmentData
        | SingleFragmentData
        | DoubleFragmentData;

    export type SentenceData = SentenceFragmentData[];

    export type EvaluateOpcodes = SentenceData[];

    type EvaluateResult = {
        evaluation_per_sentence: {
            original_sentence: string;
            corrected_sentence: string;
        }[];
    };

    export type TitleRequest = {
        connection_id: number;
    };

    export type TitleResponse = {
        title: string;
        preset: string;
    };

    export type EvaluateRequest = {
        essay: string;
        task: string;
        demo: boolean;
        connection_id: number;
    };

    export type EvaluateResponse = {
        operations: EvaluateOpcodes;
        result_json: EvaluateResult;
    };

    export type FeedbackRequest = {
        task: string;
        demo: boolean;
        connection_id: number;
        result_json: EvaluateResult;
    };

    export type FeedbackResponse = {
        feedback: Record<string, string>;
    };
}

export type Role = 'administrator' | 'tester' | 'beta-user';

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    authToken: string;
    roles: Role[];
};

export type RegisterRequest = {
    email: string;
    username: string;
    password: string;
};

export type RegisterResponse = {
    user: {
        jwtAuthToken: string;
    };
};
