import {useRouter} from 'next/router';
import React from 'react';
import SEO from '../../components/seo';
import {Wrapper} from '../../layout';
import CourseDetailsMain from '../../components/course-details';
import {getAllCourses, getCourseData} from "../../utils/api";


const DynamicCourseDetails = ({course}) => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <Wrapper>
            <SEO pageTitle={'Course Details'}/>
            <CourseDetailsMain course={course}/>
        </Wrapper>
    )
}

export default DynamicCourseDetails;

export async function getStaticPaths() {
    const courses = await getAllCourses();

    const paths = courses?.edges?.map(({node}) => `/course-details/${node.courseId}`)

    return {
        paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps(context) {
    const courseId = context.params.id
    let course = await getCourseData(courseId)
    course = course.nodes[0]
    return {
        props: {
            course,
        },
        revalidate: 1
    }
}
