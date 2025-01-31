import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import allProductsStyles from './Styles';
import HeaderBar from '../../components/headerBar/HeaderBar';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from '../../type';
import {Searchbar} from 'react-native-paper';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import InvoiceCard from '../../components/invoiceCard/InvoiceCard';
import ModalWrapper from './ModalWrapper';
import InvoiceCustomerInfo from '../../components/invoiceCustomerInfo/InvoiceCustomerInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getAllOrders} from '../../service/api';
import {setAllOrders} from '../../redux/action/loadDataActions';

const AllOrdersScreen = ({route, navigation}: any) => {
  const {allOrders} = useSelector((state: ReduxState) => state?.loadData);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectItem, setSelectItem] = useState();
  const [visibleInvoiceItem, setVisibleInvoiceItem] = useState(false);

  useEffect(() => {
    refreshAllOrdersData();
    console.log('All Orders', allOrders);
  }, []);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(setSpinnerMessage('Loading Orders...'));

    // Sort OrderData by date in descending order
    const sortedOrderData = [...allOrders].sort(
      (a, b) => parseInt(b?.data?.orderid) - parseInt(a?.data?.orderid),
    );

    const filtered = sortedOrderData.filter(orders => {
      const customername = orders?.data?.customername || '';
      const area = orders?.data?.area || '';
      const orderid = orders?.data?.orderid || '';

      return (
        customername.toLowerCase().includes(searchQuery.toLowerCase()) ||
        area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        orderid.includes(searchQuery)
      );
    });

    console.log('...........', JSON.stringify(filtered));
    setFilteredOrders(filtered);
    dispatch(endLoading());
    setLoading(false);
  }, [searchQuery, allOrders]);

  const getStatusText = (status: string) =>
    status === '1' ? 'Active' : 'Pending';

  const closeModal = () => {
    setVisibleInvoiceItem(false);
  };

  const getTotal = () => {
    if (selectItem?.detaildata?.length > 0) {
      let total = 0.0;
      selectItem?.detaildata.map((item, index) => {
        total += parseFloat(item.orderqty) * parseFloat(item.saleprice);
      });
      return total;
    } else {
      return 0.0;
    }
  };

  const formatAmount = (amount: any) => {
    return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const refreshAllOrdersData = async () => {
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
        console.log('Order Data', res.data);
        dispatch(endLoading());
      })
      .catch(error => {
        console.log(error);
        dispatch(endLoading());
      });
  };

  const itemModal = () => {
    return (
      <ModalWrapper
        visible={visibleInvoiceItem}
        onPress={() => closeModal()}
        setVisible={setVisibleInvoiceItem}>
        <View style={allProductsStyles.header}>
          <Image
            source={require('../../assets/images/Ehpl.png')}
            style={allProductsStyles.logo}
            resizeMode="contain"
          />
          <Text style={allProductsStyles.title}>
            EVEREST HARDWARE CO.(PVT) LTD.
          </Text>
        </View>
        <InvoiceCustomerInfo item="Date" value={selectItem?.data?.date} />
        <InvoiceCustomerInfo
          item="Place Order ID"
          value={`PO${selectItem?.data?.orderid}`}
        />
        <InvoiceCustomerInfo
          item="Customer Name"
          value={selectItem?.data?.customername}
        />

        <InvoiceCustomerInfo item="Address" value={selectItem?.data?.address} />
        <InvoiceCustomerInfo
          item="Remark"
          value={selectItem?.data?.remark ? selectItem.data.remark : 'N/A'}
        />
        {/* <InvoiceCustomerInfo item="Phone No" value={selectItem?.data?.phone} /> */}

        <View style={allProductsStyles.separator}></View>

        <View style={{paddingHorizontal: 16, marginTop: 5}}>
          <View style={allProductsStyles.tableHeader}>
            <Text style={allProductsStyles.columnHeader}>Item Name</Text>
            <Text style={allProductsStyles.columnHeader2}>Quantity</Text>
            <Text style={allProductsStyles.columnHeader3}>
              Sales Price (Rs.)
            </Text>
            <Text style={allProductsStyles.columnHeader3}>Net Total (Rs.)</Text>
          </View>
        </View>

        <FlatList
          data={selectItem?.detaildata}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={allProductsStyles.itemRow}>
              <Text style={[allProductsStyles.tableCell, {flex: 1}]}>
                {item.product_name}
              </Text>
              <Text style={[allProductsStyles.tableCell2, {flex: 1}]}>
                {item.orderqty}
              </Text>
              <Text style={[allProductsStyles.tableCell3, {flex: 1}]}>
                {parseFloat(item.saleprice)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
              <Text style={[allProductsStyles.tableCell3, {flex: 1}]}>
                {(parseFloat(item.orderqty) * parseFloat(item.saleprice))
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </Text>
            </View>
          )}
          contentContainerStyle={allProductsStyles.flatListContent}
        />

        <View style={[allProductsStyles.line]} />

        <View style={allProductsStyles.totalContainer}>
          <Text style={allProductsStyles.totalLabel}>Net Total(Rs.) : </Text>
          <Text style={allProductsStyles.totalAmount}>
            {/* {parseFloat(singleInvoice?.total)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} */}

            {formatAmount(getTotal())}
          </Text>
        </View>

        {/* <View style={allProductsStyles.totalContainer}>
            <Text style={allProductsStyles.totalLabel}>{'ddddd'}</Text>

            <Text style={allProductsStyles.totalAmount}>
              {parseFloat(singleInvoice?.taxamount)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              {'ddddd'}
            </Text>
          </View> */}

        {/* <View style={allProductsStyles.totalContainer}>
          <Text style={allProductsStyles.totalLabel}>Net Total(Rs.):</Text>
          <Text style={allProductsStyles.totalAmount}>
            {parseFloat(singleInvoice?.nettotal)
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {'ddddd'}
          </Text>
        </View> */}

        <View style={allProductsStyles.separator2}></View>
        <View style={{paddingHorizontal: 16}}>
          <Text style={allProductsStyles.thank}>Thank You!</Text>
        </View>
        <View style={{marginBottom: 10}}>
          {/* <ActionButton
            title="Close"
            onPress={closeModal}
            containerStyle={{marginTop: 10}}
          /> */}
        </View>
      </ModalWrapper>
    );
  };

  const renderItem = ({item}: any) => (
    <InvoiceCard
      poID={'PO' + item?.data?.orderid}
      orderDate={item?.data?.date}
      customerName={item?.data?.customername}
      orderStatus={getStatusText(item?.data?.status)}
      netTotal={parseFloat(item?.data?.nettotal)
        .toFixed(2)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      disabled={true}
      onPress={() => {
        setSelectItem(item);
        setVisibleInvoiceItem(true);
      }}
      remark={item?.data?.remark ? item.data.remark : 'N/A'}
    />
  );

  return (
    <SafeAreaView style={allProductsStyles.container}>
      <HeaderBar
        page={'All Orders'}
        isMenu={false}
        onPress={() => navigation.navigate('Home')}
      />
      {visibleInvoiceItem && itemModal()}

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
            borderRadius: 10,
            height: 50,
            width: '90%',
            alignSelf: 'center',
          }}
          inputStyle={{marginTop: -2}}
        />
      </View>

      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: -50,
          }}>
          <ActivityIndicator size="large" color="#FF4500" />
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 18,
              color: '#FF4500',
            }}>
            Loading Orders...
          </Text>
        </View>
      ) : filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          renderItem={renderItem}
          keyExtractor={item => item?.data?.orderid.toString()}
        />
      ) : (
        <Text style={allProductsStyles.noDetails}>No Orders to Show</Text>
      )}
    </SafeAreaView>
  );
};

export default AllOrdersScreen;
