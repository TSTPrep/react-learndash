import React, { ChangeEvent, useState } from 'react';
import { Wrapper } from '../../layout';
import SEO from '../../components/seo';
import { Evaluation } from '../../redux/features/api.types';
import EvaluationResponse from '../../components/writing-evaluation/EvaluationResponse';
import FeedbackResponse from '../../components/writing-evaluation/FeedbackResponse';

type ResultJson = {
    evaluation: Evaluation.EvaluateResponse;
    feedback: Evaluation.FeedbackResponse;
    preset: string;
    connection_id: number;
};

const UploadJson = () => {
    const [resultJson, setFileContent] = useState<ResultJson | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/json') {
            const reader = new FileReader();
            reader.onload = e => {
                try {
                    // @ts-ignore
                    const json = JSON.parse(e.target.result);
                    setFileContent(json);
                } catch (error) {
                    alert('Error parsing JSON!');
                }
            };
            reader.readAsText(file);
        } else {
            alert('Please upload a valid JSON file.');
        }
    };

    return (
        <Wrapper>
            <SEO pageTitle={'Upload Json'} />
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
                                        <h5 className='title'>Upload Json</h5>
                                        <div className='writing-evaluation-form writing-evaluation-form-1'>
                                            <input
                                                type='file'
                                                onChange={handleFileChange}
                                                accept='.json'
                                            />
                                            {resultJson && (
                                                <>
                                                    <h5 className='title'>
                                                        {'Connection ' +
                                                            resultJson.connection_id}
                                                    </h5>
                                                    <p>{resultJson.preset}</p>
                                                    <EvaluationResponse
                                                        evaluation={resultJson.evaluation}
                                                    />
                                                    <FeedbackResponse
                                                        feedback={
                                                            resultJson.feedback.feedback
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>
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

export default UploadJson;
