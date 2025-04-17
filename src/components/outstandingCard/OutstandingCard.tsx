import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import CustomIcon from '../customIcon';
import MainStyles from '../../constant/MainStyles';

interface OutstandingCardProps {
  invoiceNo: string;
  fullTotal: string;
  paidAmount: string;
  date: string;
  borderColor?: string; // New Prop for Dynamic Border Color
  borderWidth?: number; // New prop for dynamic border width
  balance: string;
  daysDiff?: number
}

const OutstandingCard: React.FC<OutstandingCardProps> = ({
  invoiceNo,
  fullTotal,
  paidAmount,
  date,
  borderColor = MainStyles.COLORS.LIGHT_GREY, // Default Color,
  borderWidth = 1, // Default border width
  balance,
  daysDiff
}) => {
  return (
    <Card style={[styles.card, {borderColor, borderWidth}]}>
      <Card.Content>
        <View style={styles.row}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'file-invoice'}
            size={20}
            color="#666"
          />

          <Text style={styles.date}>{invoiceNo}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'calendar-alt'}
            size={20}
            color="#FF4500"
          />

          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{date}</Text>
        </View>

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'hourglass-half'}
            size={20}
            color="#964B00"
          />

          <Text style={styles.label}>Days Since Order</Text>
          <Text style={styles.value}>{daysDiff}</Text>
        </View>

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'coins'}
            size={18}
            color="#28B463"
          />

          <Text style={styles.label}>Total Outstanding(Rs.)</Text>
          <Text style={styles.value}>{fullTotal}</Text>
        </View>

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'money-bill-wave'}
            size={18}
            color="#2E86C1"
          />

          <Text style={styles.label}>Paid Amount (Rs.)</Text>
          <Text style={styles.value}>{paidAmount}</Text>
        </View>

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'exclamation-circle'}
            size={20}
            color="#E74C3C"
          />
          <Text style={styles.label}>Balance (Rs.)</Text>
          <Text style={[styles.value, styles.outstanding]}>{balance}</Text>
        </View>

        
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 15,
    borderRadius: 10,
    elevation: 5, // Adds shadow (Android)
    shadowColor: '#000', // iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  date: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    marginLeft: 10,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  outstanding: {
    color: '#E74C3C',
  },
});

export default OutstandingCard;
