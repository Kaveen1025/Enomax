import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MainStyles.COLORS.WHITE,
  },

  logoView: {
    flex: 1,
    backgroundColor: MainStyles.COLORS.CHILI_PAPER,
  },

  logoCircle: {
    marginTop: 60,
    backgroundColor: MainStyles.COLORS.CHILI_PAPER,
  },

  image: {
    width: 180,
    height: 180,
    borderWidth: 1,
    backgroundColor: MainStyles.COLORS.WHITE,
    borderRadius: 100,
    marginBottom: 20,
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  welcomeView: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -34,
    backgroundColor: MainStyles.COLORS.WHITE,
    borderTopLeftRadius: 42,
  },

  welcomeTxt: {
    fontSize: moderateScale(35),
    fontWeight: 'bold',
    marginTop: -10,
    alignSelf: 'center',
    color: MainStyles.COLORS.WHITE,
  },

  welcomeTxt2: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginTop: 10,
    color: MainStyles.COLORS.WHITE,
    fontStyle: 'italic',
    marginBottom: 25,
    alignSelf: 'center',
  },

  loginTxt: {
    fontSize: moderateScale(25),
    fontWeight: 'bold',
    color: MainStyles.COLORS.CHILI_PAPER,
    marginTop: verticalScale(10),
  },

  inputStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: MainStyles.COLORS.CHILI_PAPER,
    borderRadius: 10,
    marginBottom: 15,
    marginTop: 10,
    height: 50,
    width: '80%',
  },

  txtInput: {
    flex: 1,
    alignItems: 'center',
    height: 50,
    fontSize: 12,
    color: MainStyles.COLORS.BLACK,
  },

  imageStyle: {
    padding: 10,
    margin: 5,
    height: 20,
    width: 20,
    resizeMode: 'contain',
    alignItems: 'center',
  },

  imageIcon: {
    height: 18,
    width: 18,
    marginRight: horizontalScale(8),
  },

  forgotView: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },

  buttonView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 20,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    elevation: 3,
    width: 160,
    backgroundColor: MainStyles.COLORS.CHILI_PAPER,
  },
  text: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: MainStyles.COLORS.WHITE,
  },

  createAccount: {
    marginTop: 18,
    alignItems: 'center',
  },
  account: {
    fontSize: 14,
    color: '#333',
  },
  signup: {
    fontSize: 15,
    fontWeight: 'bold',
    color: MainStyles.COLORS.CHILI_PAPER, // Blue color for the signup link
  },

  area: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    color: MainStyles.COLORS.CHILI_PAPER,
  },

  abstractBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 20, // Adjust the height to control the size of the abstract shape
    backgroundColor: MainStyles.COLORS.CHILI_PAPER,
    zIndex: -1, // Ensure the abstract shape is behind the other content
  },
});

export default loginStyles;
