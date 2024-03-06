import React, {useState} from 'react';

const WritingEvaluationForm = () => {
    const [essay, setEssay] = useState('');
    const [task, setTask] = useState('');

    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);


        const response = await fetch('https://TSTPrep-tstprep-writing.hf.space/get_passage_html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer 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'
            },
            body: JSON.stringify({
                essay,
                task,
                demo: true
            })
        });
        if (!response.ok) throw new Error(response.statusText);


        const item = await response.json();

        console.log(item);

        setResponse(item.passage_html + item.indicator_html);
        setLoading(false);

        // } catch (error) {
        //     console.error(error);
        //     setError(error.message);
        // } finally {
        //     setLoading(false);
        // }

    }

    const toggleSubmenu = (e) => {
        e.preventDefault();
        let el = e.target;

        while (el && el !== e.currentTarget && el.tagName !== "A") {
            el = el.parentNode;
        }
        if (el && el.tagName === "A") {

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
                        targets = document.querySelectorAll(`.content-box.hovertextp span`);


                    triggers.forEach((trigger) => {

                        trigger.addEventListener('click', (e) => {
                            e.preventDefault();

                            targets.forEach((target) => {
                                target.classList.remove('opaque');
                            });

                            let target = document.querySelector(`.content-box.hovertextp span.${trigger.dataset.sentence}`);
                            target.classList.add('opaque');

                            console.log(target)
                        })

                    });
                }
            }
        }
    }

    return (

        <>
            {loading && <p>Loading...</p>}

            {response && <div
                dangerouslySetInnerHTML={{__html: response}}
                onClick={(e) => toggleSubmenu(e)}
            />}

            {error && <p>{error}</p>}


            {!error && !response &&
                <form onSubmit={handleSubmit}>


                    <div className="form-group waf-textarea">
                        <label htmlFor="essay">Essay</label>
                        <textarea
                            name="essay"
                            // value={essay}
                            // value="Recently there has been a debate as to the PEDs. More specifically, in regard to the passages, the author puts forth the idea that this drug should be prohibited."
                            placeholder="Essay"
                            onBlur={(e) => setEssay(e.target.value)}
                            data-gramm="false"
                            data-gramm_editor="false"
                            data-enable-grammarly="false"
                            spellCheck="false"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                        />
                    </div>

                    <div className="form-group waf-textarea">
                        <label htmlFor="task">Task</label>
                        <textarea
                            name="task"
                            // value={task}
                            // value="Everyone wants to get in better shape, but it usually takes a tremendous amount of time and effort. "
                            placeholder="Task"
                            onBlur={(e) => setTask(e.target.value)}
                            data-gramm="false"
                            data-gramm_editor="false"
                            data-enable-grammarly="false"
                            spellCheck="false"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="off"
                        />
                    </div>

                    <div className="form-group">
                        <button type="submit" className="edu-btn btn-medium">Start <i className="icon-4"></i></button>
                    </div>
                </form>}
        </>
    );
}

export default WritingEvaluationForm;
