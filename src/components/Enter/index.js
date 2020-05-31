import React, { useState, useEffect, Fragment } from 'react';
import { useLocation } from 'react-router-dom';

import Input from '../Shared/Input';
import Button from '../Shared/Button';
import TabsPanel from '../Shared/TabsPanel';
import MotionDiv from '../Shared/MotionDiv';
import EnterTypes from '../../enums/enterTypes';

import './enter.css';

export default function Enter() {
    const { state: { enterType } } = useLocation();

    const [formState, setFormState] = useState(null);
    const onChangeHandler = ({ target: { name, value } }) => {
        setFormState({...formState, [name]: value });
    };

    const onTabChangeHandler = () => {
        setFormState(null);
    }

    return (
        <MotionDiv divStyle={['enter-container']}>
            <TabsPanel defaultTab={enterType} onTabChange={onTabChangeHandler}>
                <TabsPanel.Header>
                    <TabsPanel.Header.Item tabId={EnterTypes.Login}>
                        Login
                    </TabsPanel.Header.Item>
                    <TabsPanel.Header.Item tabId={EnterTypes.Registration}>
                        Sign up
                    </TabsPanel.Header.Item>
                </TabsPanel.Header>

                <TabsPanel.Content>
                    <TabsPanel.Content.Item tabId={EnterTypes.Login}>
                        <Input inputStyle={['enter-form-content_input']} placeholder='Login' name='login' onChange={onChangeHandler} />
                        <Input inputStyle={['enter-form-content_input']} placeholder='Password' name='password' onChange={onChangeHandler} type='password' />
                    </TabsPanel.Content.Item>
                    <TabsPanel.Content.Item tabId={EnterTypes.Registration}>
                        <Input inputStyle={['enter-form-content_input']} placeholder='Login' name='login' onChange={onChangeHandler} />
                        <Input inputStyle={['enter-form-content_input']} placeholder='Password' name='password' onChange={onChangeHandler} type='password' />
                        <Input inputStyle={['enter-form-content_input']} placeholder='Confirm password' name='confirmPassword' onChange={onChangeHandler} type='password' />
                        <Input inputStyle={['enter-form-content_input']} placeholder='Email' name='email' onChange={onChangeHandler} type='email' />
                    </TabsPanel.Content.Item>
                </TabsPanel.Content>

                <TabsPanel.Bottom>
                    <TabsPanel.Bottom.Item tabId={EnterTypes.Login}>
                        <Button
                            buttonStyle={['button_green', 'button_small']}
                            onClick={() => {}}>
                            Sign in
                        </Button>
                    </TabsPanel.Bottom.Item>
                    <TabsPanel.Bottom.Item tabId={EnterTypes.Registration}>
                        <Button
                            buttonStyle={['button_green', 'button_small']}
                            onClick={() => {}}>
                            Sign up
                        </Button>
                    </TabsPanel.Bottom.Item>
                </TabsPanel.Bottom>
            </TabsPanel>
        </MotionDiv>
    );
}