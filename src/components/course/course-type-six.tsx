import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { cart_course } from '../../redux/features/cart-slice';
import { AppState } from '../../redux/store';

// TODO: change any
type CourseTypeSixProps = {
    data: any;
    classes?: string;
};

const CourseTypeSix = ({ data, classes }: CourseTypeSixProps) => {
    const { cartCourses } = useSelector((state: AppState) => state.cart);
    const dispatch = useDispatch();

    // handle add to cart
    const handleAddToCart = course => {
        dispatch(
            cart_course({
                id: course.id,
                img: `/assets/images/course/course-06/${course.img}`,
                price: course.course_price,
                title: course.title,
            })
        );
    };
    return (
        <div className={`edu-course course-style-3 ${classes ? classes : ''}`}>
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
                    <div className='time-top'>
                        <span className='duration'>
                            <i className='icon-61'></i>
                            {data.course_outline}
                        </span>
                    </div>
                </div>

                <div className='content'>
                    <span className='course-level'>{data.level}</span>
                    <h5 className='title'>
                        <Link href={`/course-details/${data.id}`}>{data.title}</Link>
                    </h5>
                    <p>{data.short_desc}</p>
                    <div className='course-rating'>
                        <div className='rating'>
                            <i className='icon-23'></i>
                            <i className='icon-23'></i>
                            <i className='icon-23'></i>
                            <i className='icon-23'></i>
                            <i className='icon-23'></i>
                        </div>
                        <span className='rating-count'>
                            ({data.rating} /{data.rating_count} Rating)
                        </span>
                    </div>
                    <div className='read-more-btn'>
                        <a
                            className='edu-btn btn-small btn-secondary'
                            onClick={() => handleAddToCart(data)}
                            style={{ cursor: 'pointer' }}
                        >
                            {cartCourses.some(item => item.id === data.id)
                                ? 'Added to cart'
                                : 'Add to cart'}
                            <i className='icon-4'></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CourseTypeSix;