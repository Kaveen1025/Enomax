import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import SummaryCard from '../../components/summaryCard/SummaryCard';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderBar from '../../components/headerBar/HeaderBar';
import styles from './Styles';
import Spinner from '../../components/spinner/Spinner';
import {ReduxState} from '../../type';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getSalesDetails} from '../../service/api';
import {setSalesDetails} from '../../redux/action/loadDataActions';

const RepSalesDetails = ({route}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [saleDetails, setSalesDetailsl] = useState('')
  const {salesDetails} = useSelector((state: ReduxState) => state?.loadData);
  useEffect(() => {
    loadSalesDetails();
  }, []);

  // Format numbers with thousand separators and two decimal places
  const formatNumber = (num: any) => {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const loadSalesDetails = async () => {
    let userId = await AsyncStorage.getItem('empid');
    dispatch(setSpinnerMessage('Loading Sales Details...'));
    dispatch(startLoading());
    var data = new FormData();
    data.append('empId', userId);
    getSalesDetails(data)
      .then(res => {
        dispatch(setSalesDetails(res.data));
        setSalesDetails(res.data);
        // console.log('Sales', res.data);
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        isMenu={false}
        onPress={() => navigation.navigate('Home' as never)}
        page="Sales Details"
      />
      <Spinner />
      <SummaryCard
        monthlyTotal={formatNumber(salesDetails.fulltotal)}
        dailyTotal={formatNumber(salesDetails.dailytotal)}
        outstandingTotal={formatNumber(salesDetails.outstandingtotal)}
        date={salesDetails.date}
      />
    </SafeAreaView>
  );
};

export default RepSalesDetails;
