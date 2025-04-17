import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../../components/headerBar/HeaderBar';
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
import moment from 'moment';

const CustomerOutstandingDetailsScreen = ({route, navigation}: any) => {
  const {outstandingDetails} = useSelector(
    (state: ReduxState) => state?.loadData,
  );

  const {designation, customerID, repID, outTot} = route.params;

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    loadCutomerOutstandingDetails();
    return () => {
      dispatch(setSpinnerMessage('Loading Customers...'));
    };
  }, [customerID]);

  const formatNumber = (num: any) => {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const loadCutomerOutstandingDetails = async () => {
    let userId = await AsyncStorage.getItem('empid');
    const savedRep = await AsyncStorage.getItem('selectedRep');

    // If designation is 1, use savedRep; otherwise, use userId
    const selectedRepID = designation == 1 ? JSON.parse(savedRep) : userId;

    dispatch(startLoading());
    dispatch(setSpinnerMessage('Loading Outstanding Details...'));

    var data = new FormData();
    data.append('empId', selectedRepID);
    data.append('customerId', customerID);

    // console.log('empid', selectedRepID);
    // console.log('CusId', customerID);

    getCustomerOutstandingDetailsFunction(data)
      .then(res => {
        dispatch(setOutstandingDetails(res.data));
        setLoading(false); // Stop loading when data is fetched
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
        setLoading(false); // Stop loading on error
      })
      .finally(() => {
        dispatch(endLoading());
      });
  };

  const renderItem = ({item}: any) => {
    const balance = item.fulltot - item.payedamount;
    const orderDate = item?.date ? moment(item.date, 'YYYY-MM-DD') : null;
    const today = moment();
    const daysDiff = orderDate ? today.diff(orderDate, 'days') : 0;

    let borderColor;
    let borderWidth;

    if (daysDiff > 90) {
      borderColor = '#FF0000'; // More than 90 days -> Red border
      borderWidth = 4;
    } else if (daysDiff > 60) {
      borderColor = '#FFC300'; // More than 30 days -> Yellow border
      borderWidth = 4;
    }
    return (
      <OutstandingCard
        invoiceNo={item.invoiceno}
        fullTotal={formatNumber(item.fulltot)}
        paidAmount={formatNumber(item.payedamount)}
        balance={formatNumber(balance)}
        date={item.date ? item.date : 'N/A'}
        borderColor={borderColor} // Pass dynamic border color
        borderWidth={borderWidth} // Pass dynamic border width
        daysDiff={daysDiff}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        page={'Customer Outstanding Details'}
        isMenu={false}
        onPress={() =>
          navigation.navigate('CustomersOutstandings', {
            designation,
            repID,
          } as never)
        }
      />
      {loading ? (
        <ActivityIndicator size="large" color="#FF4500" style={styles.loader} />
      ) : outstandingDetails.length > 0 ? (
        <View style={{maxHeight: '87%'}}>
          <View>
            <Text style={styles.outTot}>
              Total Outstanding(Rs.): {formatNumber(outTot)}
            </Text>
          </View>
          <View>
            <FlatList
              data={outstandingDetails}
              renderItem={renderItem}
              keyExtractor={item => item.invoiceno.toString()}
            />
          </View>
        </View>
      ) : (
        <Text style={styles.noDetails}>No Data To Show</Text>
      )}
    </SafeAreaView>
  );
};

export default CustomerOutstandingDetailsScreen;
