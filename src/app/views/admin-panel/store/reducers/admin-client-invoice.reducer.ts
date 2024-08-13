import {
    ClientInvoiceAction,
    ClientInvoiceActionTypes
  
  } from '../actions/admin-client-invoice.action';
  
  // Create new interface for reducer
  export interface ClientInvoiceState {
    clientInvoice: any;
    clientInvoiceList: any;
    clientInvoiceItems: any;
    clientInvoiceReferrence: any;
    pending: any;
    pendingInvoice: boolean,
    pendingInvoiceItem: any,
    error: any;
    success: any;
  }
  
  // Set initial state of the data
  export const CLIENT_INVOICE_INITIAL_STATE: ClientInvoiceState = {
    clientInvoice: {},
    clientInvoiceList: [],
    clientInvoiceItems: [],
    clientInvoiceReferrence: [],
    pending: false,
    pendingInvoice: false,
    pendingInvoiceItem: false,
    error: null,
    success: null
  }
  
  
  /*
    Create Reducer
    Take 2 Parameter: from ClientInvoice
    @param
      state: value (clientInvoice, pending, error)
      action: from action type
  */
  export const ClientInvoiceReducer = (
    state: ClientInvoiceState = CLIENT_INVOICE_INITIAL_STATE,
    action: ClientInvoiceAction,
  ): ClientInvoiceState => {
    switch (action.type) {
    
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE:
        return { ...state, pendingInvoiceItem: true, clientInvoiceItems: [] };
  
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_SUCCESS:
        return { ...state, clientInvoiceItems: action.payload, pendingInvoiceItem: false, pending:false }
  
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_FAIL:
        return { ...state, pendingInvoiceItem: false, error: action.payload,pending:false  }

      // referrence invoice

      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE:
        return { ...state, pendingInvoice: true, clientInvoiceReferrence: [] };
      
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE_SUCCESS:
        return { ...state, clientInvoiceReferrence: action.payload, pendingInvoice: false }
      
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_REFERRENCE_FAIL:
        return { ...state, pendingInvoice: false, error: action.payload }
  
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST:
        return { ...state, pending: true };
  
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST_SUCCESS:
        return { ...state, clientInvoiceList: action.payload, pending: false }
  
      case ClientInvoiceActionTypes.GET_CLIENT_INVOICE_LIST_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE:
        return { ...state, pending: true };
  
      case ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientInvoiceActionTypes.SAVE_CLIENT_INVOICE_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE:
        return { ...state, pending: true };
  
      case ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE_SUCCESS:
        return { ...state, success: action.payload.message, pending: false }
  
      case ClientInvoiceActionTypes.EDIT_CLIENT_INVOICE_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      case ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE:
        return { ...state, pending: true };
  
      case ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_SUCCESS:
        return { ...state, success: action?.payload?.message, pending: false }
  
      case ClientInvoiceActionTypes.DELETE_CLIENT_INVOICE_FAIL:
        return { ...state, pending: false, error: action.payload }
  
      default:
        return state;
    }
  }
  
  