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
            <div class="custom-toggle-view">
                <button class="edu-btn sml-btn" onClick={() => setViewType('student')}>Student Essay</button>
                <button class="edu-btn sml-btn" onClick={() => setViewType('inline')}>Inline Corrections</button>
                <button class="edu-btn sml-btn" onClick={() => setViewType('corrected')}>Corrected Essay</button>
            </div>
            <p className={`view-${viewType}`}>
                {evaluation.operations.map((d, i) => (
                    <Sentence key={i} data={d} index={i} viewType={viewType} />
                ))}
            </p>
        </>
    );
}
