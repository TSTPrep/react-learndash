import React, { FormEvent, useState } from 'react';
import '../../utils/jquery';
import Sentence from './writing-evaluation/Sentence';
import { useEvaluateMutation, useFeedbackMutation } from '../../redux/features/api-slice';
import { Evaluation } from '../../redux/features/api.types';
import Timer from './writing-evaluation/Timer';

const WritingEvaluationForm = () => {
    const [essay, setEssay] = useState('');
    const [task, setTask] = useState('');

    const [evaluation, setEvaluation] = useState<Evaluation.EvaluateResponse | null>(
        null
    );
    const [feedback, setFeedback] = useState<Evaluation.FeedbackResponse | null>(null);

    const [evaluate, { isLoading, isError, error, isUninitialized }] =
        useEvaluateMutation();
    const [getFeedback, { isLoading: isFeedbackLoading }] = useFeedbackMutation();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const demo = false;
        const response = await evaluate({
            essay,
            task,
            demo,
            connection_id: 1,
        });

        if ('error' in response) throw new Error(response.error[0]);

        setEvaluation(response.data);

        const response2 = await getFeedback({
            task,
            demo,
            connection_id: 1,
            result_json: response.data.result_json,
        });

        if ('error' in response2) throw new Error(response2.error[0]);

        setFeedback(response2.data);
    };

    return (
        <div className='writing-evaluation-form writing-evaluation-form-1'>
            {isUninitialized || isLoading ? (
                <form onSubmit={handleSubmit}>
                    <div className='form-group waf-textarea'>
                        <label htmlFor='essay'>Essay</label>
                        <textarea
                            name='essay'
                            // value={essay}
                            // value="Recently there has been a debate as to the PEDs. More specifically, in regard to the passages, the author puts forth the idea that this drug should be prohibited."
                            placeholder='Paste or write your essay here'
                            onBlur={e => setEssay(e.target.value)}
                            data-gramm='false'
                            data-gramm_editor='false'
                            data-enable-grammarly='false'
                            spellCheck='false'
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                            disabled={isLoading}
                        />
                    </div>

                    <div className='form-group waf-textarea'>
                        <label htmlFor='task'>Task</label>
                        <textarea
                            name='task'
                            // value={task}
                            // value="Everyone wants to get in better shape, but it usually takes a tremendous amount of time and effort. "
                            placeholder='Paste your TOEFL integrated writing task here'
                            onBlur={e => setTask(e.target.value)}
                            data-gramm='false'
                            data-gramm_editor='false'
                            data-enable-grammarly='false'
                            spellCheck='false'
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                            disabled={isLoading}
                        />
                    </div>

                    {isLoading && (
                        <>
                            <p id='elapsedTime' style={{ marginBottom: 0 }}>
                                Elapsed time: <Timer /> seconds
                            </p>
                            <p id='waitingTime' style={{ marginBottom: 0 }}>
                                Depending on the length of your essay and the amount of
                                mistakes, <br />
                                the waiting time can vary between 15s and 120s
                            </p>
                        </>
                    )}

                    <div className='form-group'>
                        <button
                            type='submit'
                            className='edu-btn btn-medium'
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                'Loading ...'
                            ) : (
                                <>
                                    Start <i className='icon-4'></i>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            ) : isError ? (
                <p>{error[0]}</p>
            ) : (
                <>
                    <p>
                        {evaluation &&
                            evaluation.operations.map((d, i) => (
                                <Sentence key={i} data={d} index={i} />
                            ))}
                    </p>
                    {isFeedbackLoading ? (
                        <>
                            <p id='elapsedTime' style={{ marginBottom: 0 }}>
                                Elapsed time: <Timer /> seconds
                            </p>
                            <p id='waitingTime' style={{ marginBottom: 0 }}>
                                Waiting on feedback
                            </p>
                        </>
                    ) : (
                        feedback && (
                            <>
                                <h5>Grammar</h5>
                                <p>{feedback.feedback.grammar}</p>
                                <h5>Spelling</h5>
                                <p>{feedback.feedback.spelling}</p>
                                <h5>Punctuation</h5>
                                <p>{feedback.feedback.punctuation}</p>
                                <h5>Style</h5>
                                <p>{feedback.feedback.style}</p>
                                <h5>Vocabulary</h5>
                                <p>{feedback.feedback.vocabulary}</p>
                                <h5>Clarity & Coherence</h5>
                                <p>{feedback.feedback.clarity_coherence}</p>
                                <h5>Next steps</h5>
                                <p>{feedback.feedback.next_steps}</p>
                            </>
                        )
                    )}
                </>
            )}
        </div>
    );
};

export default WritingEvaluationForm;
