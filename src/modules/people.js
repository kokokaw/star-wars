import api from './api/Api';

export const PEOPLE_LIST = 'people/LIST';
export const PEOPLE_SELECT = 'people/SELECT';
export const PEOPLE_DETAILS = 'people/DETAILS';
export const PEOPLE_SIDENAVTOGGLE = 'people/SIDENAVTOGGLE';

const initialState = {
	list: {},
	details: {},
	selected: null,
	sidenav: false
}

export default (state = initialState, action) => {
	switch (action.type) {
		case PEOPLE_LIST:
			return {
				...state,
				list: {
					...state.list,
					[action.page]: action.payload
				}
			};

		case PEOPLE_DETAILS:
			return {
				...state, 
				details: {
					...state.details,
					[action.payload.name]: action.payload
				}
			};

		case PEOPLE_SELECT:
			return {
				...state, 
				selected: action.payload
			};

		case PEOPLE_SIDENAVTOGGLE:
			return {
				...state, 
				sidenav: !state.sidenav
			};

		default:
			return state;
		
	}
};

export const peopleGetList = (page) => {
	return dispatch => {
		return api.Get(`/people?page=${page}`).then(data => {
			dispatch({
				type: PEOPLE_LIST,
				payload: data,
				page
			});
			return data;
		}).catch(error => {
			throw(error);
		});
	};
};

export const peopleSetDetails = (profile) => {
	return dispatch => {
		dispatch({
			type: PEOPLE_DETAILS,
			payload: profile
		});
	};
};

export const peopleSetSelected = (name) => {
	return dispatch => {
		dispatch({
			type: PEOPLE_SELECT,
			payload: name
		});
	};
};

export const peopleSidenavToggle = () => {
	return dispatch => {
		dispatch({
			type: PEOPLE_SIDENAVTOGGLE
		});
	};
};