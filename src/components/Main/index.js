import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IoMdExit } from "react-icons/io";

import Text from '../Shared/Text';
import Button from '../Shared/Button';
import TabsPanel from '../Shared/TabsPanel';
import Icon from '../Shared/Icon';
import SidebarTabs from '../../enums/mapEntityClasses';
import ScrollPanel from '../Shared/ScrollPanel';
import PlaceCard from './PlaceCard';
import MotionDiv from '../Shared/MotionDiv';

import * as map from '../../services/map-creator';
import bikes from '../../resources/bikes.json';
import attractions from '../../resources/attractions.json';

import './main.css';

const MapContainerId = 'map-area';

export default function Main() {
    const location = useLocation();
    const { route } = location.state;

    const [ userLocation, setUserLocation ] = useState({ longitude: 49.121990, latitude: 55.783709 });
    useEffect(() => {
        // initialization of map
        map.init(MapContainerId, setUserLocation);

        // addition of bike places to map
        bikes.map(item => map.addMarker(item, markerHoverHandler));

        // addition of attractions to map
        attractions.map(item => map.addMarker(item, markerHoverHandler));

        // draw route between attractions
        map.drawTouristRoute(route.coordinates);
    }, []);

    const topRightBtnClickHandler = (coords) => {
        map.changeLocation(coords);
    };

    const bottomRightClickHandler = (end) => {
        const start = [userLocation.longitude, userLocation.latitude];
        map.drawUserRoute(start, end);
    };

    const [ placeInfo, setPlaceInfo ] = useState({ title: '', type: '' });
    const markerHoverHandler = (title, type) => {
        setPlaceInfo({ title, type });
    };

    return (
        <MotionDiv divStyle={['main-container']}>
            <div className='main-content'>

                <div className='map-content'>
                    <div className='map-route-header'>
                        <div className='map-route-header__title-wrapper'>
                            <Text textStyle={['map-route-header__title']} defaultCursor>{route.name}</Text>
                        </div>
                        <div className='map-route-header__description-wrapper'>
                            <Text textStyle={['map-route-header__description']} defaultCursor>{route.description}</Text>
                        </div>
                    </div>
                    <div className='map-wrapper'>
                        <div id={MapContainerId}>
                            <div className='map-place-info'>
                                <Text textStyle={['map-place-info__text']} defaultCursor>{placeInfo.title}</Text>
                                <Text textStyle={['map-place-info__text']} defaultCursor>{placeInfo.type}</Text>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='sidebar-area'>
                    <div className='menu-wrapper'>
                        <Button
                            buttonStyle={['button_blue', 'button_medium', 'menu-wrapper__button']}
                            onClick={null}>
                            Routes
                        </Button>
                        <Button
                            buttonStyle={['button_blue', 'button_medium', 'menu-wrapper__button']}
                            onClick={null}>
                            Profile
                        </Button>
                        <Icon size='33' color='#7f8c8d' onClick={() => {}} border>
                            <IoMdExit />
                        </Icon>
                    </div>
                    <div className='map-routes-wrapper'>
                        <TabsPanel defaultTab={SidebarTabs.Places}>
                            <TabsPanel.Header>
                                <TabsPanel.Header.Item tabId={SidebarTabs.Places}>
                                    Places
                                </TabsPanel.Header.Item>
                                <TabsPanel.Header.Item tabId={SidebarTabs.Bicycles}>
                                    Bicycles
                                </TabsPanel.Header.Item>
                            </TabsPanel.Header>

                            <TabsPanel.Content>
                                <TabsPanel.Content.Item tabId={SidebarTabs.Places}>
                                    <ScrollPanel vertical height={552}>
                                        {
                                            route.placeIds.map(placeId =>
                                            {
                                                const attraction = attractions.find(item => item.id === placeId);

                                                return(
                                                    <PlaceCard
                                                        key={placeId}
                                                        title={attraction.title}
                                                        image={attraction.image}
                                                        address={attraction.address}
                                                        type={attraction.type}
                                                        description={attraction.description}
                                                        onTopRightBtnClick={() => topRightBtnClickHandler(attraction.coords)}
                                                        onBottomRightBtnClick={() => bottomRightClickHandler(attraction.coords)}
                                                    />
                                                );
                                            })
                                        }
                                    </ScrollPanel>
                                </TabsPanel.Content.Item>
                                <TabsPanel.Content.Item tabId={SidebarTabs.Bicycles}>
                                    <ScrollPanel vertical height={552}>
                                        {
                                            bikes.map((bike, index) =>
                                            (
                                                <PlaceCard
                                                    key={bike.id}
                                                    title={bike.title}
                                                    image={bike.image}
                                                    address={bike.address}
                                                    type={bike.type}
                                                    description={bike.description}
                                                    onTopRightBtnClick={() => topRightBtnClickHandler(bike.coords)}
                                                    onBottomRightBtnClick={() => bottomRightClickHandler(bike.coords)}
                                                />
                                            ))
                                        }
                                    </ScrollPanel>
                                </TabsPanel.Content.Item>
                            </TabsPanel.Content>
                        </TabsPanel>
                    </div>
                </div>
                    
            </div>
        </MotionDiv>
    );
}