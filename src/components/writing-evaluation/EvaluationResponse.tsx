import { useState } from 'react';
import { Evaluation } from '../../redux/features/api.types';
import Sentence, { SentenceViewType } from './Sentence';

type EvaluationResponseProps = {
    evaluation: Evaluation.EvaluateResponse;
};

export default function EvaluationResponse({ evaluation }: EvaluationResponseProps) {
    const [viewType, setViewType] = useState<SentenceViewType>('inline');

    return (
        <>
            <div>
                <button onClick={() => setViewType('student')}>Student Essay</button>
                <button onClick={() => setViewType('inline')}>Inline Corrections</button>
                <button onClick={() => setViewType('corrected')}>Corrected Essay</button>
            </div>
            <p>
                {evaluation.operations.map((d, i) => (
                    <Sentence key={i} data={d} index={i} viewType={viewType} />
                ))}
            </p>
        </>
    );
}
