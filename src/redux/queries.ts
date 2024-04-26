const queries = {
    login: `
        mutation LoginUser($username: String!, $password: String!) {
            login(
                input: {
                    username: $username
                    password: $password
                }
            ) {
                authToken
                user {
                    roles {
                        nodes {
                            name
                        }
                    }
                }
            }
        }
    `,
    register: `
        mutation RegisterUser($username: String!, $email: String!, $password: String!) {
            registerUser(
                input: {
                    username: $username
                    password: $password
                    email: $email
                }
            ) {
                user {
                    jwtAuthToken
                }
            }
        }
    `,
    roles: `
        query UserRoles {
            viewer {
                roles {
                    nodes {
                        name
                    }
                }
            }
        }
    `,
};

export default queries;
