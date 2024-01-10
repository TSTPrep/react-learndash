import {useRouter} from 'next/router';
import React from 'react';
import SEO from '../../components/seo';
import {Wrapper} from '../../layout';
import CourseDetailsMain from '../../components/course-details';
import {getCourseData, getCourses} from "../../data-tstprep/course-data";

const DynamicCourseDetails = ({course, gigi}) => {
    const router = useRouter();
    const {id} = router.query;
    console.log({id, course, gigi});
    return (
        <Wrapper>
            <SEO pageTitle={'Course Details'}/>
            <CourseDetailsMain course={course}/>
        </Wrapper>
    )
}

export default DynamicCourseDetails;

export async function getStaticPaths() {
    const courses = await getCourses();

    const paths = courses.map((course) => {
        return {
            params: {
                id: course.id.toString()
            }
        }
    })
    return {
        paths,
        fallback: 'blocking',
    }
}

export async function getStaticProps(context) {
    const courseId = context.params.id
    const course = await getCourseData(courseId)
    return {
        props: {
            course,
            gigi: 'becali'
        },
            revalidate: 1
    }
}
