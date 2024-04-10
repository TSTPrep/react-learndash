import React, { FormEvent, useState } from 'react';
import '../../utils/jquery';
import Sentence from '../writing-evaluation/Sentence';
import {
    useEvaluateMutation,
    useEvaluationTitleQuery,
    useFeedbackMutation,
} from '../../redux/features/api-slice';
import { Evaluation } from '../../redux/features/api.types';
import Timer from '../writing-evaluation/Timer';
import EvaluationResponse from '../writing-evaluation/EvaluationResponse';
import FeedbackResponse from '../writing-evaluation/FeedbackResponse';

type FormProps = {
    loading: boolean;
    onSubmit: (data: { essay: string; task: string }) => Promise<void>;
};

const Form = ({ loading, onSubmit }: FormProps) => {
    const [essay, setEssay] = useState('');
    const [task, setTask] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await onSubmit({ essay, task });
    };

    return (
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
                    disabled={loading}
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
                    disabled={loading}
                />
            </div>

            {loading && (
                <>
                    <p id='elapsedTime' style={{ marginBottom: 0 }}>
                        Elapsed time: <Timer /> seconds
                    </p>
                    <p id='waitingTime' style={{ marginBottom: 0 }}>
                        Depending on the length of your essay and the amount of mistakes,{' '}
                        <br />
                        the waiting time can vary between 15s and 120s
                    </p>
                </>
            )}

            <div className='form-group'>
                <button type='submit' className='edu-btn btn-medium' disabled={loading}>
                    {loading ? (
                        'Loading ...'
                    ) : (
                        <>
                            Start <i className='icon-4'></i>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

type WritingEvaluationProps = {
    connection_id: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
};

const WritingEvaluation = ({ connection_id }: WritingEvaluationProps) => {
    const { data: titleData } = useEvaluationTitleQuery({ connection_id });
    const [evaluation, setEvaluation] = useState<Evaluation.EvaluateResponse | null>(
        null
    );
    const [feedback, setFeedback] = useState<Evaluation.FeedbackResponse | null>(null);

    const [evaluate, { isLoading, isError, error, isUninitialized }] =
        useEvaluateMutation();
    const [
        getFeedback,
        { isLoading: isFeedbackLoading, isError: isFeedbackError, error: feedbackError },
    ] = useFeedbackMutation();

    const handleSubmit: FormProps['onSubmit'] = async ({ task, essay }) => {
        const demo = false;
        const response = await evaluate({
            essay,
            task,
            demo,
            connection_id,
        });

        if ('error' in response) return;

        setEvaluation(response.data);

        const response2 = await getFeedback({
            task,
            demo,
            connection_id: 1,
            result_json: response.data.result_json,
        });

        if ('error' in response2) return;

        setFeedback(response2.data);
    };

    if (!titleData) {
        return <>Loading</>;
    }

    return (
        <>
            <h5 className='title'>{titleData.title}</h5>
            <p>{titleData.preset}</p>
            <div className='writing-evaluation-form writing-evaluation-form-1'>
                {isUninitialized || isLoading ? (
                    <Form onSubmit={handleSubmit} loading={isLoading} />
                ) : isError ? (
                    <p>{error[0]}</p>
                ) : (
                    <>
                        <EvaluationResponse evaluation={evaluation} />
                        <div className='feedback'>
                            {isFeedbackLoading ? (
                                <>
                                    <p id='elapsedTime' style={{ marginBottom: 0 }}>
                                        Elapsed time: <Timer /> seconds
                                    </p>
                                    <p id='waitingTime' style={{ marginBottom: 0 }}>
                                        Waiting on feedback
                                    </p>
                                </>
                            ) : isFeedbackError ? (
                                <p>{feedbackError[0]}</p>
                            ) : (
                                feedback && (
                                    <FeedbackResponse feedback={feedback.feedback} />
                                )
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default WritingEvaluation;
