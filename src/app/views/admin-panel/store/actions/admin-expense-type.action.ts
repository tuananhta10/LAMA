import { Action } from '@ngrx/store';

/* FOR EXPENSE_TYPE  
*/
export const enum ExpenseTypeActionTypes {
	GET_EXPENSE_TYPE = '[ExpenseType] Get ExpenseType', 
	GET_EXPENSE_TYPE_SUCCESS = '[ExpenseType] Get ExpenseType Success', 
	GET_EXPENSE_TYPE_FAIL = '[ExpenseType] Get ExpenseType Fail', 

    GET_EXPENSE_TYPE_LIST = '[ExpenseType] Get ExpenseType list', 
	GET_EXPENSE_TYPE_LIST_SUCCESS = '[ExpenseType] Get ExpenseType list Success', 
	GET_EXPENSE_TYPE_LIST_FAIL = '[ExpenseType] Get ExpenseType list Fail', 

	SAVE_EXPENSE_TYPE = '[ExpenseType] Save ExpenseType', 
	SAVE_EXPENSE_TYPE_SUCCESS = '[ExpenseType] Save ExpenseType Success', 
	SAVE_EXPENSE_TYPE_FAIL = '[ExpenseType] Save ExpenseType Fail',
	
	EDIT_EXPENSE_TYPE = '[ExpenseType] Edit ExpenseType', 
	EDIT_EXPENSE_TYPE_SUCCESS = '[ExpenseType] Edit ExpenseType Success', 
	EDIT_EXPENSE_TYPE_FAIL = '[ExpenseType] Edit ExpenseType Fail',
}

export class GetExpenseType implements Action {
	public readonly type = ExpenseTypeActionTypes.GET_EXPENSE_TYPE;
	constructor(public payload: any) { }
}

export class GetExpenseTypeSuccess implements Action {
	public readonly type = ExpenseTypeActionTypes.GET_EXPENSE_TYPE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetExpenseTypeFail implements Action {
	public readonly type = ExpenseTypeActionTypes.GET_EXPENSE_TYPE_FAIL;
	constructor(public payload: any) { }
}

export class GetExpenseTypeList implements Action {
	public readonly type = ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST;
	constructor(public payload: any) { }
}

export class GetExpenseTypeListSuccess implements Action {
	public readonly type = ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetExpenseTypeListFail implements Action {
	public readonly type = ExpenseTypeActionTypes.GET_EXPENSE_TYPE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveExpenseType implements Action {
	public readonly type = ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE;
	constructor(public payload: any) { }
}

export class SaveExpenseTypeSuccess implements Action {
	public readonly type = ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveExpenseTypeFail implements Action {
	public readonly type = ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_FAIL;
	constructor(public payload: any) { }
}

export class EditExpenseType implements Action {
	public readonly type = ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE;
	constructor(public payload: any) { }
}

export class EditExpenseTypeSuccess implements Action {
	public readonly type = ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditExpenseTypeFail implements Action {
	public readonly type = ExpenseTypeActionTypes.EDIT_EXPENSE_TYPE_FAIL;
	constructor(public payload: any) { }
}

export type ExpenseTypeAction =
	GetExpenseType
|	GetExpenseTypeSuccess
|  	GetExpenseTypeFail
|   GetExpenseTypeList
|   GetExpenseTypeListSuccess
|   GetExpenseTypeListFail
|	SaveExpenseType
|	SaveExpenseTypeSuccess
|	SaveExpenseTypeFail
|	EditExpenseType
|	EditExpenseTypeSuccess
|	EditExpenseTypeFail;


