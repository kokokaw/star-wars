import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import people from './people';
import subset from './subset';

export default combineReducers({
	router: routerReducer,
	people,
	subset
});
