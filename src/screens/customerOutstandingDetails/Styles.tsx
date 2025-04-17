import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const styles = StyleSheet.create({
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

  loader: {
    marginTop: '60%',
  },

  outTot: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: MainStyles.COLORS.BROWN,
    marginBottom: 10,
  },
});

export default styles;
