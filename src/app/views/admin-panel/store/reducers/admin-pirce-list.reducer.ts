import { 
	PriceListAction,
	PriceListActionTypes
	
} from '../actions/admin-price-list.action';

// Create new interface for reducer
export interface PriceListState {
	priceList: any;
    priceListList: any;
	priceListUpload:any;
	pending: any;
	pendingInline: any;
	error: any;
	success: any;
	successInline: any;
}

// Set initial state of the data
export const PRICE_LIST_INITIAL_STATE: PriceListState = {
	priceList: {},
    priceListList: [],
	priceListUpload: null,
	pending: false,
	pendingInline: false,
	error: null,
	success: null,
	successInline: null
}


/*
	Create Reducer
	Take 2 Parameter: from PriceList 
	@param 
		state: value (priceList, pending, error)
		action: from action type
*/
export const PriceListReducer = (
	state: PriceListState = PRICE_LIST_INITIAL_STATE,
	action: PriceListAction,
	): PriceListState => {
		switch (action.type){

			case PriceListActionTypes.GET_PRICE_LIST:
			return { ...state, pending: true };

			case PriceListActionTypes.GET_PRICE_LIST_SUCCESS:
			return { ...state, priceList: action.payload, pending: false }

			case PriceListActionTypes.GET_PRICE_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

            case PriceListActionTypes.GET_PRICE_LIST_LIST:
            return { ...state, pending: true };

            case PriceListActionTypes.GET_PRICE_LIST_LIST_SUCCESS:
            return { ...state, priceListList: action.payload, pending: false }

            case PriceListActionTypes.GET_PRICE_LIST_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case PriceListActionTypes.SAVE_PRICE_LIST:
			return { ...state, pending: true };

			case PriceListActionTypes.SAVE_PRICE_LIST_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case PriceListActionTypes.SAVE_PRICE_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

			case PriceListActionTypes.EDIT_PRICE_LIST:
			return { ...state, pending: true };

			case PriceListActionTypes.EDIT_PRICE_LIST_SUCCESS:
			return { ...state, success: action.payload, pending: false }

			case PriceListActionTypes.EDIT_PRICE_LIST_FAIL:
			return { ...state, pending: false, error: action.payload }

			/*FOR INLINE*/
			case PriceListActionTypes.EDIT_PRICE_LIST_INLINE:
			return { ...state, pendingInline: true };

			case PriceListActionTypes.EDIT_PRICE_LIST_INLINE_SUCCESS:
			return { ...state, successInline: action.payload, pendingInline: false }

			case PriceListActionTypes.EDIT_PRICE_LIST_INLINE_FAIL:
			return { ...state, pendingInline: false, error: action.payload }

			case PriceListActionTypes.UPLOAD_PRICE_LIST:
			return { ...state, pending: true };

			case PriceListActionTypes.UPLOAD_PRICE_LIST_SUCCESS:
			return { ...state, pending: false, priceListUpload: action.payload }

			case PriceListActionTypes.UPLOAD_PRICE_LIST_FAIL:
			return { ...state, pending: false }

			default:
			return state;
		}
	}
	
