import { Action } from '@ngrx/store';

/* FOR BRANCH  
*/
export const enum BranchActionTypes {
	GET_BRANCH = '[Branch] Get Branch', 
	GET_BRANCH_SUCCESS = '[Branch] Get Branch Success', 
	GET_BRANCH_FAIL = '[Branch] Get Branch Fail', 

    GET_BRANCH_LIST = '[Branch] Get Branch list', 
	GET_BRANCH_LIST_SUCCESS = '[Branch] Get Branch list Success', 
	GET_BRANCH_LIST_FAIL = '[Branch] Get Branch list Fail',

	SAVE_BRANCH = '[Branch] Save Branch', 
	SAVE_BRANCH_SUCCESS = '[Branch] Save Branch Success', 
	SAVE_BRANCH_FAIL = '[Branch] Save Branch Fail',
	
	EDIT_BRANCH = '[Branch] Edit Branch', 
	EDIT_BRANCH_SUCCESS = '[Branch] Edit Branch Success', 
	EDIT_BRANCH_FAIL = '[Branch] Edit Branch Fail',

	DELETE_BRANCH = '[Branch] Delete Branch', 
	DELETE_BRANCH_SUCCESS = '[Branch] Delete Branch Success', 
	DELETE_BRANCH_FAIL = '[Branch] Delete Branch Fail',
}

export class GetBranch implements Action {
	public readonly type = BranchActionTypes.GET_BRANCH;
	constructor(public payload: any) { }
}

export class GetBranchSuccess implements Action {
	public readonly type = BranchActionTypes.GET_BRANCH_SUCCESS;
	constructor(public payload: any) { }
}

export class GetBranchFail implements Action {
	public readonly type = BranchActionTypes.GET_BRANCH_FAIL;
	constructor(public payload: any) { }
}

export class GetBranchList implements Action {
	public readonly type = BranchActionTypes.GET_BRANCH_LIST;
	constructor(public payload: any) { }
}

export class GetBranchListSuccess implements Action {
	public readonly type = BranchActionTypes.GET_BRANCH_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetBranchListFail implements Action {
	public readonly type = BranchActionTypes.GET_BRANCH_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveBranch implements Action {
	public readonly type = BranchActionTypes.SAVE_BRANCH;
	constructor(public payload: any) { }
}

export class SaveBranchSuccess implements Action {
	public readonly type = BranchActionTypes.SAVE_BRANCH_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveBranchFail implements Action {
	public readonly type = BranchActionTypes.SAVE_BRANCH_FAIL;
	constructor(public payload: any) { }
}

export class EditBranch implements Action {
	public readonly type = BranchActionTypes.EDIT_BRANCH;
	constructor(public payload: any) { }
}

export class EditBranchSuccess implements Action {
	public readonly type = BranchActionTypes.EDIT_BRANCH_SUCCESS;
	constructor(public payload: any) { }
}

export class EditBranchFail implements Action {
	public readonly type = BranchActionTypes.EDIT_BRANCH_FAIL;
	constructor(public payload: any) { }
}

export class DeleteBranch implements Action {
	public readonly type = BranchActionTypes.DELETE_BRANCH;
	constructor(public payload: any) { }
}

export class DeleteBranchSuccess implements Action {
	public readonly type = BranchActionTypes.DELETE_BRANCH_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteBranchFail implements Action {
	public readonly type = BranchActionTypes.DELETE_BRANCH_FAIL;
	constructor(public payload: any) { }
}


export type BranchAction =
	GetBranch
|	GetBranchSuccess
|  	GetBranchFail
|   GetBranchList
|   GetBranchListSuccess
|   GetBranchListFail
|	SaveBranch
|	SaveBranchSuccess
|	SaveBranchFail
|	EditBranch
|	EditBranchSuccess
|	EditBranchFail
|   DeleteBranch
|   DeleteBranchSuccess
|   DeleteBranchFail;


