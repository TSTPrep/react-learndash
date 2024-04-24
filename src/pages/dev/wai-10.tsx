import React, { useLayoutEffect } from 'react';
import { Wrapper } from '../../layout';
import SEO from '../../components/seo';
import WritingEvaluation from '../../components/forms/writing-evaluation-form-p';
import { useAuthorization } from '../../hooks/use-authorization';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const WaiTen = () => {
    const { isLoading, isAdmin } = useAuthorization();
    const router = useRouter();

    useLayoutEffect(() => {
        if (!isLoading && !isAdmin) {
            router.push('/sign-in');
        }
    }, [isLoading, isAdmin, router]);

    if (isLoading) {
        return <></>;
    }

    return (
        <Wrapper>
            <SEO pageTitle={'Course Details'} />
            <div id='main-wrapper' className='main-wrapper'>
                <section className='edu-section-gap course-details-area'>
                    <div className='course-details-content'>
                        <div className='tab-content' id='myTabContent'>
                            <div
                                className='tab-pane fade show active'
                                id='overview'
                                role='tabpanel'
                                aria-labelledby='overview-tab'
                            >
                                <div className='course-tab-content'>
                                    <div className='course-overview'>
                                        <WritingEvaluation connection_id={10} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Wrapper>
    );
};

export default dynamic(() => Promise.resolve(WaiTen), { ssr: false });
