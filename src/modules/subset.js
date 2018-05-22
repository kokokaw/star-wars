import api from './api/Api';

export const SUBSET_DETAILS = 'subset/DETAILS';

const initialState = {
	species: {},
	starships: {},
	planets: {},
	films: {},
	vehicles: {}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SUBSET_DETAILS:
			return {
				...state, 
				[action.subset]: {
					...state[action.subset],
					[action.id]: action.payload
				}
			};

		default:
			return state;
		
	}
};

export const subsetGetDetails = (id, subset) => {
	return dispatch => {
		return api.Get(`/${subset}/${id}/`).then(data => {
			dispatch({
				type: SUBSET_DETAILS,
				payload: data,
				subset,
				id
			});
			return data;
		}).catch(error => {
			throw(error);
		});
	};
};