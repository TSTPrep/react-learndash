import React from 'react';
import { Wrapper } from '../../layout';
import SEO from '../../components/seo';
import WritingEvaluationForm from '../../components/forms/writing-evaluation-form';

const WaiTwo = () => {
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
                                        <h5 className='title'>
                                            TST Prep&apos;s Writing Evaluation Demo
                                            v1.0.6b
                                        </h5>
                                        <WritingEvaluationForm connection_id={2} />
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

export default WaiTwo;
