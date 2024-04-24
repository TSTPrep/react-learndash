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
