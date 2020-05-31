import React from 'react';
import Text from '../Text';

import classNames from 'classnames/bind';

import './spinner.css';

const Spinner = ({ children }) => {
    return (
        <div className='spinner-container'>
            <div className="spinner-container__loader"></div>
            <Text textStyle={['spinner-container__text']} defaultCursor>{children}</Text>            
        </div>
    );
}

Spinner.defaultProps = {
    children: 'Loading...'
}

export default Spinner;