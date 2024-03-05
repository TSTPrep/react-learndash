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

        try {

            const response = await fetch('https://Mayanktstprep-tstprep-writing.hf.space/get_passage_html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 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'
                },
                body: JSON.stringify({
                    essay,
                    task
                })
            });

            setResponse(response.data);
            setLoading(false);

            console.log(response.data);

        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }

    }

    return (

        <>
            {loading && <p>Loading...</p>}

            {response && <pre>{JSON.stringify(response, null, 2)}</pre>}

            {error && <p>{error}</p>}


            {!error && !response &&
                <form onSubmit={handleSubmit}>


                    <div className="form-group">
                        <label htmlFor="essay">Essay</label>
                        <textarea
                            name="essay"
                            value={essay}
                            placeholder="Essay"
                            onChange={(e) => setEssay(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="task">Task</label>
                        <textarea
                            name="task"
                            value={task}
                            placeholder="Task"
                            onChange={(e) => setTask(e.target.value)}
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
