import {
  SET_ALL_ORDERS,
  SET_AREA_DATA,
  SET_AREA_DATA_ACCO_REF,
  SET_CATALOG_CATEGORIES,
  SET_CATALOG_DATA,
  SET_CUSTOMER_ACCO_REF_DATA,
  SET_CUSTOMER_DATA,
  SET_CUSTOMERS_WITH_OUTSTANDING,
  SET_OUTSTANDING_DETAILS,
  SET_PRODUCT_DATA,
  SET_REF_DATA,
  SET_REPS_ACCO_MANAGER,
  SET_REPS_DETAILS_ACCO_MANAGER,
  SET_SALES_DETAILS,
} from '../../constant/ReduxConstant';

export const setCustomers = (data: any) => ({
  type: SET_CUSTOMER_DATA,
  payload: data,
});
export const setProduct = (data: any) => ({
  type: SET_PRODUCT_DATA,
  payload: data,
});
export const setAreas = (data: any) => ({
  type: SET_AREA_DATA,
  payload: data,
});
export const setSalseRef = (data: any) => ({
  type: SET_REF_DATA,
  payload: data,
});
export const setCustomersAccoRef = (data: any) => ({
  type: SET_CUSTOMER_ACCO_REF_DATA,
  payload: data,
});
export const setAreasAccoRef = (data: any) => ({
  type: SET_AREA_DATA_ACCO_REF,
  payload: data,
});

export const setRepsAccoManager = (data: any) => ({
  type: SET_REPS_ACCO_MANAGER,
  payload: data,
});

export const setRepsDetailsAccoManager = (data: any) => ({
  type: SET_REPS_DETAILS_ACCO_MANAGER,
  payload: data,
});

export const setCatalogCategories = (data: any) => ({
  type: SET_CATALOG_CATEGORIES,
  payload: data,
});

export const setCatalogData = (data: any) => ({
  type: SET_CATALOG_DATA,
  payload: data,
});

export const setAllOrders = (data: any) => ({
  type: SET_ALL_ORDERS,
  payload: data,
});

export const setCustomersWithOutstanding = (data: any) => ({
  type: SET_CUSTOMERS_WITH_OUTSTANDING,
  payload: data,
});

export const setSalesDetails = (data: any) => ({
  type: SET_SALES_DETAILS,
  payload: data,
});

export const setOutstandingDetails = (data: any) => ({
  type: SET_OUTSTANDING_DETAILS,
  payload: data,
});
