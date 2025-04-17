import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import customerStyles from './Styles';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../../components/headerBar/HeaderBar';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from '../../components/spinner/Spinner';
import {FlatGrid} from 'react-native-super-grid';
import {ReduxState} from '../../type';
import {Searchbar} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {getAllCustomersWithOutstandingFunction} from '../../service/api';
import {setCustomersWithOutstanding} from '../../redux/action/loadDataActions';

const CustomersOutsandings = ({route}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {customerDataWithOutstanding, repsAccoManager} = useSelector(
    (state: ReduxState) => state?.loadData,
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const {designation} = route.params || {}; // Prevent error

  const formattedRepData = repsAccoManager.map(rep => ({
    label: rep.name,
    value: rep.id,
  }));

  // Load last selected representative
  useEffect(() => {
    const loadLastRep = async () => {
      dispatch(startLoading());
      const savedRep = await AsyncStorage.getItem('selectedRep');
      if (savedRep) {
        setValue(JSON.parse(savedRep));
      } else if (repsAccoManager.length > 0) {
        setValue(repsAccoManager[0].id);
      }
      setIsInitialLoading(false);
      dispatch(endLoading());
    };
    loadLastRep();
  }, [repsAccoManager]);

  // Load customers when rep is selected
  useEffect(() => {
    const updateStorage = async () => {
      if (value) {
        console.log('Updating AsyncStorage with Rep ID:', value);
        loadAllCustomersWithOutstandings();
        AsyncStorage.setItem('selectedRep', JSON.stringify(value));
      }
    };
    updateStorage();
  }, [value]);

  // Reload customers when navigating back
  useFocusEffect(
    useCallback(() => {
      dispatch(setSpinnerMessage('Loading Customers...')); // Reset message
      if (!isInitialLoading) {
        loadAllCustomersWithOutstandings();
      }
    }, [isInitialLoading]),
  );

  const loadAllCustomersWithOutstandings = async () => {
    dispatch(startLoading());
    dispatch(setSpinnerMessage('Loading Customers...'));

    let userId = await AsyncStorage.getItem('empid');
    if (designation === '1') {
      userId = value;
    }

    var data = new FormData();
    data.append('empId', userId);

    try {
      const res = await getAllCustomersWithOutstandingFunction(data);
      dispatch(setCustomersWithOutstanding(res.data));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(endLoading());
    }
  };

  useEffect(() => {
    const filtered = customerDataWithOutstanding.filter(customer =>
      customer.customername.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCustomers(filtered);
  }, [searchQuery, customerDataWithOutstanding]);

  // if (isInitialLoading) {
  //   return <Spinner />;
  // }

  return (
    <SafeAreaView style={customerStyles.container}>
      <HeaderBar
        isMenu={false}
        onPress={() => navigation.navigate('Home' as never)}
        page="Customer Outstandings"
      />
      <Spinner />

      {designation === '1' && (
        <View>
          <Text style={customerStyles.area}>Select Sales Representative</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={formattedRepData}
            placeholder="Select Sales Representative"
            searchPlaceholder="Search rep..."
            setOpen={setOpen}
            setValue={setValue}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
              marginTop: 10,
              marginBottom: 10,
            }}
          />
        </View>
      )}

      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={{
          marginLeft: 10,
          marginRight: 10,
          marginTop: 8,
          marginBottom: 15,
          borderRadius: 10,
          height: 50,
          width: '90%',
          alignSelf: 'center',
        }}
        inputStyle={{marginTop: -2}}
      />

      {filteredCustomers.length > 0 ? (
        <FlatGrid
          itemDimension={190}
          data={filteredCustomers}
          style={customerStyles.gridView}
          spacing={10}
          renderItem={({item}) => (
            <TouchableOpacity
              style={[customerStyles.itemContainer, customerStyles.shadowProp]}
              onPress={() => {
                const navigationParams: any = {
                  customerID: item?.customerId,
                  designation: designation,
                  outTot: item?.fulltot,
                  // repID: selectedRepID, // Ensure repID is always passed
                };

                if (designation === '1') {
                  navigationParams.repID = value;
                }

                navigation.navigate(
                  'OutstandingDetails' as never,
                  navigationParams as never,
                );
              }}>
              <Text style={customerStyles.itemName}>{item.customername}</Text>
              <Text style={customerStyles.address}>{item.address}</Text>
              <Text style={customerStyles.outstanding}>
                {'Total Outstanding (Rs.)'}
              </Text>
              <Text style={customerStyles.dot}>
                {'----------------------------'}
              </Text>
              <Text style={customerStyles.outstandingValue}>
                {formatNumber(item.fulltot)}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={customerStyles.noDetails}>No Data to Show</Text>
      )}
    </SafeAreaView>
  );
};

const formatNumber = (num: any) => {
  return Number(num).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default CustomersOutsandings;
