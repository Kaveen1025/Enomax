import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const orderDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainStyles.COLORS.WHITE,
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
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

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 45,
    width: 260,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    color: MainStyles.COLORS.BLACK,
  },

  details: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: MainStyles.COLORS.CHILI_PAPER,
  },

  subDetails: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'left',
    color: MainStyles.COLORS.BLACK,
  },

  noDetails: {
    marginTop: verticalScale(25),
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: MainStyles.COLORS.RED,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  label: {
    color: MainStyles.COLORS.CHILI_PAPER,
    fontWeight: 'bold',
    fontSize: 15,
    width: '44%',
  },
  value: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: MainStyles.COLORS.BLACK,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 15,
  },

  itemValue: {
    color: MainStyles.COLORS.BLACK,
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
    flexShrink: 1,
    marginRight: 20,
  },
});

export default orderDetailStyles;
