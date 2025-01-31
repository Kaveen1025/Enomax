import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDraverContent from '../components/sideNavBar/SideNav';
import BottomTabNavigator from './TabNavigations';
import OrderScreen from '../screens/orderScreen/OrderScreen';

import Customers from '../screens/customers/Customers';
import AllProductsScreen from '../screens/allProducts/AllProducts';

import ViewOrder from '../screens/viewOrder/ViewOrder';
import CatalogCategoriesScreen from '../screens/catalog/Catalog';
import Home from '../screens/home/Home';
import AllOrdersScreen from '../screens/allOrders/AllOrders';
import RefDetails from '../screens/refDetails/RefDetails';
import CustomersOutsandings from '../screens/viewCustomerOutstandings/ViewCustomerOutstandings';
import RepSalesDetails from '../screens/salesDetails/SalesDetails';
import CustomerOutstandingDetailsScreen from '../screens/customerOutstandingDetails/CutomerOutstandingDetails';
const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDraverContent {...props} />}>
      <Drawer.Screen
        key="home"
        name="Home"
        component={Home}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="customers"
        name="Customers"
        component={Customers}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="catalogCategories"
        name="CatalogCategories"
        component={CatalogCategoriesScreen}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="orderScreen"
        name="OrderScreen"
        component={OrderScreen}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="viewOrder"
        name="ViewOrder"
        component={ViewOrder}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />
      <Drawer.Screen
        key="refDetails"
        name="RefDetails"
        component={RefDetails}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="allProducts"
        name="AllProducts"
        component={AllProductsScreen}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="allOrders"
        name="AllOrders"
        component={AllOrdersScreen}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="customersOutstandings"
        name="CustomersOutstandings"
        component={CustomersOutsandings}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="repSalesDetails"
        name="RepSalesDetails"
        component={RepSalesDetails}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />

      <Drawer.Screen
        key="outstandingDetails"
        name="OutstandingDetails"
        component={CustomerOutstandingDetailsScreen}
        options={{headerShown: false, swipeEnabled: false, unmountOnBlur: true}}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigation;
