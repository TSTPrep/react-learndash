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
