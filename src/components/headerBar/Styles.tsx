import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const headerBarstyle = StyleSheet.create({
  view1: {
    overflow: 'hidden',
    paddingBottom: 5,
    marginBottom: 10,
    backgroundColor: MainStyles.COLORS.CHILI_PAPER,
  },

  viewCard: {
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },

  icon2: {
    color: MainStyles.COLORS.WHITE,
    fontSize: 15,
    marginTop: 14,
    paddingHorizontal: 15,
  },

  view2: {
    flexDirection: 'row',
  },

  hrmsTxt: {
    marginTop: 10,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: MainStyles.COLORS.WHITE,
    fontStyle: 'italic',
  },

  iconStyle: {
    marginTop: 12,
    marginLeft: 15,
    marginRight: 15,
    height: 22,
    width: 22,
    resizeMode: 'contain',
    alignItems: 'center',
  },

  cartContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Adjust alignment as needed
    marginRight: 5,
  },
  cartIndicator: {
    position: 'absolute',
    top: 4,
    right: 5,

    borderRadius: 15, // Adjust the radius as needed
    paddingLeft: 3,
    paddingRight: 3, // Add padding as needed
    fontSize: 12, // Font size
    color: 'White', // Text color
  },

  cartText: {
    color: MainStyles.COLORS.WHITE,
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default headerBarstyle;
