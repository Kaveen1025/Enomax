import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const refDetailsstyle = StyleSheet.create({
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
    borderColor: MainStyles.COLORS.DARK_BLUE,
    padding: 10,
    height: 180,
  },

  shadowProp: {
    elevation: 5,
    shadowColor: '#52006A',
  },

  itemName: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 15,
    color: MainStyles.COLORS.DARK_BLUE,
    fontWeight: 'bold',
  },

  noDetails: {
    marginTop: verticalScale(25),
    justifyContent: 'center',
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: MainStyles.COLORS.RED,
  },

  ref: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: MainStyles.COLORS.DARK_GREEN,
  },

  area: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: MainStyles.COLORS.DARK_GREEN,
  },

  buttonView: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
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
    backgroundColor: MainStyles.COLORS.DARK_GREEN,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: MainStyles.COLORS.WHITE,
  },
});

export default refDetailsstyle;
