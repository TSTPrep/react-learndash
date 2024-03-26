import CounterBox from './counter-box';
import { motion } from 'framer-motion';
import { useMouseMoveUI } from '../../../contexts/mouse-move-context';

const CounterUpArea = () => {
    const { mouseDirection, mouseReverse } = useMouseMoveUI();
    return (
        <div className='counterup-area-2'>
            <div className='container'>
                <div className='row g-5 justify-content-center'>
                    <div className='col-lg-8'>
                        <div className='counterup-box-wrap'>
                            <CounterBox />
                            <ul className='shape-group'>
                                <motion.li
                                    className='shape-1 scene'
                                    animate={{
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y,
                                    }}
                                >
                                    <picture>
                                        <img
                                            src='/assets/images/about/shape-13.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </motion.li>
                                <motion.li className='shape-2'>
                                    <picture>
                                        <img
                                            className='rotateit'
                                            src='/assets/images/counterup/shape-02.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </motion.li>
                                <motion.li
                                    className='shape-3 scene'
                                    animate={{
                                        x: mouseReverse(30).x,
                                        y: mouseReverse(30).y,
                                    }}
                                >
                                    <picture>
                                        <img
                                            src='/assets/images/counterup/shape-04.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </motion.li>
                                <motion.li
                                    className='shape-4 scene'
                                    animate={{
                                        x: mouseDirection(30).x,
                                        y: mouseDirection(30).y,
                                    }}
                                >
                                    <picture>
                                        <img
                                            src='/assets/images/counterup/shape-05.png'
                                            alt='Shape'
                                        />
                                    </picture>
                                </motion.li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterUpArea;
