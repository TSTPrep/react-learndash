import { useState } from 'react';
import { Evaluation } from '../../redux/features/api.types';
import Sentence, { SentenceViewType } from './SentenceP';
import { usePopper } from 'react-popper';

type EvaluationResponseProps = {
    evaluation: Evaluation.EvaluateResponse;
};

export default function EvaluationResponse({ evaluation }: EvaluationResponseProps) {
    const [viewType, setViewType] = useState<SentenceViewType>('inline');
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'top',
    });

    const showTooltip = (element: HTMLElement, text: string) => {
        setReferenceElement(element);
        popperElement.textContent = text;
        popperElement.setAttribute('data-show', true);
    };

    const hideTooltip = () => {
        setReferenceElement(null);
        popperElement.removeAttribute('data-show');
    };

    return (
        <>
            <div>
                <button onClick={() => setViewType('student')}>Student Essay</button>
                <button onClick={() => setViewType('inline')}>Inline Corrections</button>
                <button onClick={() => setViewType('corrected')}>Corrected Essay</button>
            </div>
            <p className={`view-${viewType}`}>
                {evaluation.operations.map((d, i) => (
                    <Sentence
                        key={i}
                        data={d}
                        index={i}
                        viewType={viewType}
                        mouseEnter={showTooltip}
                        mouseLeave={hideTooltip}
                    />
                ))}
            </p>
            <div
                className='popper-tooltip'
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
            >
                Popper element
            </div>
        </>
    );
}
