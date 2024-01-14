import {useRouter} from 'next/router';
import React from 'react';
import SEO from '../components/seo';
import { Wrapper } from '../layout';
import CourseStyleOneMain from '../components/course-style-1';
import {getAllCourses} from "../utils/api";

const CourseStyleOne = ({courses}) => {
    const router = useRouter();
    const {id} = router.query;

    return (
        <Wrapper>
            <SEO pageTitle={'1Course Style 1'} />
            <CourseStyleOneMain courses={courses.nodes}/>
        </Wrapper>
    )
}

export default CourseStyleOne;


// This gets called on every request
export async function getStaticProps() {
  // Fetch data from external API
  const courses = await getAllCourses()

  // Pass data to the page via props
  return { props: { courses } }
}
