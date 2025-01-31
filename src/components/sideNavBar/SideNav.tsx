import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Avatar, Drawer, Title} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconM from 'react-native-vector-icons/MaterialIcons';
import MainStyles from '../../constant/MainStyles';
import drawerStyles from './Styles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';
import Spinner from '../spinner/Spinner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DrawerActions} from '@react-navigation/native';
import {endLoading, startLoading} from '../../redux/action/SpinnerAction';
import {useDispatch} from 'react-redux';

const CustomDraverContent = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('name');
        if (storedUser) {
          setUserName(storedUser);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, [userName]);

  const logout = async () => {
    dispatch(startLoading());
    await AsyncStorage.removeItem('selectedArea');
    await AsyncStorage.removeItem('selectedRef');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userType');
    await AsyncStorage.removeItem('empid');
    await AsyncStorage.removeItem('name');
    await AsyncStorage.removeItem('areaId');
    dispatch(endLoading());
    navigation.dispatch(DrawerActions.closeDrawer());
    navigation.navigate('Login' as never);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={drawerStyles.view1}>
          <View style={drawerStyles.view2}>
            <View style={drawerStyles.proPicView}>
              <Image
                style={drawerStyles.avatar}
                source={require('../../assets/images/Ehpl.png')}
              />
              <View style={drawerStyles.proDetails}>
                <Title style={drawerStyles.title}>
                  {' '}
                  <Title style={drawerStyles.title}>
                    {userName ? userName : 'EHPL ORDER NOW'}
                  </Title>
                </Title>
              </View>
            </View>
            <Spinner />
            {/* <DrawerItem
              style={drawerStyles.drawerItem}
              icon={({color, size}) => (
                <IconM
                  name={'logout'}
                  size={30}
                  color={MainStyles.COLORS.BLUE}
                />
              )}
              label="Ref Details"
              labelStyle={{
                color: MainStyles.COLORS.BLACK,
                fontSize: moderateScale(11),
                fontWeight: '600',
              }}
              onPress={navigateRefDetails}
            /> */}
            <Drawer.Section style={drawerStyles.drawerSection}>
              <DrawerItem
                style={drawerStyles.drawerItem}
                icon={({color, size}) => (
                  <IconM
                    name={'logout'}
                    size={30}
                    color={MainStyles.COLORS.CHILI_PAPER}
                  />
                )}
                label="Log Out"
                labelStyle={{
                  color: MainStyles.COLORS.BLACK,
                  fontSize: moderateScale(11),
                  fontWeight: '600',
                }}
                onPress={logout}
              />
            </Drawer.Section>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomDraverContent;
