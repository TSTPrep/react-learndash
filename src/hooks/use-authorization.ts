import { useRolesQuery } from '../redux/features/api-slice';

type UseAuthorizationHookPartialResult = {
    isAuthenticated: boolean;
    isAdmin: boolean;
    roles: string[];
};

type UseAuthorizationHookResult =
    | ({
          isLoading: true;
      } & Partial<UseAuthorizationHookPartialResult>)
    | ({ isLoading: false } & UseAuthorizationHookPartialResult);

export const useAuthorization = (): UseAuthorizationHookResult => {
    const { data: roles, isLoading, isError } = useRolesQuery();

    if (isLoading) {
        return { isLoading };
    }

    if (isError) {
        return {
            isLoading: false,
            isAdmin: false,
            isAuthenticated: false,
            roles: [],
        };
    }

    return {
        isLoading: false,
        isAuthenticated: true,
        isAdmin: roles.includes('administrator'),
        roles,
    };
};
