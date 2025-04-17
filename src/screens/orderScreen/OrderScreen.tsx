import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import orderDetailStyles from './Styles';
import HeaderBar from '../../components/headerBar/HeaderBar';
import OrderCard from '../../components/orderCard/OrderCard';
import Navigation from '../../navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from '../../type';
import {Searchbar} from 'react-native-paper';
import Modal from 'react-native-modal';
import {
  addOrders,
  removeAllOrders,
  removeSingleItem,
} from '../../redux/action/orderAction';
import MainStyles from '../../constant/MainStyles';
import CustomIcon from '../../components/customIcon';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {setCatalogData} from '../../redux/action/loadDataActions';
import {getAllCatalogData} from '../../service/api';
import NetInfo from '@react-native-community/netinfo';

const OrderScreen = ({route, navigation}: any) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState('');
  const {catalogData} = useSelector((state: ReduxState) => state?.loadData);
  const {orderData} = useSelector((state: ReduxState) => state?.orderData);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [orderArray, setOrderArray] = useState([]);
  const {hardwareItem, cName} = route.params;

  const dispatch = useDispatch();
  useEffect(() => {
    console.log('Route params:', route.params);
    console.log('Representative ID 2:', route.params.repID);
    getCatelogDetails();
  }, [hardwareItem]);

  useEffect(() => {
    const filtered = catalogData?.product_details?.filter(products =>
      products.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [searchQuery, catalogData]);

  useEffect(() => {
    console.log('Order Data:', orderData);
  }, [orderData]);

  const getCatelogDetails = async () => {
    // Check network status
    dispatch(startLoading());
    dispatch(setSpinnerMessage('Loading Catalog Details...'));
    const networkState = await NetInfo.fetch();
    try {
      if (networkState.isConnected) {
        var data = new FormData();
        data.append('catalogcategoryid', hardwareItem);
        getAllCatalogData(data)
          .then(res => {
            dispatch(setCatalogData(res.data));
            // console.log(res.data);
            dispatch(endLoading()); // Set loading to false when data is fetched
          })
          .catch(err => {
            console.log(err);
            dispatch(endLoading()); // Set loading to false in case of error
          });
      } else {
        dispatch(endLoading()); // Set loading to false if no internet connection
        Alert.alert('No internet connection, and no cached data available.');
      }
    } catch (error) {
      dispatch(endLoading()); // Set loading to false in case of error
      Alert.alert('Something went wrong... Try again later');
    }
  };

  const renderItem = ({item}: any) => (

    <OrderCard
      itemName={item.name}
      price={item.price}
      availableQty={item.availableQty ?? '0'}
      orderQty={getOrderItem(item)}
      onPress={() => {
        console.log(item)
        if (item.availableQty > 0) {
          setSelectedOrder(item);
          setModalVisible(true);
          setQuantity(item.orderQty);
        } else {
          Alert.alert('Unavailable', 'This item is out of stock.');
        }
      }}
      deleteIcon={false}
      disabled={false}
      isAvailable={checkItemExist(item)}
      // longPress={() => removeOneItem(item.id)}
    />
  );

  // const handleUpdateQuantity = () => {
  //   if (!quantity || parseInt(quantity) <= 0) {
  //     Alert.alert('Invalid Input', 'Please enter a valid quantity.');
  //     return;
  //   }
  //   if (parseInt(quantity) > selectedOrder.qty) {
  //     Alert.alert(
  //       'Quantity Exceeded',
  //       'The order quantity cannot exceed the available quantity.',
  //     );
  //     return;
  //   }
  //   let order = selectedOrder;
  //   order.itemQty = parseInt(quantity);
  //   dispatch(addOrders(order));
  //   setModalVisible(false);
  //   setQuantity('');
  // };

  const handleUpdateQuantity = () => {
    if (!quantity || parseInt(quantity) <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid quantity.');
      return;
    }
    if (parseInt(quantity) > selectedOrder.availableQty) {
      Alert.alert(
        'Quantity Exceeded',
        'The order quantity cannot exceed the available quantity.',
      );
      return;
    }

    const newOrder = {
      ...selectedOrder,
      itemQty: parseInt(quantity),
    };

    dispatch(addOrders(newOrder));
    setModalVisible(false);
    setQuantity('');
  };

  const removeOneItem = (id: string) => {
    dispatch(removeSingleItem(id));
  };

  const checkItemExist = (data: any) => {
    let selectItem = orderData.findIndex(
      (item: any) => item.productID == data.productID,
    );
    if (0 <= selectItem) {
      return true;
    } else {
      return false;
    }
  };
  const getOrderItem = (data: any) => {
    let selectItem = orderData.findIndex(
      (item: any) => item.productID == data.productID,
    );
    if (0 <= selectItem) {
      return orderData[selectItem].itemQty;
    } else {
      return 0;
    }
  };
  const removeall = () => {
    dispatch(removeAllOrders());
  };

  const handleCheckout = () => {
    console.log('order data', orderData);
    if (orderData.length === 0) {
      Alert.alert('No Items', 'There are no items in your order.');
      return;
    }
    navigation.navigate('ViewOrder', {
      customerID: route.params.customerID,
      areaID: route.params.areaID,
      hardwareItem: route.params.hardwareItem,
      cName: route.params.cName,
      repID: route.params.repID,
    });
  };

  return (
    <SafeAreaView style={orderDetailStyles.container}>
      <HeaderBar
        page={'Place Order'}
        isMenu={false}
        onPress={() =>
          navigation.navigate('CatalogCategories', {
            customerID: route.params.customerID,
            areaID: route.params.areaID,
            hardwareItem: route.params.hardwareItem,
            cName: route.params.cName,
            repID: route.params.repID,
          })
        }
      />

      <View>
        {/* Modal for displaying order details */}
        <Modal
          animationIn={'fadeInUpBig'}
          animationOut={'fadeOutDownBig'}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => setModalVisible(false)}
          isVisible={modalVisible}>
          <View style={orderDetailStyles.centeredView}>
            <View style={orderDetailStyles.modalView}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  marginRight: -20,
                  marginTop: -15,
                }}>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <CustomIcon
                    type="AntDesign"
                    icon="close"
                    color="red"
                    size={25}
                  />
                </TouchableOpacity>
              </View>
              <Text style={orderDetailStyles.details}>Order Details</Text>
              {/* <View style={orderDetailStyles.row}>
                <Text style={orderDetailStyles.label}>Item Name:</Text>
                <Text style={orderDetailStyles.value}>
                  {selectedOrder?.name}
                </Text>
              </View> */}

              <View style={{alignSelf: 'center', marginBottom: 2}}>
                <View style={orderDetailStyles.labelContainer}>
                  <Text style={orderDetailStyles.label}>Item Name</Text>
                  <View
                    style={{
                      width: '73%',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: 'black',
                      }}>
                      :
                    </Text>
                    <Text style={orderDetailStyles.itemValue}>
                      {selectedOrder?.name}
                    </Text>
                  </View>
                </View>

                <View style={orderDetailStyles.labelContainer}>
                  <Text style={orderDetailStyles.label}>
                    Available Quantity
                  </Text>
                  <View
                    style={{
                      width: '73%',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: 'black',
                      }}>
                      :
                    </Text>
                    <Text style={orderDetailStyles.itemValue}>
                      {selectedOrder?.availableQty}
                    </Text>
                  </View>
                </View>
              </View>
              {/* <View style={orderDetailStyles.row}>
                <Text style={orderDetailStyles.label}>Item Code:</Text>
                <Text style={orderDetailStyles.value}>
                  {selectedOrder?.productcode}
                </Text>
              </View> */}
              {/* <View style={orderDetailStyles.row}>
                <Text style={orderDetailStyles.label}>Available Quantity:</Text>
                <Text style={orderDetailStyles.value}>
                  {selectedOrder?.qty}
                </Text>
              </View> */}
              <TextInput
                style={orderDetailStyles.input}
                onChangeText={text => setQuantity(text)}
                value={quantity}
                placeholder="Enter Order Quantity"
                placeholderTextColor={MainStyles.COLORS.DARK_GREY}
                keyboardType="numeric"
              />
              <TouchableOpacity
                style={orderDetailStyles.button}
                onPress={handleUpdateQuantity}>
                <Text style={orderDetailStyles.textStyle}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={{
            marginLeft: 10,
            marginRight: 10,
            marginTop: 10,
            marginBottom: 15,
            borderRadius: 15,
          }}
        />
      </View>

      {filteredProducts?.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={orderDetailStyles.noDetails}>No Data to Show</Text>
      )}
      {filteredProducts?.length > 0 ? (
        <View style={orderDetailStyles.buttonView}>
          <TouchableOpacity
            style={orderDetailStyles.button}
            onPress={handleCheckout}>
            <Text style={orderDetailStyles.text}>Checkout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View></View>
      )}
      {/* <View style={orderDetailStyles.buttonView}>
        <TouchableOpacity
          style={orderDetailStyles.button}
          onPress={() => removeall()}>
          <Text style={orderDetailStyles.text}>remove</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default OrderScreen;
