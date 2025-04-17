import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
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
import {getSalesDetails, getSalesDetailsAllReps} from '../../service/api';
import {
  setSalesDetails,
  setSalesDetailsAllReps,
} from '../../redux/action/loadDataActions';

const RepSalesDetails = ({route}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // const [saleDetails, setSalesDetailsl] = useState('')
  const {salesDetails, salesDetailsAllReps} = useSelector(
    (state: ReduxState) => state?.loadData,
  );
  // useEffect(() => {
  //   loadSalesDetails();
  // }, []);

  // Format numbers with thousand separators and two decimal places
  const formatNumber = (num: any) => {
    return Number(num).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // const loadSalesDetails = async () => {
  //   let userId = await AsyncStorage.getItem('empid');
  //   dispatch(setSpinnerMessage('Loading Sales Details...'));
  //   dispatch(startLoading());
  //   var data = new FormData();
  //   data.append('empId', userId);
  //   getSalesDetails(data)
  //     .then(res => {
  //       dispatch(setSalesDetails(res.data));
  //       setSalesDetails(res.data);
  //       // console.log('Sales', res.data);
  //       dispatch(endLoading());
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       dispatch(endLoading());
  //     });
  // };

  const {designation} = route.params; // Get designation from navigation params

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch(setSpinnerMessage('Loading Sales Data...'));
    dispatch(startLoading());

    let userId = await AsyncStorage.getItem('empid');
    let data = new FormData();

    if (designation === '1') {
      // Different API call if designation = 1
      data.append('salesManagerId', userId);
      getSalesDetailsAllReps(data)
        .then(res => {
          dispatch(setSalesDetailsAllReps(res.data));
          // console.log('hi', res.data);
        })
        .catch(error => console.log(error))
        .finally(() => dispatch(endLoading()));
    } else {
      // Default API call
      data.append('empId', userId);
      getSalesDetails(data)
        .then(res => {
          dispatch(setSalesDetails(res.data));
        })
        .catch(error => console.log(error))
        .finally(() => dispatch(endLoading()));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        isMenu={false}
        onPress={() => navigation.navigate('Home' as never)}
        page="Sales Details"
      />
      <Spinner />
      {/* <SummaryCard
        monthlyTotal={formatNumber(salesDetails.fulltotal)}
        empName={salesDetails.empName}
        dailyTotal={formatNumber(salesDetails.dailytotal)}
        outstandingTotal={formatNumber(salesDetails.outstandingtotal)}
        date={salesDetails.date}
      /> */}

      {designation === '1' ? (
        <FlatList
          data={salesDetailsAllReps || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <SummaryCard
              monthlyTotal={formatNumber(item.fulltotal)}
              empName={item.empName}
              dailyTotal={formatNumber(item.dailytotal)}
              outstandingTotal={formatNumber(item.outstandingtotal)}
              date={item.date}
            />
          )}
        />
      ) : (
        <SummaryCard
          monthlyTotal={formatNumber(salesDetails.fulltotal)}
          empName={salesDetails.empName}
          dailyTotal={formatNumber(salesDetails.dailytotal)}
          outstandingTotal={formatNumber(salesDetails.outstandingtotal)}
          date={salesDetails.date}
        />
      )}
    </SafeAreaView>
  );
};

export default RepSalesDetails;
