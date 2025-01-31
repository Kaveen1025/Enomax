import {View, Text, TouchableOpacity, Alert, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderBar from '../../components/headerBar/HeaderBar';
import {SafeAreaView} from 'react-native-safe-area-context';
import refDetailsstyle from './Styles';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from '../../type';
import Spinner from '../../components/spinner/Spinner';
import {Searchbar} from 'react-native-paper';
import {FlatGrid} from 'react-native-super-grid';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStyles from '../../constant/MainStyles';
import RepDetailsCard from '../../components/repDetailsCard/RepDetailsCard';

const RefDetails = () => {
  const {repsDetailsAccoManager} = useSelector(
    (state: ReduxState) => state?.loadData,
  );
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('REf data', repsDetailsAccoManager);
  }, [repsDetailsAccoManager]);

  const renderItem = ({item}: any) => (
    <RepDetailsCard
      name={item.name ?? 'N/A'}
      phone={item.phone ?? 'N/A'}
      address={item.address ?? 'N/A'}
      outstandingcount={item.outstandingcount ?? 0}
      totaloutstanding={item.totaloutstanding ?? 0}
      totalpayed={item.totalpayed ?? 0}
      disabled={false}
    />
  );

  return (
    <SafeAreaView style={refDetailsstyle.container}>
      <HeaderBar
        page={'Sales Representative Details'}
        isMenu={false}
        onPress={() => navigation.goBack()}
      />
      <Spinner />
      <FlatList
        data={repsDetailsAccoManager}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 20}}
        ListEmptyComponent={<Text>No data available</Text>}
      />
    </SafeAreaView>
  );
};

export default RefDetails;
