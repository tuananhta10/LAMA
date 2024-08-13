import { Action } from '@ngrx/store';

/* FOR CLIENT  
*/
export const enum ClientManagerActionTypes {
	GET_CLIENTS_MANAGER = '[Client] Get Clients for Client Manager Panel', 
	GET_CLIENTS_MANAGER_SUCCESS = '[Client] Get Clients for Client Manager Panel Success', 
	GET_CLIENTS_MANAGER_FAIL = '[Client] Get Clients for Client Manager Panel Fail', 
}

export class GetClientManager implements Action {
	public readonly type = ClientManagerActionTypes.GET_CLIENTS_MANAGER;
	constructor(public payload: any) { }
}

export class GetClientManagerSuccess implements Action {
	public readonly type = ClientManagerActionTypes.GET_CLIENTS_MANAGER_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientManagerFail implements Action {
	public readonly type = ClientManagerActionTypes.GET_CLIENTS_MANAGER_FAIL;
	constructor(public payload: any) { }
}

export type ClientManagerAction =
	GetClientManager
|	GetClientManagerSuccess
|  	GetClientManagerFail;


