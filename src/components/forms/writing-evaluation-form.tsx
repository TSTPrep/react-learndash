import React, { useState } from 'react';
import '../../utils/jquery';
import Sentence from './writing-evaluation/Sentence';
import { useEvaluateMutation } from '../../redux/features/api-slice';
import { Evaluation } from '../../redux/features/api.types';
import Timer from './writing-evaluation/Timer';

const WritingEvaluationForm = () => {
    const [essay, setEssay] = useState('');
    const [task, setTask] = useState('');

    const [response, setResponse] = useState<Evaluation.EvaluateResponse | null>(null);

    const [evaluate, { isLoading, isError, error, isUninitialized }] =
        useEvaluateMutation();

    const handleSubmit = async e => {
        e.preventDefault();

        const demo = false;
        const response = await evaluate({
            essay,
            task,
            demo,
            connection_id: 1,
        });

        if ('error' in response) throw new Error(response.error[0]);

        setResponse(response.data);
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
                            placeholder='Paste your TOEFL integrated writing task here'
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
                            placeholder='Paste or write your essay here'
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
                response &&
                response.operations.map((d, i) => <Sentence key={i} data={d} index={i} />)
            )}
        </div>
    );
};

export default WritingEvaluationForm;
