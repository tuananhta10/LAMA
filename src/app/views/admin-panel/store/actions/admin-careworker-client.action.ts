import { Action } from '@ngrx/store';

/* FOR CAREWORKER_CLIENT  
*/
export const enum CareworkerClientActionTypes {
	GET_CAREWORKER_CLIENT = '[CareworkerClient] Get CareworkerClient', 
	GET_CAREWORKER_CLIENT_SUCCESS = '[CareworkerClient] Get CareworkerClient Success', 
	GET_CAREWORKER_CLIENT_FAIL = '[CareworkerClient] Get CareworkerClient Fail', 

	SAVE_CAREWORKER_CLIENT = '[CareworkerClient] Save CareworkerClient', 
	SAVE_CAREWORKER_CLIENT_SUCCESS = '[CareworkerClient] Save CareworkerClient Success', 
	SAVE_CAREWORKER_CLIENT_FAIL = '[CareworkerClient] Save CareworkerClient Fail',
	
	EDIT_CAREWORKER_CLIENT = '[CareworkerClient] Edit CareworkerClient', 
	EDIT_CAREWORKER_CLIENT_SUCCESS = '[CareworkerClient] Edit CareworkerClient Success', 
	EDIT_CAREWORKER_CLIENT_FAIL = '[CareworkerClient] Edit CareworkerClient Fail',
}

export class GetCareworkerClient implements Action {
	public readonly type = CareworkerClientActionTypes.GET_CAREWORKER_CLIENT;
	constructor(public payload: any) { }
}

export class GetCareworkerClientSuccess implements Action {
	public readonly type = CareworkerClientActionTypes.GET_CAREWORKER_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCareworkerClientFail implements Action {
	public readonly type = CareworkerClientActionTypes.GET_CAREWORKER_CLIENT_FAIL;
	constructor(public payload: any) { }
}

export class SaveCareworkerClient implements Action {
	public readonly type = CareworkerClientActionTypes.SAVE_CAREWORKER_CLIENT;
	constructor(public payload: any) { }
}

export class SaveCareworkerClientSuccess implements Action {
	public readonly type = CareworkerClientActionTypes.SAVE_CAREWORKER_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveCareworkerClientFail implements Action {
	public readonly type = CareworkerClientActionTypes.SAVE_CAREWORKER_CLIENT_FAIL;
	constructor(public payload: any) { }
}

export class EditCareworkerClient implements Action {
	public readonly type = CareworkerClientActionTypes.EDIT_CAREWORKER_CLIENT;
	constructor(public payload: any) { }
}

export class EditCareworkerClientSuccess implements Action {
	public readonly type = CareworkerClientActionTypes.EDIT_CAREWORKER_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class EditCareworkerClientFail implements Action {
	public readonly type = CareworkerClientActionTypes.EDIT_CAREWORKER_CLIENT_FAIL;
	constructor(public payload: any) { }
}

export type CareworkerClientAction =
	GetCareworkerClient
|	GetCareworkerClientSuccess
|  	GetCareworkerClientFail
|	SaveCareworkerClient
|	SaveCareworkerClientSuccess
|	SaveCareworkerClientFail
|	EditCareworkerClient
|	EditCareworkerClientSuccess
|	EditCareworkerClientFail;

