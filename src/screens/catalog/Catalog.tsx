import {DrawerActions, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import catalogCategoriesStyles from './Styles';
import {FlatGrid} from 'react-native-super-grid';
import Spinner from '../../components/spinner/Spinner';
import {useDispatch, useSelector} from 'react-redux';
import {
  endLoading,
  setSpinnerMessage,
  startLoading,
} from '../../redux/action/SpinnerAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import HeaderBar from '../../components/headerBar/HeaderBar';
import NetInfo from '@react-native-community/netinfo';
import {ReduxState} from '../../type';
import {getCatalog} from '../../service/api';
import {setCatalogCategories} from '../../redux/action/loadDataActions';
import {Searchbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CatalogCategoriesScreen = ({route}: any) => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredCategories, setFilteredCategories] = useState([]);
  const dispatch = useDispatch();
  const {catalog} = useSelector((state: ReduxState) => state?.loadData);

  useEffect(() => {
    console.log('Route params Catalog:', route.params); // Debug: Log route parameters
    console.log('Representative ID:', route.params.repID);
    if (route.params) {
      getAllCatalog();
    } else {
      Alert.alert('Missing parameters');
    }
  }, [route.params]);

  useEffect(() => {
    const filtered = catalog.filter(catalog =>
      catalog.category.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredCategories(filtered);
  }, [searchQuery, catalog]);

  const getAllCatalog = async () => {
    dispatch(setSpinnerMessage('Loading Catalog Categories...'));
    dispatch(startLoading());
    // Check network status
    const networkState = await NetInfo.fetch();
    try {
      if (networkState.isConnected) {
        getCatalog()
          .then(res => {
            dispatch(setCatalogCategories(res.data));
          })
          .catch(err => {
            console.log(err);
          });
        dispatch(endLoading());
      } else {
        // No cached data and offline, show an appropriate message to the user
        dispatch(endLoading());
        Alert.alert('No internet connection, and no cached data available.');
      }
    } catch (error) {
      dispatch(endLoading());
      Alert.alert('Something went wrong... Try again later');
    }
  };

  return (
    <SafeAreaView style={catalogCategoriesStyles.container}>
      <HeaderBar
        isMenu={false}
        page="Catalog Categories"
        onPress={() => navigation.navigate('Home' as never)}
      />
      <Spinner />

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

      {filteredCategories.length > 0 ? (
        <FlatGrid
          itemDimension={150}
          data={filteredCategories}
          style={catalogCategoriesStyles.gridView}
          spacing={10}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={[
                catalogCategoriesStyles.itemContainer,
                catalogCategoriesStyles.shadowProp,
              ]}
              onPress={async () => {
                // Check if route.params is undefined
                const storedAreaId = await AsyncStorage.getItem('areaId');
                if (route.params) {
                  navigation.navigate(
                    'OrderScreen' as never,
                    {
                      hardwareItem: item?.id,
                      cName: item?.category,
                      customerID: route.params.customerID,
                      areaID: storedAreaId,
                      repID: route.params.repID,
                    } as never,
                  );
                } else {
                  Alert.alert('Missing parameters');
                }
              }}>
              <Text style={catalogCategoriesStyles.itemName}>
                {item?.category || 'N/A'}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={catalogCategoriesStyles.noRequests}>
          No catalog to show
        </Text>
      )}
    </SafeAreaView>
  );
};

export default CatalogCategoriesScreen;
