import React from 'react';

import classNames from 'classnames/bind';

import './input.css';

export default function Input({ inputStyle, placeholder, onChange, name, type }) {
    return (
        <input className={classNames('input', inputStyle)} type={type} placeholder={placeholder} onChange={onChange} name={name} />
    );
}

Input.defaultProps = {
    type: 'text'
};