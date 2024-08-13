import { 
	InvoiceAction,
	InvoiceActionTypes
	
} from '../actions/admin-invoice.action';

// Create new interface for reducer
export interface InvoiceState {
	invoice: any;
	invoiceItems: any[],
    invoiceList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const INVOICE_INITIAL_STATE: InvoiceState = {
	invoice: {},
	invoiceItems: [],
    invoiceList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Invoice 
	@param 
		state: value (invoice, pending, error)
		action: from action type
*/
export const InvoiceReducer = (
	state: InvoiceState = INVOICE_INITIAL_STATE,
	action: InvoiceAction,
	): InvoiceState => {
		switch (action.type){

			case InvoiceActionTypes.GET_INVOICE:
			return { ...state, pending: true, invoiceItems: [] };

			case InvoiceActionTypes.GET_INVOICE_SUCCESS:
			return { ...state, invoiceItems: action.payload, pending: false }

			case InvoiceActionTypes.GET_INVOICE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case InvoiceActionTypes.GET_INVOICE_LIST:
            return { ...state, pending: true };

            case InvoiceActionTypes.GET_INVOICE_LIST_SUCCESS:
            return { ...state, invoiceList: action.payload, pending: false }

            case InvoiceActionTypes.GET_INVOICE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case InvoiceActionTypes.SAVE_INVOICE:
			return { ...state, pending: true };

			case InvoiceActionTypes.SAVE_INVOICE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case InvoiceActionTypes.SAVE_INVOICE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case InvoiceActionTypes.EDIT_INVOICE:
			return { ...state, pending: true };

			case InvoiceActionTypes.EDIT_INVOICE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case InvoiceActionTypes.EDIT_INVOICE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case InvoiceActionTypes.DELETE_INVOICE:
			return { ...state, pending: true };

			case InvoiceActionTypes.DELETE_INVOICE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case InvoiceActionTypes.DELETE_INVOICE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	
