import { combineReducers } from 'redux';
import product from './product/product';
import globalUI from './globalUI';
import modal from './../components/modal/modalReducer';
import customer from './customer/customer';
import locations from './locations/locations';
import auth from './auth';
import mainCard from './maintenancecard';
import historyMainCard from './historyMainCard/historyMainCard';
import staffHistoryMainCard from './staffHistoryMainCard/staffHistoryMainCard';
import staff from './staff/staff';
import notification from './notification';

export default combineReducers({
  auth,
  product,
  globalUI,
  modal,
  customer,
  locations,
  mainCard,
  staff,
  historyMainCard,
  staffHistoryMainCard,
  notification
})
