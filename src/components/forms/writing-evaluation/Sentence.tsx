import { Evaluation } from '../../../redux/features/api.types';
import SentenceFragment from './SentenceFragment';

export type SentenceData = Evaluation.SentenceData;

type SentenceProps = {
    index: number;
    data: SentenceData;
};

export default function Sentence({ index, data }: SentenceProps) {
    return (
        <span className={`s${index}`}>
            {data.map((d, i) => (
                <SentenceFragment key={i} {...d} />
            ))}
        </span>
    );
}
