import {StyleSheet} from 'react-native';
import MainStyles from '../../constant/MainStyles';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../constant/Metrics';

const allProductsStyles = StyleSheet.create({
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
  sideHeaderTotal: {
    width: 70,
    height: 50,
    color: MainStyles.COLORS.CHILI_PAPER,
    margin: 10,
    textAlignVertical: 'center',
    fontWeight: 'bold',
  },
  totalText: {
    color: MainStyles.COLORS.BLACK,
    fontWeight: 'bold',
    fontSize: 20,
  },
  changeBackground: {
    backgroundColor: 'red',
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  columnHeader: {
    flex: 1,
    textAlign: 'left',
    marginVertical: 4,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },

  columnHeader2: {
    flex: 1,
    textAlign: 'center',
    marginVertical: 4,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },

  columnHeader3: {
    flex: 1,
    textAlign: 'right',
    marginVertical: 4,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 12,
  },

  tableCell1: {
    textAlign: 'left',
    marginVertical: 8,
    color: 'black',
  },

  tableCell: {
    textAlign: 'left',
    color: 'black',
  },

  tableCell2: {
    textAlign: 'center',
    color: 'black',
  },

  tableCell3: {
    textAlign: 'right',
    color: 'black',
  },

  flatListContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },

  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  details: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },

  separator: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 30,
  },

  separator2: {
    height: 1,
    backgroundColor: 'black',
    marginHorizontal: 16,
    marginBottom: 10,
    marginTop: 15,
  },

  itemsContainer: {
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -20,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4a100',
  },
  thank: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
  },

  address: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
    color: 'black',
  },

  ansen: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    color: 'black',
  },

  copyrights: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 15,
    color: 'black',
    marginBottom: 20,
  },

  tableHeader1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  columnHeader1: {
    flex: 6,
    fontWeight: 'bold',
    color: 'black',
  },

  line: {
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: 10,
    borderStyle: 'dashed',
    width: '90%',
    alignSelf: 'center',
  },

  detailLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: MainStyles.COLORS.BLACK,
    width: 120,
    marginBottom: 10,
  },

  detail: {
    fontSize: 15,
    fontWeight: '800',
    color: MainStyles.COLORS.BLACK,
  },

  detailView: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
    marginLeft: 10,
  },

  detailView2: {
    width: '60%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  detailLabelView: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'flex-start',
  },

  paymentSummery: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: -12,
    color: MainStyles.COLORS.BLACK,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },

  topic: {
    color: MainStyles.COLORS.CHILI_PAPER,
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 15,
    textDecorationLine: 'underline',
  },

  modalContainer: {
    backgroundColor: MainStyles.COLORS.WHITE,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 10,
    maxHeight: 600,
  },

  dottedLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderStyle: 'dotted',
    marginVertical: 10,
  },

  chequeTitle: {
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 5,
    color: 'black',
  },

  noDataMessage: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'red',
  },

  noInvoices: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    marginTop: '55%',
  },

  noItems: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 20,
    color: 'red',
    fontWeight: 'bold',
  },

  summaryView: {
    paddingHorizontal: 16,
    marginTop: 2,
    marginBottom: 20,
  },

  itemModalMainView: {
    paddingHorizontal: 16,
    marginTop: -8,
    marginBottom: 20,
  },

  itemModalLabelView: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'flex-start',
  },

  itemModalDetailsView: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
  },

  itemModalDetails: {
    fontSize: 13,
    fontWeight: '800',
    color: MainStyles.COLORS.BLACK,
  },

  itemModalLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: MainStyles.COLORS.BLACK,
    width: 105,
  },

  itemModalTextWrapper: {
    width: '69%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  itemModalNoItems: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
});

export default allProductsStyles;
