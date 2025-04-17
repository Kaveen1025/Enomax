import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';
import MainStyles from '../../constant/MainStyles';
import invoiceCardStyles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface InvoiceCardProps {
  poID: string;
  orderDate: string;
  customerName: string;
  orderStatus: string;
  netTotal: string;
  remark?: string;
  borderColor?: string; // New Prop for Dynamic Border Color
  borderWidth?: number; // New prop for dynamic border width
  disabled: boolean;
  onPress?: () => void;
}

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  poID,
  orderDate,
  customerName,
  netTotal,
  orderStatus,
  remark,
  disabled,
  borderColor = MainStyles.COLORS.CHILI_PAPER, // Default Color
  borderWidth = 1, // Default border width
  onPress,
}) => {
  const labelStyle = {
    color: MainStyles.COLORS.CHILI_PAPER,
    fontWeight: 'bold',
    fontSize: 15,
    width: '39%',
  };
  return (
    <TouchableOpacity disabled={disabled}>
      <View style={[invoiceCardStyles.invoiceCard, {borderColor, borderWidth}]}>
        <View style={{flex: 0.8}}>
          <View style={invoiceCardStyles.labelContainer}>
            <Text style={labelStyle}>Place Order ID</Text>
            <View
              style={{width: '80%', flexDirection: 'row', flexWrap: 'nowrap'}}>
              <Text style={invoiceCardStyles.colon}>:</Text>
              <Text style={invoiceCardStyles.itemValue}>{poID}</Text>
            </View>
          </View>

          <View style={invoiceCardStyles.labelContainer}>
            <Text style={labelStyle}>Cusromer</Text>
            <View
              style={{width: '85%', flexDirection: 'row', flexWrap: 'nowrap'}}>
              <Text style={invoiceCardStyles.colon}>:</Text>
              <Text style={invoiceCardStyles.itemValue}>{customerName}</Text>
            </View>
          </View>

          <View style={invoiceCardStyles.labelContainer}>
            <Text style={labelStyle}>Order Date</Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={invoiceCardStyles.colon}>:</Text>
              <Text style={invoiceCardStyles.itemValue}>{orderDate}</Text>
            </View>
          </View>

          <View style={invoiceCardStyles.labelContainer}>
            <Text style={labelStyle}>Net Total (Rs.)</Text>
            <View
              style={{
                width: '73%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={invoiceCardStyles.colon}>:</Text>
              <Text style={invoiceCardStyles.itemValue}>{netTotal}</Text>
            </View>
          </View>

          <View style={invoiceCardStyles.labelContainer}>
            <Text style={labelStyle}>Confirm Status</Text>
            <View
              style={{
                width: '73%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={invoiceCardStyles.colon}>:</Text>
              <Text style={invoiceCardStyles.itemValue}>{orderStatus}</Text>
            </View>
          </View>

          <View style={invoiceCardStyles.labelContainer}>
            <Text style={labelStyle}>Remark</Text>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                flexWrap: 'nowrap',
              }}>
              <Text style={invoiceCardStyles.colon}>:</Text>
              <Text style={invoiceCardStyles.itemValue}>{remark}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={invoiceCardStyles.deleteIconContainer}
            onPress={onPress && onPress}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}>
            <Image
              source={require('../../assets/images/eye.png')}
              style={{width: 45, height: 45}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InvoiceCard;
