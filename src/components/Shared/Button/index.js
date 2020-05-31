import React from 'react';

import classNames from 'classnames/bind';

import './button.css';

const Button = ({ onClick, buttonStyle, children }) => {
    return (
        <div className={classNames('button', buttonStyle)} onClick={onClick}>
            <span>{children}</span>
        </div>
    );
};

Button.defaultProps = {
    onClick: () => {},
    buttonStyle: [],
    textStyle: [],
    children: ''
};

export default Button;