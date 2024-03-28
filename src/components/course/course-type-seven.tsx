import React from 'react';
import Link from 'next/link';

// TODO: change any
type CourseTypeSevenProps = {
    data: any;
    classes?: string;
};

const CourseTypeSeven = ({ data, classes }: CourseTypeSevenProps) => {
    return (
        <div className={`edu-course course-style-5 ${classes ? classes : ''}`}>
            <div className='inner'>
                <div className='thumbnail'>
                    <Link href={`/course-details/${data.id}`}>
                        <picture>
                            <img
                                src={`/assets/images/course/course-04/${data.img}`}
                                alt='Course Meta'
                            />
                        </picture>
                    </Link>
                    <div className='course-price'>${data.course_price}</div>
                    <div className='read-more-btn'>
                        <Link
                            href={`/course-details/${data.id}`}
                            className='btn-icon-round'
                        >
                            <i className='icon-4'></i>
                        </Link>
                    </div>
                </div>
                <div className='instructor'>
                    <picture>
                        <img
                            src={`/assets/images/course/instructor/${data.instructor_img}`}
                            alt='images'
                        />
                    </picture>
                    <h6 className='instructor-name'>{data.instructor}</h6>
                </div>
                <div className='content'>
                    <h6 className='title'>
                        <Link href={`/course-details/${data.id}`}>{data.title}</Link>
                    </h6>
                    <p className='text'>{data.short_desc}</p>
                </div>
            </div>
        </div>
    );
};
export default CourseTypeSeven;