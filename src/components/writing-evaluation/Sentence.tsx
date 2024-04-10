import { Evaluation } from '../../redux/features/api.types';
import SentenceFragment from './SentenceFragment';

export type SentenceData = Evaluation.SentenceData;
export type SentenceViewType = 'student' | 'corrected' | 'inline';

type SentenceProps = {
    index: number;
    data: SentenceData;
    viewType: SentenceViewType;
};

export default function Sentence({ index, data, viewType }: SentenceProps) {
    return (
        <span className={`s${index}`}>
            {data.map((d, i) => (
                <SentenceFragment key={i} viewType={viewType} {...d} />
            ))}
        </span>
    );
}
