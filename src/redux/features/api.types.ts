export namespace Evaluation {
    export type SingleFragmentType = 'nochange' | 'addition' | 'deletion';
    export type DoubleFragmentType = 'replacement';

    export type SentenceFragmentData =
        | {
              op: SingleFragmentType;
              word: string;
              replace?: undefined;
          }
        | {
              op: DoubleFragmentType;
              word: string;
              replace: string;
          };

    export type SentenceData = SentenceFragmentData[];

    export type EvaluateOpcodes = SentenceData[];

    type EvaluateResult = {
        evaluation_per_sentence: {
            original_sentence: string;
            corrected_sentence: string;
        }[];
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

export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    authToken: string;
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
