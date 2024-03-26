const queries = {
    login: `
        mutation LoginUser($username: String!, $password: String!) {
            login(
                input: {
                    clientMutationId: "uniqueId"
                    username: $username
                    password: $password
                }
            ) {
                authToken
            }
        }
    `,
};

export default queries;
