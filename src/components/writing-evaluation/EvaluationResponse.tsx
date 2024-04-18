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
            <div className="custom-toggle-view">
                <button className="edu-btn sml-btn" onClick={() => setViewType('student')}>Student Essay</button>
                <button className="edu-btn sml-btn" onClick={() => setViewType('inline')}>Inline Corrections</button>
                <button className="edu-btn sml-btn" onClick={() => setViewType('corrected')}>Corrected Essay</button>
            </div>
            <p className={`view-${viewType}`}>
                {evaluation.operations.map((d, i) => (
                    <Sentence key={i} data={d} index={i} viewType={viewType} />
                ))}
            </p>
        </>
    );
}
