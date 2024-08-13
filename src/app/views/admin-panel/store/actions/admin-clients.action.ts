import { Action } from '@ngrx/store';

/* FOR CLIENT LIST 
*/
export const enum ClientListActionTypes {
	/*  CAPITAL FOR ACTION TYPE = [Title] Description */
	GET_CLIENT_LIST = '[Client List] Get Client List for Admin Panel', 
	GET_CLIENT_LIST_SUCCESS = '[Client List] Get Client List for Admin Panel Success', 
	GET_CLIENT_LIST_FAIL = '[Client List] Get Client List for Admin Panel Fail', 

	DELETE_CLIENT_LIST = '[Client List] Delete Client from List for Admin Panel', 
	DELETE_CLIENT_LIST_SUCCESS = '[Client List] Delete Client  fromList for Admin Panel Success', 
	DELETE_CLIENT_LIST_FAIL = '[Client List] Delete Client from List for Admin Panel Fail', 

	GET_CLIENT_LIVE_FEED = '[Client Live Feed] Get Client Live Feed for Admin Panel', 
	GET_CLIENT_LIVE_FEED_SUCCESS = '[Client Live Feed] Get Client Live Feed for Admin Panel Success', 
	GET_CLIENT_LIVE_FEED_FAIL = '[Client Live Feed] Get Client Live Feed for Admin Panel Fail',
	
	UPLOAD_CLIENT = '[Client] Upload client', 
	UPLOAD_CLIENT_SUCCESS = '[Client] Upload client Success', 
	UPLOAD_CLIENT_FAIL = '[Client] Upload client Fail', 
}

// Set interface for each action types
export class GetClientList implements Action {
	public readonly type = ClientListActionTypes.GET_CLIENT_LIST;
	constructor(public payload: any) { }
}

export class GetClientListSuccess implements Action {
	public readonly type = ClientListActionTypes.GET_CLIENT_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientListFail implements Action {
	public readonly type = ClientListActionTypes.GET_CLIENT_LIST_FAIL;
	constructor(public payload: any) { }
}

export class DeleteClientList implements Action {
	public readonly type = ClientListActionTypes.DELETE_CLIENT_LIST;
	constructor(public payload: any) { }
}

export class DeleteClientListSuccess implements Action {
	public readonly type = ClientListActionTypes.DELETE_CLIENT_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteClientListFail implements Action {
	public readonly type = ClientListActionTypes.DELETE_CLIENT_LIST_FAIL;
	constructor(public payload: any) { }
}


export class GetClientLiveFeed implements Action {
	public readonly type = ClientListActionTypes.GET_CLIENT_LIVE_FEED;
	constructor(public payload: any) { }
}

export class GetClientLiveFeedSuccess implements Action {
	public readonly type = ClientListActionTypes.GET_CLIENT_LIVE_FEED_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClientLiveFeedFail implements Action {
	public readonly type = ClientListActionTypes.GET_CLIENT_LIVE_FEED_FAIL;
	constructor(public payload: any) { }
}

export class UploadClient implements Action {
	public readonly type = ClientListActionTypes.UPLOAD_CLIENT;
	constructor(public payload: any) { }
}

export class UploadClientSuccess implements Action {
	public readonly type = ClientListActionTypes.UPLOAD_CLIENT_SUCCESS;
	constructor(public payload: any) { }
}

export class UploadClientFail implements Action {
	public readonly type = ClientListActionTypes.UPLOAD_CLIENT_FAIL;
	constructor(public payload: any) { }
}



// Export each interface
export type ClientListAction =
	GetClientList
|	GetClientListSuccess
|  	GetClientListFail
| 	DeleteClientList
| 	DeleteClientListSuccess
| 	DeleteClientListFail
|	GetClientLiveFeed
|	GetClientLiveFeedSuccess
|  	GetClientLiveFeedFail
|	UploadClient
|	UploadClientSuccess
|	UploadClientFail;


