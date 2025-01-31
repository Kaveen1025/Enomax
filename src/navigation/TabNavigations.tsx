import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MainStyles from '../constant/MainStyles';

import ViewOrder from '../screens/viewOrder/ViewOrder';
import {createStackNavigator} from '@react-navigation/stack';
import OrderScreen from '../screens/orderScreen/OrderScreen';
import AllProductsScreen from '../screens/allProducts/AllProducts';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: MainStyles.COLORS.DARK_GREEN,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="Place Order"
        component={OrderScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <Icon name="mobile-alt" color={color} size={size} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="All Products"
        component={AllProductsScreen}
        options={{
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <Icon name="mobile-alt" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="View Order"
        component={ViewOrder}
        options={{
          headerShown: false,

          tabBarIcon: ({color, size}) => (
            <Icon name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
