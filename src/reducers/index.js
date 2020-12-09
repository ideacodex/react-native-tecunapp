import {combineReducers} from 'redux'
import usuariosReducer from './usuariosReducer'
import jobsReducer from './jobsReducer'
import awardReducer from './awardReducer'
import storeReducer from './storeReducer'

/*import stickersReducer from './stickersReducer'
import categoriesReducer from './categoriesReducer'
import giftReducer from './giftReducer'
import addressReducer from './addressReducer'
import historyGiftReducer from './historyGiftReducer'*/

export default combineReducers({
    usuariosReducer,
    jobsReducer,
    awardReducer,
    storeReducer,
    /*stickersReducer,
    categoriesReducer,
    giftReducer,
    addressReducer,
    historyGiftReducer,*/
});