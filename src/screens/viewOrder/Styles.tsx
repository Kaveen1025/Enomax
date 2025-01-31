import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const viewOrderStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainStyles.COLORS.WHITE,
  },

  noDetails: {
    marginTop: verticalScale(25),
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: MainStyles.COLORS.RED,
  },

  amount: {
    padding: 15,
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    paddingHorizontal: 32,
    borderRadius: 10,
    height: 45,
    elevation: 3,
    width: '50%',
    backgroundColor: MainStyles.COLORS.CHILI_PAPER,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: MainStyles.COLORS.WHITE,
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },

  input: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    paddingLeft: 10,
    borderRadius: 10,
    color: 'black',
  },
});

export default viewOrderStyles;
