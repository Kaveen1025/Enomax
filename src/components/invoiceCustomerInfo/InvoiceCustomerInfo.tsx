import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainStyles from '../../constant/MainStyles';

type props = {
  item: string;
  value: string;
};

const InvoiceCustomerInfo = ({item, value}: props) => {
  return (
    <View style={styles.itemModalLabelView}>
      <Text style={styles.itemModalLabel}>{item}</Text>
      <View style={styles.itemModalTextWrapper}>
        <Text style={styles.itemModalDetails}>:</Text>
        <View style={styles.itemModalDetailsView}>
          <Text style={styles.itemModalDetails}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

export default InvoiceCustomerInfo;

const styles = StyleSheet.create({
  itemModalMainView: {
    paddingHorizontal: 16,
    marginTop: -8,
    marginBottom: 20,
  },

  itemModalLabelView: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
  },

  itemModalDetailsView: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
  },

  itemModalDetails: {
    fontSize: 13,
    fontWeight: '800',
    marginRight: 10,
    color: MainStyles.COLORS.BLACK,
  },
  itemModalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: MainStyles.COLORS.BLACK,
    width: 105,
  },

  itemModalTextWrapper: {
    width: '69%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
});
