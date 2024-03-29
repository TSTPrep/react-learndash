import React, { useState } from 'react';
import '../../utils/jquery';
import Sentence, { SentenceData } from './writing-evaluation/Sentence';
import { useEvaluateMutation } from '../../redux/features/api-slice';
import { Evaluation } from '../../redux/features/api.types';

// TODO: move this in a scss file
const html2 =
    '<style>body{\n    font-family: Arial, sans-serif;\n    font-size: 15px;\n    }\n\n    .content-box{\n    background: white;\n    padding: 100px 100px;\n    }\n\n\n    h2{\n    font-weight: 700;\n    font-size: 18px;\n    }\n\n    .incorrect,\n    .deletion{\n    text-decoration: line-through;\n    border-bottom: 2px solid #c38181;\n    color: #d5bbbb !important;\n    padding: 0 3px;\n    display: inline;\n    }\n\n    .correct{\n    border-bottom: 2px solid #9ec59e;\n    padding: 0 3px;\n    font-weight: 600;\n    display: inline;\n    }\n\n    .addition{\n    color: #ff6700;\n    background: #ffd7b5;\n    border: 1px solid #ff6700;\n    padding: 0 3px;\n    display: inline;\n    }\n\n    .nochange{\n    display: inline;\n    padding: 0 3px;\n    }\n\n</style>';

const WritingEvaluationForm = () => {
    const [essay, setEssay] = useState('');
    const [task, setTask] = useState('');

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<Evaluation.EvaluateResponse | null>(null);
    const [error, setError] = useState(null);

    const [evaluate] = useEvaluateMutation();

    const handleSubmit = async e => {
        e.preventDefault();

        setLoading(true);

        const demo = false;
        const response = await evaluate({
            essay,
            task,
            demo,
            connection_id: 1,
        });

        if ('error' in response) throw new Error(response.error[0]);

        setResponse(response.data);
        setLoading(false);
    };

    const toggleSubmenu = e => {
        e.preventDefault();
        let el = e.target;

        while (el && el !== e.currentTarget && el.tagName !== 'A') {
            el = el.parentNode;
        }
        if (el && el.tagName === 'A') {
            /**
             * Show the UL next to the A tag
             */
            let siblingUl = el.nextSibling;
            if (siblingUl) {
                el.nextSibling.classList.toggle('active');

                /**
                 * Show the sentences for the current A tag
                 */
                if (el.classList.contains('waf-trigger-level1')) {
                    let triggers = siblingUl.querySelectorAll('a.waf-trigger-sentence'),
                        targets = document.querySelectorAll(
                            `.content-box.hovertextp span`
                        );

                    triggers.forEach(trigger => {
                        trigger.addEventListener('click', e => {
                            e.preventDefault();

                            targets.forEach(target => {
                                target.classList.remove('opaque');
                            });

                            let target = document.querySelector(
                                `.content-box.hovertextp span.${trigger.dataset.sentence}`
                            );
                            target.classList.add('opaque');

                            console.log(target);
                        });
                    });
                }
            }
        }
    };

    return (
        <>
            {loading && <p>Loading...</p>}

            {response && (
                <>
                    <div
                        // TODO: remove this div
                        dangerouslySetInnerHTML={{ __html: html2 }}
                        onClick={e => toggleSubmenu(e)}
                    />
                    {response.operations.map((d, i) => (
                        <Sentence key={i} data={d} index={i} />
                    ))}
                </>
            )}

            {error && <p>{error}</p>}

            {!error && !response && (
                <form onSubmit={handleSubmit}>
                    <div className='form-group waf-textarea'>
                        <label htmlFor='essay'>Essay</label>
                        <textarea
                            name='essay'
                            // value={essay}
                            // value="Recently there has been a debate as to the PEDs. More specifically, in regard to the passages, the author puts forth the idea that this drug should be prohibited."
                            placeholder='Essay'
                            onBlur={e => setEssay(e.target.value)}
                            data-gramm='false'
                            data-gramm_editor='false'
                            data-enable-grammarly='false'
                            spellCheck='false'
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                        />
                    </div>

                    <div className='form-group waf-textarea'>
                        <label htmlFor='task'>Task</label>
                        <textarea
                            name='task'
                            // value={task}
                            // value="Everyone wants to get in better shape, but it usually takes a tremendous amount of time and effort. "
                            placeholder='Task'
                            onBlur={e => setTask(e.target.value)}
                            data-gramm='false'
                            data-gramm_editor='false'
                            data-enable-grammarly='false'
                            spellCheck='false'
                            autoComplete='off'
                            autoCorrect='off'
                            autoCapitalize='off'
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='edu-btn btn-medium'>
                            Start <i className='icon-4'></i>
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default WritingEvaluationForm;
