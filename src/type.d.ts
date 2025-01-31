import {NavigationProp} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';

type BaseRouteDataType = {
  key: string;
  name: string;
  params: any;
  path: string;
};

export declare interface CustomNavigationType
  extends NavigationProp<ReactNavigation.RootParamList> {
  replace: (routeName: never, params?: never) => void;
  push: (routeName: never, params?: never) => void;
  pop: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

//#region ------Redux State Types------

type SpinnerStateType = {
  loading: boolean;
  spinnerMessage: string;
};

type loadDataType = {
  customerData: [];
  areaData: [];
  productData: [];
  refData: [];
  customerDataAccoRef: [];
  customerDataWithOutstanding: [];
  areaDataAccoRef: [];
  catalog: [];
  catalogData: [];
  allOrders: [];
  repsAccoManager: [];
  repsDetailsAccoManager: [];
  salesDetails: [];
  outstandingDetails: [];
};

type orderDataType = {
  orderData: [];
};

export declare interface ReduxState {
  spinner: SpinnerStateType;
  loadData: loadDataType;
  orderData: orderDataType;
}
