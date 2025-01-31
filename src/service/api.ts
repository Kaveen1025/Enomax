import {
  Login_URL,
  Customer_URL,
  Product_URL,
  Get_Sales_Ref_URL,
  Get_All_Areas_URL,
  Upload_Order_Url,
  Customer_Acco_Ref_URL,
  Areas_Acco_Ref_URL,
  Catalog_Categories,
  Catalog_Data,
  All_Orders,
  Get_Sales_Ref_Acco_Manager_URL,
  Get_Sales_Ref_Details_Acco_Manager_URL,
  Get_All_Cutomers_With_Outstanding_URL,
  Sales_Details,
  Get_Outstanding_Details,
} from '../constant/APIURL';
import httpService from './httpService';

export function loginFunction(data: any) {
  if (data) {
    return httpService.post(Login_URL, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getCustomersFunction(data: any) {
  if (data) {
    return httpService.post(Customer_URL, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getAllProduct() {
  return httpService.post(Product_URL);
}
export function getAllSalesRef() {
  return httpService.post(Get_Sales_Ref_URL);
}

export function getAllAreas() {
  return httpService.post(Get_All_Areas_URL);
}

export function uploadOrder(data: any) {
  return httpService.post(Upload_Order_Url, data);
}

export function getCustomersAccoRefFunction(data: any) {
  if (data) {
    return httpService.post(Customer_Acco_Ref_URL, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getAreasAccoRef(data: any) {
  if (data) {
    return httpService.post(Areas_Acco_Ref_URL, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getCatalog() {
  return httpService.post(Catalog_Categories);
}

export function getAllCatalogData(data: any) {
  if (data) {
    return httpService.post(Catalog_Data, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getAllOrders(data: any) {
  if (data) {
    return httpService.post(All_Orders, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getRefAccoManagerFunction(data: any) {
  if (data) {
    return httpService.post(Get_Sales_Ref_Acco_Manager_URL, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getRefDetailsAccoManagerFunction(data: any) {
  if (data) {
    return httpService.post(Get_Sales_Ref_Details_Acco_Manager_URL, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getAllCustomersWithOutstandingFunction(data: any) {
  if (data) {
    return httpService.post(Get_All_Cutomers_With_Outstanding_URL, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getSalesDetails(data: any) {
  if (data) {
    return httpService.post(Sales_Details, data);
  }
  return Promise.reject(new Error('Error'));
}

export function getCustomerOutstandingDetailsFunction(data: any) {
  if (data) {
    return httpService.post(Get_Outstanding_Details, data);
  }
  return Promise.reject(new Error('Error'));
}
