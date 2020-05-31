import * as mapboxgl from 'mapbox-gl';
import * as ajax from './ajax-utils';

import './map-creator.css';

let map;

export function init(containerId, geolocateHandler = null) {
    mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN;
    
    map = new mapboxgl.Map({
        container: containerId,
        style: 'mapbox://styles/mapbox/light-v10',
        center: [49.121990, 55.783709],
        zoom: 13.5,
        pitch: 60,
        bearing: 0,
        attributionControl: false
    });

    map.addControl(new mapboxgl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: false
    }))

    map.addControl(new mapboxgl.ScaleControl({
        unit: 'metric',
        maxWidth: 100
    }));

    const geolocateControl = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    });
    map.addControl(geolocateControl);
    geolocateControl.on('geolocate', ({ coords: { latitude, longitude }}) => {
        geolocateHandler({ longitude, latitude });
    });
}

export function drawTouristRoute(coordinates){
  const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: coordinates
        }
  };

  map.on('load', function() {
    map.addSource('route', {
        'type': 'geojson',
        'data': geojson
    });

    map.addLayer({
        'id': 'route',
        'source': 'route',
        'type': 'line',
        'paint': {
            'line-width': 5,
            'line-color': '#e67e22'
        }
    });
  });
}

export function drawUserRoute(start, end){
    const url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    ajax.get(url)
        .then(result => {
            const data = result.response.routes[0];
            const route = data.geometry.coordinates;
            const geojson = {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: route
                }
            };

            if (map.getSource('user-route')) {
                map.getSource('user-route').setData(geojson);
            } else {
                map.addSource('user-route', {
                    'type': 'geojson',
                    'data': geojson
                });
            
                map.addLayer({
                    'id': 'user-route',
                    'source': 'user-route',
                    'type': 'line',
                    'paint': {
                        'line-width': 5,
                        'line-color': '#3498db'
                    }
                });
            }
        });
}

export function addMarker({ icon, style, coords, title, type }, onMarkerHover){
    const marker = document.createElement('div');
    marker.className = `marker ${style}`;
    marker.addEventListener('mouseover', () => onMarkerHover(title, type));
    marker.addEventListener('mouseout', () => onMarkerHover('', ''));
    
    const img = document.createElement('img');
    marker.appendChild(img);

    img.className = 'marker__img';
    img.src = icon;
    img.style.width = '17px';
    img.style.height = '17px';

    new mapboxgl.Marker(marker)
        .setLngLat(coords)
        .addTo(map);
}

export function changeLocation(coords){
    map.flyTo({
        center: coords,
        zoom: 17
    })
}