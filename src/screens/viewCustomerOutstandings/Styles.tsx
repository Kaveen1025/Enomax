import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const customerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainStyles.COLORS.WHITE,
  },

  gridView: {
    marginTop: 10,
    flex: 1,
  },

  itemContainer: {
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: MainStyles.COLORS.WHITE,
    borderColor: MainStyles.COLORS.CHILI_PAPER,
    padding: 10,
    minHeight: 190,
  },

  shadowProp: {
    elevation: 5,
    shadowColor: '#52006A',
  },

  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },

  itemName: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: MainStyles.COLORS.DARK_BLUE,
    fontWeight: 'bold',
  },

  address: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 12,
    color: MainStyles.COLORS.CHILI_PAPER,
    fontWeight: 'bold',
    marginTop: 15,
  },

  imageStyle: {
    width: 300,
    height: 220,
    resizeMode: 'contain',
  },

  imageView: {
    alignItems: 'center',
    alignSelf: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    marginTop: 50,
    width: 150,
    height: 140,
    marginBottom: 35,
  },

  title: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginTop: 25,
    fontWeight: 'bold',
    color: MainStyles.COLORS.CHILI_PAPER,
  },

  noDetails: {
    marginTop: verticalScale(25),
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: MainStyles.COLORS.RED,
  },

  area: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: MainStyles.COLORS.CHILI_PAPER,
  },

  outstandingValue: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    color: MainStyles.COLORS.BLACK,
    marginTop: 5,
    fontWeight: 'bold',
  },

  outstanding: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: MainStyles.COLORS.BLACK,
    fontWeight: 'bold',
    marginTop: 15,
  },

  dot: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 13,
    color: MainStyles.COLORS.BLACK,
    fontWeight: 'bold',
    marginTop: -5,
  },
});

export default customerStyles;
