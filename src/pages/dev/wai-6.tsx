import React from 'react';
import { Wrapper } from '../../layout';
import SEO from '../../components/seo';
import WritingEvaluation from '../../components/forms/writing-evaluation-form-p';
import Authorize from '../../components/authorize';

const WaiSix = () => {
    return (
        <Authorize roles={['administrator', 'tester', 'beta-user']}>
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
                                            <WritingEvaluation connection_id={6} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </Wrapper>
        </Authorize>
    );
};

export default WaiSix;
