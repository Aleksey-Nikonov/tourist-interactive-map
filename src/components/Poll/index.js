import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../Shared/Button';
import Text from '../Shared/Text';
import Spinner from '../Shared/Spinner';
import MotionDiv from '../Shared/MotionDiv';
import poll from '../../resources/poll.json';
import * as pollService from '../../services/poll-analyzer';

import './poll.css';

export default function Poll() {
    const [questionIndex, setQuestionIndex] = useState(0);
    const { question, answers } = poll[questionIndex];

    const [answerIndex, setAnswerIndex] = useState(0);
    const handleAnswerChange = ({ target: { value }}) => {
        setAnswerIndex(parseInt(value));
    };
    useEffect(() => {
        // reset answer index when question changes
        setAnswerIndex(0);
    }, [question]);

    const [isLoading, setIsLoading] = useState(false);

    const [results, addResult] = useState([]);
    const history = useHistory();
    const handleResult = () => {
        // extraction and storage the result for the question
        const newResults = [...results, {
            questionIndex,
            answerIndex
        }];

        addResult(newResults);
        
        // if the last question
        if (questionIndex == answers.length){
            setIsLoading(true);

            pollService
                .getPreferableRoute(newResults)
                .then((preferredRoute) =>
                {
                    history.push('/main', { route: preferredRoute });
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error(false);
                    setIsLoading(false);
                });
        }
        else
        {
            // switching to the next question
            setQuestionIndex(questionIndex + 1);
        }
    };

    const formatQuestionsCount = () => {
        const numberOfQuestion = questionIndex + 1;
        const quantityOfQuestions = poll.length; 
        return `${numberOfQuestion}/${quantityOfQuestions}`;
    }

    return(
        <MotionDiv divStyle={['poll-container']}>
            <div className='poll-content'>
                <div className='poll-content__question-wrapper'>
                    <Text textStyle={['poll-content__question']}>{question}</Text>
                    <Text textStyle={['poll-content__question-counter']} defaultCursor>{formatQuestionsCount()}</Text>
                </div>
                <div className='poll-content__answers-wrapper'>
                    {
                        answers.map((answer, index) => {
                            return(
                                <div className='poll-content__answer' key={index}>
                                    <label className='poll-content__answer-label'>
                                        <input
                                            type='radio'
                                            name={question}
                                            value={index}
                                            checked={index == answerIndex}                                            
                                            onChange={e => handleAnswerChange(e)}
                                            className='poll-content__answer-radio'
                                        />
                                        {answer}
                                    </label>
                                </div>
                            );
                        })
                    }
                </div>
                <div className='poll-content__button-wrapper'>
                    {
                        isLoading ?
                        <Spinner />
                        :
                        <Button
                            buttonStyle={['button_green', 'button_medium']}
                            onClick={handleResult}>
                            Next
                        </Button>
                    }
                </div>
            </div>
        </MotionDiv>
    );
};