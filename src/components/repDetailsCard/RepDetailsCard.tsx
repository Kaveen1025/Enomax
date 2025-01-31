import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';
import MainStyles from '../../constant/MainStyles';

import Icon from 'react-native-vector-icons/FontAwesome5';
import repDetailsCardStyles from './Styles';

interface RepDetailsCardProps {
  name: string;
  phone: string;
  address: string;
  outstandingcount: string;
  totaloutstanding: string;
  totalpayed?: string;
  disabled: boolean;
  onPress?: () => void;
}

const RepDetailsCard: React.FC<RepDetailsCardProps> = ({
  name = '',
  phone = '',
  address = '',
  outstandingcount = 0,
  totaloutstanding = 0,
  totalpayed = 0,
  disabled,
  onPress,
}) => {
  const labelStyle = {
    color: MainStyles.COLORS.CHILI_PAPER,
    fontWeight: 'bold',
    fontSize: 15,
    width: '49%',
  };
  return (
    <TouchableOpacity disabled={disabled}>
      <View style={[repDetailsCardStyles.invoiceCard]}>
        <View style={{flex: 0.8}}>
          <View style={repDetailsCardStyles.labelContainer}>
            <Text style={labelStyle}>Sales Rep Name</Text>
            <View
              style={{width: '80%', flexDirection: 'row', flexWrap: 'nowrap'}}>
              <Text style={repDetailsCardStyles.colon}>:</Text>
              <Text style={repDetailsCardStyles.itemValue}>{name}</Text>
            </View>
          </View>

          <View style={repDetailsCardStyles.labelContainer}>
            <Text style={labelStyle}>Contact Number</Text>
            <View
              style={{width: '85%', flexDirection: 'row', flexWrap: 'nowrap'}}>
              <Text style={repDetailsCardStyles.colon}>:</Text>
              <Text style={repDetailsCardStyles.itemValue}>{phone}</Text>
            </View>
          </View>

          <View style={repDetailsCardStyles.labelContainer}>
            <Text style={labelStyle}>Address</Text>
            <View
              style={{
                width: '75%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={repDetailsCardStyles.colon}>:</Text>
              <Text style={repDetailsCardStyles.itemValue}>{address}</Text>
            </View>
          </View>

          <View style={repDetailsCardStyles.labelContainer}>
            <Text style={labelStyle}>Outstanding Count</Text>
            <View
              style={{
                width: '73%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={repDetailsCardStyles.colon}>:</Text>
              <Text style={repDetailsCardStyles.itemValue}>
                {outstandingcount}
              </Text>
            </View>
          </View>

          <View style={repDetailsCardStyles.labelContainer}>
            <Text style={labelStyle}>Total Outstanding</Text>
            <View
              style={{
                width: '73%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={repDetailsCardStyles.colon}>:</Text>
              <Text style={repDetailsCardStyles.itemValue}>
                {totaloutstanding}
              </Text>
            </View>
          </View>

          <View style={repDetailsCardStyles.labelContainer}>
            <Text style={labelStyle}>Total Payed</Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={repDetailsCardStyles.colon}>:</Text>
              <Text style={repDetailsCardStyles.itemValue}>{totalpayed}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RepDetailsCard;
