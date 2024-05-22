import dynamic from 'next/dynamic';
import React from 'react';
import { Role } from '../redux/features/api.types';
import { useRolesQuery } from '../redux/features/api-slice';
import { useRouter } from 'next/router';

type AuthorizeProps = {
    /** The roles that are allowed */
    roles: Role[];
    children?: React.ReactNode;
    /**
     * Component that is displayed if the user is authorized.
     * Takes the roles for more fine-grained control than `children`.
     * Takes precedence over `children`.
     */
    Component?: React.JSXElementConstructor<{ roles: Role[] }>;
    /** The component to display on loading */
    loading?: React.ReactNode;
    /** Where to redirect if not authenticated */
    redirect?: string;
    /** Where to redirect if not authorized */
    redirectNotAuthorized?: string | ((roles: Role[]) => string);
};

const Authorize = ({
    roles,
    children,
    Component,
    loading,
    redirect = '/sign-in',
    redirectNotAuthorized = '',
}: AuthorizeProps) => {
    const { data: userRoles, isFetching, isError } = useRolesQuery();
    const router = useRouter();

    if (isFetching) {
        return <>{loading}</>;
    }

    if (isError) {
        router.replace(redirect);
        return <></>;
    }

    if (!userRoles.filter(role => roles.includes(role)).length) {
        if (typeof redirectNotAuthorized === 'string') {
            router.replace(redirectNotAuthorized);
        } else {
            router.replace(redirectNotAuthorized(userRoles));
        }
        return <></>;
    }

    if (Component) {
        return <Component roles={userRoles} />;
    }

    return <>{children}</>;
};

export default dynamic(() => Promise.resolve(Authorize), { ssr: false });
