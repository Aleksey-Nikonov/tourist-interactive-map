
import routes from '../resources/routes.json';
import * as ajax from './ajax-utils';
import decisionTable from '../resources/decisions';

export function getPreferableRoute(results) {
    let decisionKey = '';
    results.forEach(item => decisionKey += item.answerIndex);
    const resultRouteIndex = decisionTable[decisionKey];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(routes[resultRouteIndex]);
        }, 1000)
    })
}

function _getWeather() {
    
}

function _getTimeOfDay() {

}