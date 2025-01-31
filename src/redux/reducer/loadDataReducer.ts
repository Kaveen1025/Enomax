import {
  START_LOADING,
  END_LOADING,
  SET_SPINNER_MESSAGE,
  SET_CUSTOMER_DATA,
  SET_AREA_DATA,
  SET_PRODUCT_DATA,
  SET_REF_DATA,
  SET_CUSTOMER_ACCO_REF_DATA,
  SET_AREA_DATA_ACCO_REF,
  SET_CATALOG_CATEGORIES,
  SET_CATALOG_DATA,
  SET_ALL_ORDERS,
  SET_REPS_ACCO_MANAGER,
  SET_REPS_DETAILS_ACCO_MANAGER,
  SET_CUSTOMERS_WITH_OUTSTANDING,
  SET_SALES_DETAILS,
  SET_OUTSTANDING_DETAILS,
} from '../../constant/ReduxConstant';
import {loadDataType} from '../../type';

const initialState: loadDataType = {
  customerData: [],
  areaData: [],
  productData: [],
  refData: [],
  customerDataAccoRef: [],
  areaDataAccoRef: [],
  catalog: [],
  catalogData: [],
  allOrders: [],
  repsAccoManager: [],
  repsDetailsAccoManager: [],
  customerDataWithOutstanding: [],
  salesDetails: [],
  outstandingDetails: [],
};

function loadDataReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_CUSTOMER_DATA:
      return {
        ...state,
        customerData: action.payload,
      };
    case SET_AREA_DATA:
      return {
        ...state,
        areaData: action.payload,
      };

    case SET_PRODUCT_DATA:
      return {
        ...state,
        productData: action.payload,
      };
    case SET_REF_DATA:
      return {
        ...state,
        refData: action.payload,
      };
    case SET_CUSTOMER_ACCO_REF_DATA:
      return {
        ...state,
        customerDataAccoRef: action.payload,
      };

    case SET_AREA_DATA_ACCO_REF:
      return {
        ...state,
        areaDataAccoRef: action.payload,
      };

    case SET_CATALOG_CATEGORIES:
      return {
        ...state,
        catalog: action.payload,
      };

    case SET_CATALOG_DATA:
      return {
        ...state,
        catalogData: action.payload,
      };

    case SET_REPS_ACCO_MANAGER:
      return {
        ...state,
        repsAccoManager: action.payload,
      };

    case SET_REPS_DETAILS_ACCO_MANAGER:
      return {
        ...state,
        repsDetailsAccoManager: action.payload,
      };

    case SET_ALL_ORDERS:
      return {
        ...state,
        allOrders: action.payload,
      };

    case SET_CUSTOMERS_WITH_OUTSTANDING:
      return {
        ...state,
        customerDataWithOutstanding: action.payload,
      };

    case SET_SALES_DETAILS:
      return {
        ...state,
        salesDetails: action.payload,
      };

    case SET_OUTSTANDING_DETAILS:
      return {
        ...state,
        outstandingDetails: action.payload,
      };

    default:
      return state;
  }
}

export default loadDataReducer;
