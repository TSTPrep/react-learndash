import { useState } from 'react';
import { Evaluation } from '../../redux/features/api.types';
import Sentence, { SentenceViewType } from './SentenceP';
import { usePopper } from 'react-popper';

export type PopperState = Evaluation.SingleFragmentData | Evaluation.DoubleFragmentData;

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

    const [popperState, setPopperState] = useState<PopperState>();

    const showTooltip = (element: HTMLElement, state: PopperState) => {
        setReferenceElement(element);
        setPopperState(state);
        popperElement.setAttribute('data-show', true);
    };

    const hideTooltip = () => {
        setReferenceElement(null);
        popperElement.removeAttribute('data-show');
    };

    return (
        <>
            <div className='custom-toggle-view'>
                <button
                    className={
                        'edu-btn sml-btn' + (viewType !== 'student' ? '' : ' inactive')
                    }
                    onClick={() => setViewType('student')}
                >
                    Student Essay
                </button>
                <button
                    className={
                        'edu-btn sml-btn' + (viewType !== 'inline' ? '' : ' inactive')
                    }
                    onClick={() => setViewType('inline')}
                >
                    Inline Corrections
                </button>
                <button
                    className={
                        'edu-btn sml-btn' + (viewType !== 'corrected' ? '' : ' inactive')
                    }
                    onClick={() => setViewType('corrected')}
                >
                    Corrected Essay
                </button>
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
                className={
                    'popper-tooltip' + (popperState ? ' popper-' + popperState.op : '')
                }
                ref={setPopperElement}
                style={styles.popper}
                {...attributes.popper}
            >
                <p className='popper-indicator'>{popperState?.indicator}</p>
                <div className='popper-body'>
                    <span className='popper-indication'>
                        {getIndication(popperState?.op)}
                    </span>
                    <span className='popper-word'>{popperState?.word}</span>
                    {popperState?.replace && (
                        <>
                            {' --> '}
                            <span className='popper-replace'>{popperState?.replace}</span>
                        </>
                    )}
                </div>
                <p className='popper-feedback'>{popperState?.feedback}</p>
            </div>
        </>
    );
}

function getIndication(op?: PopperState['op']) {
    if (op === 'addition') {
        return 'Add: ';
    }

    if (op === 'deletion') {
        return 'Delete: ';
    }

    if (op === 'replacement') {
        return 'Replace: ';
    }

    return null;
}
