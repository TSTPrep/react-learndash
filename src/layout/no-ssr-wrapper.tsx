import dynamic from 'next/dynamic';
import React from 'react';

type NoSSRWrapperProps = {
    children: React.ReactElement;
};

const NoSSRWrapper = ({ children }: NoSSRWrapperProps) => (
    <React.Fragment>{children}</React.Fragment>
);

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
    ssr: false,
});
