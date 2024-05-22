import SEO from '../../components/seo';
import Wrapper from '../../layout/wrapper';
import { useEvaluationTitleQuery } from '../../redux/features/api-slice';
import Authorize from '../../components/authorize';
import Link from 'next/link';
import { Role } from '../../redux/features/api.types';

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

const NavInner = ({ title, connections }: { title: string; connections: number[] }) => {
    return (
        <Wrapper>
            <SEO pageTitle={title} />
            <div id='main-wrapper' className='main-wrapper'>
                <h4 className='wai-nav-title'>{title}</h4>
                <section className='wai-nav-wrapper'>
                    {connections.map(i => (
                        <Button key={i} connection_id={i} />
                    ))}
                </section>
            </div>
        </Wrapper>
    );
};

const NavInnerRoles = ({ roles }: { roles: Role[] }) => {
    if (roles.includes('administrator')) {
        return (
            <NavInner
                title='Admin Navigation'
                connections={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
        );
    }

    if (roles.includes('tester')) {
        return (
            <NavInner
                title='Tester Navigation'
                connections={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            />
        );
    }

    return <NavInner title='Beta Tester Navigation' connections={[1]} />;
};

const Nav = () => {
    return (
        <Authorize
            roles={['administrator', 'tester', 'beta-user']}
            redirectNotAuthorized='/nav/underdev'
            Component={NavInnerRoles}
        />
    );
};

export default Nav;
