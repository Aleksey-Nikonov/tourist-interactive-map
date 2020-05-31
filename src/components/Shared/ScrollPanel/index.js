import React from 'react';

import classNames from 'classnames/bind';

import './scrollPanel.css';

const ScrollPanel = ({ vertical, horizontal, width, height, children }) => {
    const cssStyles = classNames({
        'scroll-panel': true,
        'scroll-panel_vertical': vertical,
        'scroll-panel_horizontal': horizontal
    });

    const inlineStyles = {
        width: `${width}px`,
        height: `${height}px`
    };

    return (
        <div className={cssStyles} style={inlineStyles}>
            { children }
        </div>
    );
}
 
export default ScrollPanel;