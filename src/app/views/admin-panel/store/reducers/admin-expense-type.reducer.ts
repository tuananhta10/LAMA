import { 
	ExpenseTypeAction,
	ExpenseTypeActionTypes
	
} from '../actions/admin-expense-type.action';

// Create new interface for reducer
export interface ExpenseTypeState {
	expenseType: any;
    expenseTypeList: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const EXPENSE_TYPE_INITIAL_STATE: ExpenseTypeState = {
	expenseType: {},
    expenseTypeList: [],
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from ExpenseType 
	@param 
		state: value (expenseType, pending, error)
		action: from action type
*/
export const ExpenseTypeReducer = (
	state: ExpenseTypeState = EXPENSE_TYPE_INITIAL_STATE,
	action: ExpenseTypeAction,
	): ExpenseTypeState => {
		switch (action.type){

			case ExpenseTypeActionTypes.GET_EXPENSE_TYPE:
			return { ...state, pending: true };

			case ExpenseTypeActionTypes.GET_EXPENSE_TYPE_SUCCESS:
			return { ...state, expenseType: action.payload, pending: false }

			case ExpenseTypeActionTypes.GET_EXPENSE_TYPE_FAIL:
			return { ...state, pending: false, error: action.payload }

            case ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST:
            return { ...state, pending: true };

            case ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_SUCCESS:
            return { ...state, expenseTypeList: action.payload, pending: false }

            case ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE:
			return { ...state, pending: true };

			case ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_FAIL:
			return { ...state, pending: false, error: action.payload }

			case ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE:
			return { ...state, pending: true };

			case ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	
