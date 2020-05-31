import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import Text from '../Text';

import './tabsPanel.css';

const initialValue = { activeTab: null, setActiveTab: null };
const TabsContext = React.createContext(initialValue);

export default function TabsPanel({ children, defaultTab, onTabChange }) {
    const [ activeTab, setActiveTab ] = useState(defaultTab);
    const handleTabClick = (tabId) => {
        // to prevent state refresh during the same tab clicks
        if (activeTab === tabId){
            return;
        }

        setActiveTab(tabId);
    };
    const context = { activeTab, handleTabClick };

    useEffect(() => {
        if (onTabChange) {
            onTabChange();
        }        
    }, [activeTab])

    return (
        <TabsContext.Provider value={context}>
            <div className='tabs-panel'>
                { children }
            </div>
        </TabsContext.Provider>
    );
};

TabsPanel.Header = function({ children }) {
    return(
        <div className='tabs-panel-header'>
            { children }
        </div>
    );
};

TabsPanel.Header.Item = function ({ tabId, children }) {
    return(
        <TabsContext.Consumer>
            {
                ({ activeTab, handleTabClick }) =>                
                    <div className={classNames('tabs-panel-header__option', { 'tabs-panel-header__option_clicked': tabId === activeTab })} onClick={() => handleTabClick(tabId)}>
                        <Text textStyle={['tabs-panel-header__option-text']}>{children}</Text>
                    </div>
                
            }
        </TabsContext.Consumer>        
    );
};

TabsPanel.Content = function ({ children }) {
    return(
        <div className='tabs-panel-content'>
            { children }
        </div>        
    );
};

TabsPanel.Content.Item = function ({ tabId, children }) {
    return(
        <TabsContext.Consumer>
            {
                ({ activeTab }) => activeTab === tabId && children
            }
        </TabsContext.Consumer>
    );
};

TabsPanel.Bottom = function ({ children }) {
    return(
        children &&
        <div className='tabs-panel-bottom'>
            { children }
        </div>
    );
};

TabsPanel.Bottom.Item = function ({ tabId, children }) {
    return(
        <TabsContext.Consumer>
            {
                ({ activeTab }) => activeTab === tabId && children
            }
        </TabsContext.Consumer>
    );
};