import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const orderCardStyles = StyleSheet.create({
  orderCard: {
    flexDirection: 'row',
    backgroundColor: MainStyles.COLORS.WHITE,
    borderColor: MainStyles.COLORS.CHILI_PAPER,
    borderWidth: 1,
    width: '90%',
    padding: 12,
    elevation: 5,
    marginTop: 15,
    paddingBottom: 25,
    marginBottom: 5,
    alignSelf: 'center',
    borderRadius: 10,
  },
  selectItem: {
    backgroundColor: MainStyles.COLORS.DARK_GREY,
  },
  coloumn: {
    flexDirection: 'row',
    width: '100%',
  },

  orderCardView1: {
    flex: 1,
    flexDirection: 'row',
  },

  labelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  label: {
    color: MainStyles.COLORS.CHILI_PAPER,
    fontWeight: 'bold',
    fontSize: 15,
    width: '46%',
  },
  itemValue: {
    color: MainStyles.COLORS.BLACK,
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 5,
    flexShrink: 1,
  },

  deleteIconContainer: {
    position: 'absolute',
    right: 20,
    top: '40%',
    left: '105%',
  },

  colon: {
    fontWeight: 'bold',
    fontSize: 14,
    color: MainStyles.COLORS.CHILI_PAPER,
  },
});

export default orderCardStyles;
