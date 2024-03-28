import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const HeroArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className='hero-banner hero-style-6'>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-lg-6'>
                        <div className='banner-content'>
                            <h1
                                className='title'
                                data-sal-delay='100'
                                data-sal='slide-up'
                                data-sal-duration='1000'
                            >
                                Yoga A Way of Feeling Relaxed & Calm!
                            </h1>
                            <p
                                data-sal-delay='200'
                                data-sal='slide-up'
                                data-sal-duration='1000'
                            >
                                Excepteur sint occaecat cupidatat non proident sunt in
                                culpa qui officia deserunt mollit.
                            </p>
                            <div
                                className='banner-btn'
                                data-sal-delay='400'
                                data-sal='slide-up'
                                data-sal-duration='1000'
                            >
                                <Link href='/course-style-1' className='edu-btn'>
                                    Find courses<i className='icon-4'></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <div className='banner-thumbnail'>
                            <div
                                className='thumbnail'
                                data-sal-delay='500'
                                data-sal='slide-up'
                                data-sal-duration='1000'
                            >
                                <picture>
                                    <img
                                        src='/assets/images/banner/girl-3.webp'
                                        alt='Yoga Image'
                                    />
                                </picture>
                            </div>
                            <ul className='shape-group'>
                                <li
                                    className='shape-1'
                                    data-sal-delay='1000'
                                    data-sal='fade'
                                    data-sal-duration='1000'
                                >
                                    <picture>
                                        <img
                                            src='/assets/images/about/shape-27.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </li>
                                <li
                                    className='shape-2'
                                    data-sal-delay='1000'
                                    data-sal='fade'
                                    data-sal-duration='1000'
                                >
                                    <picture>
                                        <img
                                            className='rotateit'
                                            src='/assets/images/about/shape-28.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </li>
                                <li
                                    className='shape-3'
                                    data-sal-delay='1000'
                                    data-sal='fade'
                                    data-sal-duration='1000'
                                >
                                    <picture>
                                        <img
                                            className='rotateit'
                                            src='/assets/images/about/shape-10.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </li>
                                <li
                                    className='shape-4'
                                    data-sal-delay='1000'
                                    data-sal='fade'
                                    data-sal-duration='1000'
                                >
                                    <picture>
                                        <img
                                            src='/assets/images/about/shape-29.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <ul className='shape-group'>
                <motion.li
                    className='shape-1 scene'
                    data-sal-delay='1000'
                    data-sal='fade'
                    data-sal-duration='1000'
                    animate={{
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y,
                    }}
                >
                    <picture>
                        <img src='/assets/images/others/shape-12.png' alt='Shape' />
                    </picture>
                </motion.li>
                <motion.li
                    className='shape-2 scene'
                    data-sal-delay='1000'
                    data-sal='fade'
                    data-sal-duration='1000'
                    animate={{
                        x: mouseDirection(30).x,
                        y: mouseDirection(30).y,
                    }}
                >
                    <picture>
                        <img src='/assets/images/others/shape-13.png' alt='Shape' />
                    </picture>
                </motion.li>
                <motion.li
                    className='shape-3 scene'
                    data-sal-delay='1000'
                    data-sal='fade'
                    data-sal-duration='1000'
                    animate={{
                        x: mouseReverse(30).x,
                        y: mouseReverse(30).y,
                    }}
                >
                    <picture>
                        <img src='/assets/images/others/shape-14.png' alt='Shape' />
                    </picture>
                </motion.li>
            </ul>
        </div>
    );
};

export default HeroArea;