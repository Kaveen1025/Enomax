import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card} from 'react-native-paper';
import CustomIcon from '../customIcon';

interface SummaryCardProps {
  monthlyTotal: string;
  dailyTotal: string;
  outstandingTotal: string;
  date: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  monthlyTotal,
  dailyTotal,
  outstandingTotal,
  date,
}) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'calendar-alt'}
            size={18}
            color="#666"
          />

          <Text style={styles.date}>{date}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'coins'}
            size={20}
            color="#28B463"
          />

          <Text style={styles.label}>Today Total (Rs.)</Text>
          <Text style={styles.value}>{dailyTotal}</Text>
        </View>

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'money-bill-wave'}
            size={20}
            color="#2E86C1"
          />

          <Text style={styles.label}>Monthly Total (Rs.)</Text>
          <Text style={styles.value}>{monthlyTotal}</Text>
        </View>

        <View style={styles.infoRow}>
          <CustomIcon
            type={'FontAwesome5'}
            icon={'exclamation-circle'}
            size={20}
            color="#E74C3C"
          />
          <Text style={styles.label}>Total Outstanding (Rs.)</Text>
          <Text style={[styles.value, styles.outstanding]}>
            {outstandingTotal}
          </Text>
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

export default SummaryCard;
