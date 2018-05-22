import axios from 'axios';
import config from '../../config';

const axiosInstance = axios.create({
	baseURL: config.api,
    headers: {
		'Content-Type': 'application/json'
	}
});

class MainApi {  
	static Get(param) {
		return axiosInstance.get(param)
		.then(function (response) {
			return response.data;
		})
		.catch(function (error) {
			throw(error);
		});
	}

}

export default MainApi; 


