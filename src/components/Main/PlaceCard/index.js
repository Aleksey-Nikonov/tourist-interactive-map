import React from 'react';
import { FaRoute, FaMapMarkerAlt } from "react-icons/fa";

import Text from '../../Shared/Text';
import Button from '../../Shared/Button';
import Icon from '../../Shared/Icon';

import './placeCard.css';

const PlaceCard = ({ title, image, address, type, description, onTopRightBtnClick, onBottomLeftBtnClick, onBottomRightBtnClick }) => {
    return (
        <div className='place-card'>
            <div className='place-card-header'>
                <img src={image} alt={title} className='place-card-header__image' />
                <div className='place-card-header__icon'>
                    <Icon size='23' color='#c0392b' onClick={onTopRightBtnClick} border>
                        <FaMapMarkerAlt />
                    </Icon>
                </div>
            </div>
            <div className='place-card-content'>
                <Text textStyle={['place-card-content__title']}>{title}</Text>
                <Text textStyle={['place-card-content__address']}>{address}</Text>
                <Text textStyle={['place-card-content__type']}>{type}</Text>
                <Text textStyle={['place-card-content__description']}>{description}</Text>
            </div>
            <div className='place-card-bottom'>
                <Button
                    buttonStyle={['button_green', 'button_small']}
                    onClick={onBottomLeftBtnClick}>
                    See details
                </Button>
                <Icon size='24' color='#7f8c8d' onClick={onBottomRightBtnClick} border>
                    <Icon.Text size={16}>
                        Get here
                    </Icon.Text>
                    <FaRoute />
                </Icon>
            </div>
        </div>
    );
}
 
export default PlaceCard;