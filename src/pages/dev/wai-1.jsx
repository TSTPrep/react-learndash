import React from 'react';
import {Wrapper} from "../../layout";
import WritingEvaluationForm from "../../components/forms/writing-evaluation-form";


const WaiOne = () => {
    return (
        <Wrapper>

            <div className="container">
                <div className="row row--30">

                    <WritingEvaluationForm/>

                </div>
            </div>

        </Wrapper>
    );
};

export default WaiOne;
