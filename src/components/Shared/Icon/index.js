import React from 'react';
import { IconContext } from 'react-icons';
import classNames from 'classnames/bind';
import Text from '../Text';
import './icon.css';

export default function Icon({ color, size, children, onClick, border }){
    const cssStyles = classNames({
        'icon': true,
        'icon_clickable': onClick,
        'icon_border': border
    });

    return(
        <IconContext.Provider value={{ color: color, size: size }}>
            <div className={cssStyles} onClick={onClick}>
                { children }
            </div>
        </IconContext.Provider>
    );
}

Icon.defaultProps = {
    color: '#2c3e50',
    size: 14,
    children: null,
    onClick: null
}

Icon.Text = function({ size, children }){
    const inlineStyle = {
        fontSize: size + 'px'
    };

    return(
        <span className='icon__text' style={inlineStyle}>{children}</span>
    );
}