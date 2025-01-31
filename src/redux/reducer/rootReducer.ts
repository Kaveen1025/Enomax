import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerReducer from './SpinnerReducer';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import loadDataReducer from './loadDataReducer';
import orderDataReducer from './orderReducer';

const spinnerConfig = {
  key: 'spinner',
  storage: AsyncStorage,
};
const loadDataConfig = {
  key: 'loadData',
  storage: AsyncStorage,
};
const orderDataConfig = {
  key: 'orderData',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  spinner: persistReducer(spinnerConfig, SpinnerReducer),
  loadData: persistReducer(loadDataConfig, loadDataReducer),
  orderData: persistReducer(orderDataConfig, orderDataReducer),
});

export default rootReducer;
