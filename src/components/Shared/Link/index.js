import React from 'react';

import Text from '../Text';

import './link.css';

export default function Link({ onClick, linkStyle, children }) {
    return (
        <div onClick={onClick}>
            <Text textStyle={['link', ...linkStyle]}>{children}</Text>
        </div>
    );
}

Link.defaultProps = {
    children: '',
    onClick: () => {},
    linkStyle: []
};