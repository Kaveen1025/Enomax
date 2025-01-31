import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import headerBarstyle from './Styles';
import {useDispatch, useSelector} from 'react-redux';

interface IProps {
  isMenu: boolean;
  onPress?(): void;
  onClick?(): void;
  page: string;
}

const HeaderBar = ({isMenu, onPress, page}: IProps) => {
  const navigation = useNavigation();

  return (
    <View style={headerBarstyle.view1}>
      <View style={headerBarstyle.viewCard}>
        <View style={headerBarstyle.view2}>
          {isMenu ? (
            <TouchableOpacity onPress={onPress}>
              <Image
                source={require('../../assets/images/menu.png')}
                style={headerBarstyle.iconStyle}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={onPress}>
              <Icon name="chevron-left" style={headerBarstyle.icon2} />
            </TouchableOpacity>
          )}
          <Text style={headerBarstyle.hrmsTxt}>{page}</Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderBar;
