export type LoginRequest = {
    username: string;
    password: string;
};

export type LoginResponse = {
    authToken: string;
};
