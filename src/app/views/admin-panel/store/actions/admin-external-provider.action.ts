import { Action } from '@ngrx/store';

/* FOR EXTERNAL_PROVIDER  
*/
export const enum ExternalProviderActionTypes {
	GET_EXTERNAL_PROVIDER = '[ExternalProvider] Get ExternalProvider', 
	GET_EXTERNAL_PROVIDER_SUCCESS = '[ExternalProvider] Get ExternalProvider Success', 
	GET_EXTERNAL_PROVIDER_FAIL = '[ExternalProvider] Get ExternalProvider Fail', 

    GET_EXTERNAL_PROVIDER_LIST = '[ExternalProvider] Get ExternalProvider list', 
	GET_EXTERNAL_PROVIDER_LIST_SUCCESS = '[ExternalProvider] Get ExternalProvider list Success', 
	GET_EXTERNAL_PROVIDER_LIST_FAIL = '[ExternalProvider] Get ExternalProvider list Fail', 

	SAVE_EXTERNAL_PROVIDER = '[ExternalProvider] Save ExternalProvider', 
	SAVE_EXTERNAL_PROVIDER_SUCCESS = '[ExternalProvider] Save ExternalProvider Success', 
	SAVE_EXTERNAL_PROVIDER_FAIL = '[ExternalProvider] Save ExternalProvider Fail',
	
	EDIT_EXTERNAL_PROVIDER = '[ExternalProvider] Edit ExternalProvider', 
	EDIT_EXTERNAL_PROVIDER_SUCCESS = '[ExternalProvider] Edit ExternalProvider Success', 
	EDIT_EXTERNAL_PROVIDER_FAIL = '[ExternalProvider] Edit ExternalProvider Fail',

	DELETE_EXTERNAL_PROVIDER = '[ExternalProvider] DELETE ExternalProvider', 
	DELETE_EXTERNAL_PROVIDER_SUCCESS = '[ExternalProvider] DELETE ExternalProvider Success', 
	DELETE_EXTERNAL_PROVIDER_FAIL = '[ExternalProvider] DELETE ExternalProvider Fail',
}

export class GetExternalProvider implements Action {
	public readonly type = ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER;
	constructor(public payload: any) { }
}

export class GetExternalProviderSuccess implements Action {
	public readonly type = ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_SUCCESS;
	constructor(public payload: any) { }
}

export class GetExternalProviderFail implements Action {
	public readonly type = ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_FAIL;
	constructor(public payload: any) { }
}

export class GetExternalProviderList implements Action {
	public readonly type = ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST;
	constructor(public payload: any) { }
}

export class GetExternalProviderListSuccess implements Action {
	public readonly type = ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetExternalProviderListFail implements Action {
	public readonly type = ExternalProviderActionTypes.GET_EXTERNAL_PROVIDER_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveExternalProvider implements Action {
	public readonly type = ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER;
	constructor(public payload: any) { }
}

export class SaveExternalProviderSuccess implements Action {
	public readonly type = ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveExternalProviderFail implements Action {
	public readonly type = ExternalProviderActionTypes.SAVE_EXTERNAL_PROVIDER_FAIL;
	constructor(public payload: any) { }
}

export class EditExternalProvider implements Action {
	public readonly type = ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER;
	constructor(public payload: any) { }
}

export class EditExternalProviderSuccess implements Action {
	public readonly type = ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER_SUCCESS;
	constructor(public payload: any) { }
}

export class EditExternalProviderFail implements Action {
	public readonly type = ExternalProviderActionTypes.EDIT_EXTERNAL_PROVIDER_FAIL;
	constructor(public payload: any) { }
}

export class DeleteExternalProvider implements Action {
	public readonly type = ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER;
	constructor(public payload: any) { }
}

export class DeleteExternalProviderSuccess implements Action {
	public readonly type = ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteExternalProviderFail implements Action {
	public readonly type = ExternalProviderActionTypes.DELETE_EXTERNAL_PROVIDER_FAIL;
	constructor(public payload: any) { }
}

export type ExternalProviderAction =
	GetExternalProvider
|	GetExternalProviderSuccess
|  	GetExternalProviderFail
|   GetExternalProviderList
|   GetExternalProviderListSuccess
|   GetExternalProviderListFail
|	SaveExternalProvider
|	SaveExternalProviderSuccess
|	SaveExternalProviderFail
|	EditExternalProvider
|	EditExternalProviderSuccess
|	EditExternalProviderFail
|	DeleteExternalProvider
|	DeleteExternalProviderSuccess
|	DeleteExternalProviderFail;


