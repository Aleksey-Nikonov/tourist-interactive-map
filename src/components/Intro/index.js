import React from 'react';
import { useHistory  } from 'react-router-dom';

import Button from '../Shared/Button';
import Text from '../Shared/Text';
import Link from '../Shared/Link';
import MotionDiv from '../Shared/MotionDiv';
import EnterTypes from '../../enums/enterTypes';

import './intro.css';

export default function Intro() {
    const history = useHistory();
    const goToPollPage = () => {
        history.push('/poll');
    };
    const goToLoginPage = () => {
        history.push('/enter', { enterType: EnterTypes.Login } );
    }
    const goToRegistrationPage = () => {
        history.push('/enter', { enterType: EnterTypes.Registration });
    }

    return (
        <MotionDiv divStyle={['intro-container']}>
            <div className='intro-content'>
                <div className='intro-content__title-wrapper'>
                    <Text textStyle={['intro-content__title']} defaultCursor>Bicycle tourist map of Kazan</Text>
                </div>
                <div className='intro-content__description-wrapper'>
                    <Text textStyle={['intro-content__description']} defaultCursor>Interactive map for comfort bike travelling</Text>
                </div>
                <div className='intro-content__buttons-container'>
                    <Button
                        buttonStyle={['button_green', 'button_medium']}
                        onClick={goToPollPage}>
                        Try demo
                    </Button>
                    <Button
                        buttonStyle={['button_blue', 'button_medium']}
                        onClick={goToLoginPage}>
                        Login
                    </Button>
                </div>
                <div className='intro-content__link_wrapper'>
                    <Link linkStyle={['intro-content__link']} onClick={goToRegistrationPage}>Registration</Link>
                </div>
            </div>
        </MotionDiv>
    );
}