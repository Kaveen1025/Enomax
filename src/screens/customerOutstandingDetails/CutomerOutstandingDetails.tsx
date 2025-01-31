import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../../components/headerBar/HeaderBar';
import Navigation from '../../navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from '../../type';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import styles from './Styles';
import OutstandingCard from '../../components/outstandingCard/OutstandingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCustomerOutstandingDetailsFunction} from '../../service/api';
import {setOutstandingDetails} from '../../redux/action/loadDataActions';

const CustomerOutstandingDetailsScreen = ({route, navigation}: any) => {
  const {outstandingDetails} = useSelector(
    (state: ReduxState) => state?.loadData,
  );

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    loadCutomerOutstandingDetails();
  }, []);

  // Format numbers with thousand separators and two decimal places
  const formatNumber = (num: any) => {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Get customerID from route params
  const {customerID} = route.params;

  const loadCutomerOutstandingDetails = async () => {
    let userId = await AsyncStorage.getItem('empid');
    dispatch(setSpinnerMessage('Loading Outstanding Details...'));
    dispatch(startLoading());
    var data = new FormData();
    data.append('empId', userId);
    data.append('customerId', customerID);
    getCustomerOutstandingDetailsFunction(data)
      .then(res => {
        dispatch(setOutstandingDetails(res.data));
        console.log('OuTStanfd', res.data);
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const renderItem = ({item}: any) => {
    const balance = item.fulltot - item.payedamount;

    return (
      <OutstandingCard
        invoiceNo={item.invoiceno}
        fullTotal={formatNumber(item.fulltot)}
        paidAmount={formatNumber(item.payedamount)}
        balance={formatNumber(balance)}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        page={'Customer Outstanding Details'}
        isMenu={false}
        onPress={() => navigation.navigate('CustomersOutstandings')}
      />
      {outstandingDetails.length > 0 ? (
        <FlatList
          data={outstandingDetails}
          renderItem={renderItem}
          keyExtractor={item => item.customerId.toString()}
        />
      ) : (
        <Text style={styles.noDetails}>No Data To Show</Text>
      )}
    </SafeAreaView>
  );
};

export default CustomerOutstandingDetailsScreen;
