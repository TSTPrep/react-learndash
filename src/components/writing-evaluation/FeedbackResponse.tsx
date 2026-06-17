import { useState } from 'react';

type FeedbackResponseProps = {
    feedback: Record<string, string>;
};

export default function FeedbackResponse({ feedback }: FeedbackResponseProps) {
    const tabs = Object.keys(feedback);
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className='feedback'>
            <div className='tab-wrapper'>
                <div className='tabs'>
                    {tabs.map(title => (
                        <button
                            key={title}
                            className='tab-link'
                            onClick={() => setActiveTab(title)}
                        >
                            {title}
                        </button>
                    ))}
                </div>
                <div className='tab-content'>
                    {Object.entries(feedback).map(([title, content]) => (
                        <div
                            key={title}
                            className={'tab' + (title === activeTab ? ' active' : '')}
                        >
                            <h5>{title}</h5>
                            <p>{content}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
