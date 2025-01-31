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
import allProductsStyles from './Styles';
import HeaderBar from '../../components/headerBar/HeaderBar';
import OrderCard from '../../components/orderCard/OrderCard';
import Navigation from '../../navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {ReduxState} from '../../type';
import {Searchbar} from 'react-native-paper';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';

const AllProductsScreen = ({route, navigation}: any) => {
  const {productData} = useSelector((state: ReduxState) => state?.loadData);

  const [searchQuery, setSearchQuery] = React.useState('');
  console.log('Product Data:', productData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // Loading state

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(startLoading());
    dispatch(setSpinnerMessage('Loading Products...'));
    const filtered = productData.filter(
      products =>
        products.product_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        products.productcode.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
    dispatch(endLoading());
    setLoading(false);
  }, [searchQuery, productData]);

  const renderItem = ({item}: any) => (
    <OrderCard
      itemName={item.product_name}
      code={item.productcode}
      price={item.saleprice}
      availableQty={item.qty ?? '0'}
      deleteIcon={false}
      disabled={true}
    />
  );

  return (
    <SafeAreaView style={allProductsStyles.container}>
      <HeaderBar
        page={'All Products'}
        isMenu={false}
        onPress={() => navigation.navigate('Home')}
      />

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
            Loading Products...
          </Text>
        </View>
      ) : filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <Text style={allProductsStyles.noDetails}>No Products to Show</Text>
      )}
    </SafeAreaView>
  );
};

export default AllProductsScreen;
