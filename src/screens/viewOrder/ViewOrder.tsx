import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../../components/headerBar/HeaderBar';
import OrderCard from '../../components/orderCard/OrderCard';
import viewOrderStyles from './Styles';
import {ReduxState} from '../../type';
import {useDispatch, useSelector} from 'react-redux';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import moment from 'moment';
import {uploadOrder} from '../../service/api';
import {
  removeAllOrders,
  removeSingleItem,
} from '../../redux/action/orderAction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainStyles from '../../constant/MainStyles';

const ViewOrder = ({route, navigation}) => {
  const {orderData} = useSelector((state: ReduxState) => state?.orderData);

  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [remarkValue, setRemarkValue] = useState('');

  const getTotalAmount = () => {
    let nettotal = 0;
    orderData.map(item => {
      nettotal += parseFloat(item.price) * parseInt(item.itemQty);
    });
    return nettotal;
  };

  const removeall = () => {
    dispatch(removeAllOrders());
  };

  const uploadInvoice = async () => {
    const userId = await AsyncStorage.getItem('empid');
    const usertype = await AsyncStorage.getItem('userType');

    dispatch(startLoading());
    let sendArray = [];
    orderData.map(item => {
      sendArray.push({
        productID: item.productID,
        saleprice: item.price,
        newqty: item.itemQty,
        nettotal: item.price * item.itemQty,
      });
    });

    console.log('send array', sendArray);
    var data = new FormData();
    data.append('orderdate', moment(new Date()).format('YYYY-MM-DD'));
    data.append('remark', remarkValue);
    data.append('total', getTotalAmount());
    data.append('discount', 0);
    data.append('nettotal', getTotalAmount());
    data.append('discountpresentage', 0);
    data.append('repname', usertype === '1' ? route.params.repID : userId);
    data.append('area', route.params.areaID);
    data.append('customer', route.params.customerID);
    data.append('tableData', JSON.stringify(sendArray));
    data.append('userID', usertype === '1' ? route.params.repID : userId); // Conditional userID assignment
    data.append('locationID', 5);
    data.append('podiscount', 0);

    console.log('Data:..........', data);
    uploadOrder(data)
      .then(res => {
        dispatch(endLoading());
        if (res.status == '200') {
          Alert.alert('Success', 'Order Uploaded Successfully');

          AsyncStorage.setItem('user', res.config.data.repname);
          AsyncStorage.removeItem('areaId');
          removeall();
          navigation.navigate('Home' as never);
        }
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert('Failed', 'Something went wrong. Please try again later');
        dispatch(endLoading());
      });
  };
  const removeOneItem = async id => {
    // console.log('Attempting to delete item:', id);
    dispatch(startLoading());
    try {
      await dispatch(removeSingleItem(id));
      // console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error removing item:', error);
      Alert.alert('Failed', 'Failed to delete item. Please try again.');
    } finally {
      dispatch(endLoading());
    }
  };
  const renderOrderItem = ({item}: any) => (
    <OrderCard
      itemName={item.name}
      price={item.price}
      orderQty={item.itemQty}
      onPress={() => {
        // Handle press
      }}
      deleteIcon={true}
      disabled={true}
      onPressDelete={() => removeOneItem(item.id)}
    />
  );

  const formatAmount = (amount: any) => {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    // Monitor orderData for changes here if needed
    // console.log('Order data updated:', orderData);
  }, [orderData]);

  return (
    <SafeAreaView style={viewOrderStyles.container}>
      <HeaderBar
        isMenu={false}
        onPress={() =>
          navigation.navigate('OrderScreen', {
            customerID: route.params.customerID,
            areaID: route.params.areaID,
            hardwareItem: route.params.hardwareItem,
            cName: route.params.cName,
          })
        }
        page="View Orders"
      />
      {orderData.length > 0 ? (
        <FlatList
          data={orderData}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={viewOrderStyles.noDetails}>No Data to Show</Text>
      )}

      {orderData.length > 0 ? (
        <View>
          <TextInput
            style={viewOrderStyles.input}
            placeholder="Enter remark"
            value={remarkValue}
            placeholderTextColor={MainStyles.COLORS.GREY}
            onChangeText={setRemarkValue}
          />
          <View style={viewOrderStyles.amount}>
            <View style={viewOrderStyles.totalContainer}>
              <Text style={viewOrderStyles.totalLabel}>Total Items:</Text>
              <Text style={viewOrderStyles.totalAmount}>
                {orderData?.length}
              </Text>
            </View>
            <View style={viewOrderStyles.totalContainer}>
              <Text style={viewOrderStyles.totalLabel}>Net Total(Rs.):</Text>
              <Text style={viewOrderStyles.totalAmount}>
                {formatAmount(getTotalAmount())}
              </Text>
            </View>
          </View>
          <View style={viewOrderStyles.buttonView}>
            <TouchableOpacity
              style={viewOrderStyles.button}
              onPress={() => uploadInvoice()}>
              <Text style={viewOrderStyles.text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </SafeAreaView>
  );
};

export default ViewOrder;
