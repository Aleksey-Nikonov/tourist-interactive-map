import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames/bind';

import './motionDiv.css';

const MotionDiv = ({ divStyle, children }) =>(
    <motion.div className={classNames('motion-div', divStyle)}
        initial={pageVariants.initial}
        animate={pageVariants.in}
        exit={pageVariants.out}
        transition={transition.delay}>
        { children }
    </motion.div>
);

const pageVariants = {
    initial: {
        opacity: 0
    },
    in: {
        opacity: 1
    },
    out: {
        opacity: 0
    }
};

const transition = {
    delay: 1
};
  

export default MotionDiv;