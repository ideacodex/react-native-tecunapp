import { getUser, loadingUser, errorUser, avatarUser } from "../types/userTypes";
import { PURGE } from 'redux-persist';
const INITIAL = {
	token: '',
	user: [],
	cargando: false,
	registered: false,
	url_image: null,
	error: '',
};
export default (state = INITIAL, action) => {
	switch (action.type) {
		case loadingUser:
			return { ...state, cargando: true };
		case errorUser:
			return { ...state, error: action.error, cargando: action.cargando };
		case getUser:
			return { ...state, user: action.payload, token: action.token, cargando: action.cargando, error: '', };
		case avatarUser:
			return { ...state,  url_image: action.url_image, cargando: action.cargando, error: ''}
		case PURGE:
			return INITIAL;
		default:
			return state;
	}
};
