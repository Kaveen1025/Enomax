import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
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
import {
  getCustomersAccoRefFunction,
  getRefAccoManagerFunction,
} from '../../service/api';
import {
  setCustomersAccoRef,
  setRepsAccoManager,
} from '../../redux/action/loadDataActions';

const Customers = ({route}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {customerData, customerDataAccoRef, repsAccoManager} = useSelector(
    (state: ReduxState) => state?.loadData,
  );
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    repsAccoManager.length > 0 ? repsAccoManager[0].id : null,
  );

  // Access the passed designation param
  const {designation} = route.params;

  const formattedRepData = repsAccoManager.map(rep => ({
    label: rep.name,
    value: rep.id,
  }));

  useEffect(() => {
    loadAllCustomersAccoRef();
    console.log(repsAccoManager);
  }, [value]);

  useEffect(() => {
    const filtered = customerDataAccoRef.filter(customer =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCustomers(filtered);
  }, [searchQuery, customerDataAccoRef]);

  const loadAllCustomersAccoRef = async () => {
    let userId = await AsyncStorage.getItem('empid');
    if (designation === '1') {
      userId = value; // 'value' is the selected value from the dropdown
    }

    dispatch(setSpinnerMessage('Loading Customers According to Rep...'));
    dispatch(startLoading());
    var data = new FormData();
    data.append('employeeId', userId);
    // data.append('areaid', value);
    getCustomersAccoRefFunction(data)
      .then(res => {
        dispatch(setCustomersAccoRef(res.data));
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  return (
    <SafeAreaView style={customerStyles.container}>
      <HeaderBar
        isMenu={false}
        onPress={() => navigation.navigate('Home' as never)}
        page="Customers"
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
            searchPlaceholder="Search area...."
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

      <View>
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
      </View>

      {filteredCustomers.length > 0 ? (
        <FlatGrid
          itemDimension={190}
          data={filteredCustomers}
          style={customerStyles.gridView}
          spacing={10}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[customerStyles.itemContainer, customerStyles.shadowProp]}
              onPress={async () => {
                await AsyncStorage.setItem('areaId', item?.areaId);
                console.log('Area ID', item?.areaId);

                // Check if designation is '1' to pass rep ID
                const navigationParams = {
                  customerID: item?.id,
                  areaIDAccoRef: item?.areaId,
                };

                // If designation is '1', include the rep ID
                if (designation === '1') {
                  navigationParams.repID = value; // 'value' is the selected rep ID
                }

                navigation.navigate(
                  'CatalogCategories' as never,
                  navigationParams as never,
                );
              }}>
              <Text style={customerStyles.itemName}>{item.name}</Text>
              <Text style={customerStyles.address}>{item.address}</Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={customerStyles.noDetails}>No Data to Show</Text>
      )}
    </SafeAreaView>
  );
};

export default Customers;
