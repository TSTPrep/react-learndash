import { useRouter } from 'next/router';
import React from 'react';
import SEO from '../../components/seo';
import { Wrapper } from '../../layout';
import CourseDetailsMain from '../../components/course-details';
import { getAllCourses, getCourseData } from '../../utils/api';

const DynamicCourseDetails = ({ course }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <Wrapper>
            <SEO pageTitle={'Course Details'} />
            <CourseDetailsMain course={course} />
        </Wrapper>
    );
};

export default DynamicCourseDetails;

export async function getStaticPaths() {
    return { paths: [], fallback: 'blocking' };

    const courses = await getAllCourses();

    const paths = courses?.nodes?.map(node => {
        return `/course-details/${node.id}`;
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

export async function getStaticProps(context) {
    const course = await getCourseData(context.params.id);

    return {
        props: {
            course,
        },
        revalidate: false,
    };
}
