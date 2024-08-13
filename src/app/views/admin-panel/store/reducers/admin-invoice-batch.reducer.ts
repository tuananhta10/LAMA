import {
  InvoiceBatchAction,
  InvoiceBatchActionTypes

} from '../actions/admin-invoice-batch.action';

// Create new interface for reducer
export interface InvoiceBatchState {
  invoiceBatch: any;
  invoiceBatchList: any;
  pending: any;
  error: any;
  success: any;
}

// Set initial state of the data
export const INVOICE_BATCH_INITIAL_STATE: InvoiceBatchState = {
  invoiceBatch: {},
  invoiceBatchList: [],
  pending: false,
  error: null,
  success: null
}


/*
  Create Reducer
  Take 2 Parameter: from InvoiceBatch
  @param
    state: value (invoiceBatch, pending, error)
    action: from action type
*/
export const InvoiceBatchReducer = (
  state: InvoiceBatchState = INVOICE_BATCH_INITIAL_STATE,
  action: InvoiceBatchAction,
): InvoiceBatchState => {
  switch (action.type) {

    case InvoiceBatchActionTypes.GET_INVOICE_BATCH:
      return { ...state, pending: true };

    case InvoiceBatchActionTypes.GET_INVOICE_BATCH_SUCCESS:
      return { ...state, invoiceBatch: action.payload, pending: false }

    case InvoiceBatchActionTypes.GET_INVOICE_BATCH_FAIL:
      return { ...state, pending: false, error: action.payload }

    case InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST:
      return { ...state, pending: true };

    case InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST_SUCCESS:
      return { ...state, invoiceBatchList: action.payload, pending: false }

    case InvoiceBatchActionTypes.GET_INVOICE_BATCH_LIST_FAIL:
      return { ...state, pending: false, error: action.payload }

    case InvoiceBatchActionTypes.SAVE_INVOICE_BATCH:
      return { ...state, pending: true };

    case InvoiceBatchActionTypes.SAVE_INVOICE_BATCH_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case InvoiceBatchActionTypes.SAVE_INVOICE_BATCH_FAIL:
      return { ...state, pending: false, error: action.payload }

    case InvoiceBatchActionTypes.EDIT_INVOICE_BATCH:
      return { ...state, pending: true };

    case InvoiceBatchActionTypes.EDIT_INVOICE_BATCH_SUCCESS:
      return { ...state, success: action.payload.message, pending: false }

    case InvoiceBatchActionTypes.EDIT_INVOICE_BATCH_FAIL:
      return { ...state, pending: false, error: action.payload }

    case InvoiceBatchActionTypes.DELETE_INVOICE_BATCH:
      return { ...state, pending: true };

    case InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_SUCCESS:
      return { ...state, success: action?.payload?.message, pending: false }

    case InvoiceBatchActionTypes.DELETE_INVOICE_BATCH_FAIL:
      return { ...state, pending: false, error: action?.payload }

    default:
      return state;
  }
}

