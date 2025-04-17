import {
  DrawerActions,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  LogBox,
  TouchableOpacity,
  BackHandler,
  Alert,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import homeStyles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../../components/headerBar/HeaderBar';
import {useDispatch} from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import {FlatGrid} from 'react-native-super-grid';
import {
  getAllAreas,
  getAllOrders,
  getAllProduct,
  getAllSalesRef,
  getAreasAccoRef,
  getCatalog,
  getCustomersAccoRefFunction,
  getCustomersFunction,
  getRefAccoManagerFunction,
  getRefDetailsAccoManagerFunction,
} from '../../service/api';
import {
  setAllOrders,
  setAreas,
  setAreasAccoRef,
  setCatalogCategories,
  setCustomers,
  setCustomersAccoRef,
  setProduct,
  setRepsAccoManager,
  setRepsDetailsAccoManager,
  setSalseRef,
} from '../../redux/action/loadDataActions';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [designation, setDesignation] = useState(null);
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  // Fetch the designation each time the screen is focused
  useFocusEffect(
    useCallback(() => {
      dispatch(setSpinnerMessage('Loading...'));
      dispatch(startLoading());
      const fetchDesignation = async () => {
        try {
          const userType = await AsyncStorage.getItem('userType');
          setDesignation(userType);
        } catch (error) {
          console.error('Failed to fetch designation:', error);
        } finally {
          dispatch(endLoading()); // Stop loading once data is fetched
        }
      };

      fetchDesignation();
    }, []),
  );

  const items = [
    {
      name: 'Customers',
      imagePath: require('../../assets/images/list.png'),
      onPress: () =>
        navigation.navigate('Customers', {designation: designation} as never),
    },

    // Only display this item if designation is '1'
    ...(designation === '1'
      ? [
          {
            name: 'View Representative Details',
            imagePath: require('../../assets/images/businessman.png'),
            onPress: () => navigation.navigate('RefDetails' as never),
          },
        ]
      : []),

    {
      name: 'View Sales Details',
      imagePath: require('../../assets/images/excellent.png'),
      onPress: () =>
        navigation.navigate('RepSalesDetails', {
          designation: designation,
        } as never),
    },

    {
      name: 'View Customer Outstandings',
      imagePath: require('../../assets/images/bill.png'),
      onPress: () =>
        navigation.navigate('CustomersOutstandings', {
          designation: designation,
        } as never),
    },

    {
      name: 'View All Orders',
      imagePath: require('../../assets/images/orderA.png'),
      onPress: () => navigation.navigate('AllOrders' as never),
    },

    {
      name: 'View All Products',
      imagePath: require('../../assets/images/return.png'),
      onPress: () => navigation.navigate('AllProducts' as never),
    },

    {
      name: 'Sync Data',
      imagePath: require('../../assets/images/sync.png'),
      onPress: () => syncAllData(),
    },
  ];

  const syncAllData = async () => {
    await loadAllCustomers();
    await loadAllProducts();
    await loadSelseRefs();
    await loadAreaData();
    await loadAreaDataAccoRef();
    await getAllOrdersData();
    await loadAllRepsAccoManager();
    await loadAllRepsDetailsAccoManager();
    let userId = await AsyncStorage.getItem('empid');
    console.log('EMPID', userId);
  };

  const loadAllRepsAccoManager = async () => {
    let userId = await AsyncStorage.getItem('empid');
    dispatch(setSpinnerMessage('Loading Reps According to Area Manager...'));
    dispatch(startLoading());
    var data = new FormData();
    data.append('salesmanagerid', userId);
    getRefAccoManagerFunction(data)
      .then(res => {
        dispatch(setRepsAccoManager(res.data));
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const loadAllRepsDetailsAccoManager = async () => {
    let userId = await AsyncStorage.getItem('empid');
    dispatch(setSpinnerMessage('Loading...'));
    dispatch(startLoading());
    var data = new FormData();
    data.append('salesmanagerid', userId);
    getRefDetailsAccoManagerFunction(data)
      .then(res => {
        dispatch(setRepsDetailsAccoManager(res.data));
        console.log('DEtails', res.data);
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const loadAllCustomers = async () => {
    dispatch(setSpinnerMessage('Loading Customers...'));
    dispatch(startLoading());
    var data = new FormData();
    data.append('recordID', 5);
    getCustomersFunction(data)
      .then(res => {
        dispatch(setCustomers(res.data));
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const loadAllProducts = async () => {
    dispatch(setSpinnerMessage('Loading Products...'));
    dispatch(startLoading());
    getAllProduct()
      .then(res => {
        dispatch(setProduct(res.data));
        dispatch(endLoading());
      })
      .catch(error => {
        console.log('..........>', error);
        dispatch(endLoading());
      });
  };

  const loadSelseRefs = async () => {
    dispatch(setSpinnerMessage('Loading Sales Ref...'));
    dispatch(startLoading());
    getAllSalesRef()
      .then(res => {
        dispatch(setSalseRef(res.data));
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const loadAreaData = async () => {
    dispatch(setSpinnerMessage('Loading Areas...'));
    dispatch(startLoading());
    getAllAreas()
      .then(res => {
        dispatch(setAreas(res.data));
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const loadAreaDataAccoRef = async () => {
    const userId = await AsyncStorage.getItem('user');
    dispatch(setSpinnerMessage('Loading Areas Acco Ref...'));
    dispatch(startLoading());
    var data = new FormData();
    data.append('refId', userId);
    getAreasAccoRef(data)
      .then(res => {
        dispatch(setAreasAccoRef(res.data));

        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const getAllOrdersData = async () => {
    const userId = await AsyncStorage.getItem('empid');
    const userType = await AsyncStorage.getItem('userType');
    dispatch(setSpinnerMessage('Loading Orders...'));
    dispatch(startLoading());

    var data = new FormData();

    if (userType == '0') {
      data.append('repid', userId);
      data.append('salesmanagerid', '0');
    } else if (userType == '1') {
      data.append('salesmanagerid', userId);
      data.append('repid', '0');
    }

    getAllOrders(data)
      .then(res => {
        dispatch(setAllOrders(res.data));
        console.log('Order Data 1', res.data);
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  return (
    <SafeAreaView style={homeStyles.container}>
      <HeaderBar
        isMenu={true}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        page="Home"
      />

      <View style={homeStyles.imageView}>
        <Image
          source={require('../../assets/images/Ehpl.png')}
          style={homeStyles.imageStyle}
        />
      </View>
      <Spinner />
      {items.length > 0 ? (
        <FlatGrid
          itemDimension={190}
          data={items}
          style={homeStyles.gridView}
          spacing={10}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[homeStyles.itemContainer, homeStyles.shadowProp]}
              onPress={item.onPress}>
              <Image source={item.imagePath} style={homeStyles.image}></Image>
              <Text style={homeStyles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={homeStyles.noDetails}>No Data to Show</Text>
      )}
    </SafeAreaView>
  );
};

export default Home;
