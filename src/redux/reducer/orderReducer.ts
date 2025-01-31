import {
  SET_ORDER_DATA,
  REMOVE_ALL_ORDER_DETAIL,
  REMOVE_SELECTED_ORDER,
} from '../../constant/ReduxConstant';
import {orderDataType} from '../../type';

const initialState: orderDataType = {
  orderData: [],
};

function orderDataReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_ORDER_DATA:
      // Check if the item already exists in the orderData
      const existingIndex = state.orderData.findIndex(
        order => order.productID === action.payload.productID,
      );

      if (existingIndex !== -1) {
        // Update the existing order's itemQty
        const updatedOrderData = [...state.orderData];
        updatedOrderData[existingIndex] = {
          ...updatedOrderData[existingIndex],
          itemQty: action.payload.itemQty,
        };
        return {
          ...state,
          orderData: updatedOrderData,
        };
      } else {
        // If the item doesn't exist, add it
        return {
          ...state,
          orderData: [...state.orderData, action.payload],
        };
      }

    case REMOVE_ALL_ORDER_DETAIL:
      return {
        ...state,
        orderData: [],
      };

    case REMOVE_SELECTED_ORDER:
      return {
        ...state,
        orderData: state.orderData.filter(order => order.id !== action.payload),
      };

    default:
      return state;
  }
}

export default orderDataReducer;
