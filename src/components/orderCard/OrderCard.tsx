import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';
import MainStyles from '../../constant/MainStyles';
import orderCardStyles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome5';

interface OrderCardProps {
  itemName: string;
  code?: string;
  price: number;
  availableQty?: number;
  orderQty?: number;
  onPress?: () => void;
  deleteIcon: boolean;
  disabled: boolean;
  isAvailable?: boolean;
  onPressDelete?: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  itemName,
  code,
  price,
  availableQty,
  orderQty,
  onPress,
  deleteIcon = false,
  disabled = false,
  isAvailable,
  onPressDelete,
}) => {
  const labelStyle = {
    color: MainStyles.COLORS.CHILI_PAPER,
    fontWeight: 'bold',
    fontSize: 15,
    width: availableQty == undefined ? '40%' : '48%',
  };

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          orderCardStyles.orderCard,
          isAvailable && orderCardStyles.selectItem,
        ]}>
        <View style={{flex: 0.8}}>
          <View style={orderCardStyles.labelContainer}>
            <Text style={labelStyle}>Item Name</Text>
            <View
              style={{width: '80%', flexDirection: 'row', flexWrap: 'nowrap'}}>
              <Text style={orderCardStyles.colon}>:</Text>
              <Text style={orderCardStyles.itemValue}>{itemName}</Text>
            </View>
          </View>

          <View style={orderCardStyles.labelContainer}>
            <Text style={labelStyle}>Price(Rs.)</Text>
            <View
              style={{width: '50%', flexDirection: 'row', flexWrap: 'nowrap'}}>
              <Text style={orderCardStyles.colon}>:</Text>
              <Text style={orderCardStyles.itemValue}>{price}</Text>
            </View>
          </View>

          {availableQty !== undefined && (
            <View style={orderCardStyles.labelContainer}>
              <Text style={labelStyle}>Available Quantity</Text>
              <View
                style={{
                  width: '50%',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                }}>
                <Text style={orderCardStyles.colon}>:</Text>
                <Text style={orderCardStyles.itemValue}>{availableQty}</Text>
              </View>
            </View>
          )}

          {orderQty !== undefined && (
            <View style={orderCardStyles.labelContainer}>
              <Text style={labelStyle}>Order Quantity</Text>
              <View
                style={{
                  width: '73%',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                }}>
                <Text style={orderCardStyles.colon}>:</Text>
                <Text style={orderCardStyles.itemValue}>{orderQty}</Text>
              </View>
            </View>
          )}

          {deleteIcon && (
            <TouchableOpacity
              style={orderCardStyles.deleteIconContainer}
              onPress={() => {
                onPressDelete && onPressDelete();
              }}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Image
                source={require('../../assets/images/remove.png')}
                style={{width: 45, height: 45}}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
