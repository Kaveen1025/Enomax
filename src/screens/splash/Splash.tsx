import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View, Text, Image, Animated, LogBox} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import splashStyles from './Styles';
import {useDispatch} from 'react-redux';
import {endLoading, startLoading} from '../../redux/action/SpinnerAction';

const Splash = () => {
  const navigation = useNavigation();
  const moveOpacityVal = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(endLoading());
    moveOpacity();
  }, []);

  const moveOpacity = () => {
    LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    Animated.timing(moveOpacityVal, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      movetoHome();
    });
  };

  const movetoHome = async () => {
    dispatch(startLoading());
    const storedUser = await AsyncStorage.getItem('user');
    if (storedUser) {
      dispatch(endLoading());
      navigation.navigate('DrowerNavigation' as never);
    } else {
      dispatch(endLoading());
      navigation.navigate('Login' as never);
    }
  };

  return (
    <Animated.View style={[splashStyles.container, {opacity: moveOpacityVal}]}>
      <View style={splashStyles.logoView}>
        <Image
          source={require('../../assets/images/Ehpl.png')}
          style={splashStyles.image}
        />
        {/* <Text style={splashStyles.hrmsTxt}>Eco Technologies</Text> */}
      </View>
      <View style={splashStyles.poweredByView}>
        <Text style={splashStyles.poweredBy}>Powered By</Text>
        <Image
          source={require('../../assets/images/companyLogo.jpeg')}
          style={splashStyles.logo}
        />
      </View>
    </Animated.View>
  );
};

export default Splash;
