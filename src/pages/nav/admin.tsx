import SEO from '../../components/seo';
import Wrapper from '../../layout/wrapper';
import { useEvaluationTitleQuery } from '../../redux/features/api-slice';
import Authorize from '../../components/authorize';
import Link from 'next/link';

const Button = ({ connection_id }: { connection_id: number }) => {
    const { data: titleData } = useEvaluationTitleQuery({ connection_id });

    return (
        <Link
            href={'/dev/wai-' + connection_id}
            className={'edu-btn wai-nav-btn' + (titleData ? '' : ' disabled')}
        >
            {titleData?.title ?? 'Loading...'}
        </Link>
    );
};

const Admin = () => {
    return (
        <Authorize roles={['administrator']} redirectNotAuthorized='/nav/underdev'>
            <Wrapper>
                <SEO pageTitle={'Course Details'} />
                <div id='main-wrapper' className='main-wrapper'>
                    <h4 className='wai-nav-title'>Admin Navigation</h4>
                    <section className='wai-nav-wrapper'>
                        {[...new Array(10)].map((_, i) => (
                            <Button key={i} connection_id={i + 1} />
                        ))}
                    </section>
                </div>
            </Wrapper>
        </Authorize>
    );
};

export default Admin;
