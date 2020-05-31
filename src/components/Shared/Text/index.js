import React from 'react';

import classNames from 'classnames/bind';

import './text.css';

const Text = ({ textStyle, defaultCursor, children }) => {
    return (
        children && <span className={classNames('text', {'text_default-cursor' : defaultCursor}, textStyle)}>{children}</span>
    );
}

Text.defaultProps = {
    textStyle: [],
    children: '',
    defaultCursor: false
}

export default Text;