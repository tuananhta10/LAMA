import { Action } from '@ngrx/store';

/* FOR PRICE_LIST  
*/
export const enum PriceListActionTypes {
	GET_PRICE_LIST = '[PriceList] Get PriceList', 
	GET_PRICE_LIST_SUCCESS = '[PriceList] Get PriceList Success', 
	GET_PRICE_LIST_FAIL = '[PriceList] Get PriceList Fail', 

    GET_PRICE_LIST_LIST = '[PriceList] Get PriceList list', 
	GET_PRICE_LIST_LIST_SUCCESS = '[PriceList] Get PriceList list Success', 
	GET_PRICE_LIST_LIST_FAIL = '[PriceList] Get PriceList list Fail',

	SAVE_PRICE_LIST = '[PriceList] Save PriceList', 
	SAVE_PRICE_LIST_SUCCESS = '[PriceList] Save PriceList Success', 
	SAVE_PRICE_LIST_FAIL = '[PriceList] Save PriceList Fail',
	
	EDIT_PRICE_LIST = '[PriceList] Edit PriceList', 
	EDIT_PRICE_LIST_SUCCESS = '[PriceList] Edit PriceList Success', 
	EDIT_PRICE_LIST_FAIL = '[PriceList] Edit PriceList Fail',

	EDIT_PRICE_LIST_INLINE = '[PriceList] Edit PriceList From HTML Table', 
	EDIT_PRICE_LIST_INLINE_SUCCESS = '[PriceList] Edit PriceList Success From HTML Table', 
	EDIT_PRICE_LIST_INLINE_FAIL = '[PriceList] Edit PriceList Fail From HTML Table',

	UPLOAD_PRICE_LIST = '[PriceList] Upload pricelist', 
	UPLOAD_PRICE_LIST_SUCCESS = '[PriceList] Upload pricelist success', 
	UPLOAD_PRICE_LIST_FAIL = '[PriceList] Upload pricelist fail',
}

export class GetPriceList implements Action {
	public readonly type = PriceListActionTypes.GET_PRICE_LIST;
	constructor(public payload: any) { }
}

export class GetPriceListSuccess implements Action {
	public readonly type = PriceListActionTypes.GET_PRICE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetPriceListFail implements Action {
	public readonly type = PriceListActionTypes.GET_PRICE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class GetPriceListList implements Action {
	public readonly type = PriceListActionTypes.GET_PRICE_LIST_LIST;
	constructor(public payload: any) { }
}

export class GetPriceListListSuccess implements Action {
	public readonly type = PriceListActionTypes.GET_PRICE_LIST_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetPriceListListFail implements Action {
	public readonly type = PriceListActionTypes.GET_PRICE_LIST_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SavePriceList implements Action {
	public readonly type = PriceListActionTypes.SAVE_PRICE_LIST;
	constructor(public payload: any) { }
}

export class SavePriceListSuccess implements Action {
	public readonly type = PriceListActionTypes.SAVE_PRICE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class SavePriceListFail implements Action {
	public readonly type = PriceListActionTypes.SAVE_PRICE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class EditPriceList implements Action {
	public readonly type = PriceListActionTypes.EDIT_PRICE_LIST;
	constructor(public payload: any) { }
}

export class EditPriceListSuccess implements Action {
	public readonly type = PriceListActionTypes.EDIT_PRICE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class EditPriceListFail implements Action {
	public readonly type = PriceListActionTypes.EDIT_PRICE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class EditPriceListInline implements Action {
	public readonly type = PriceListActionTypes.EDIT_PRICE_LIST_INLINE;
	constructor(public payload: any) { }
}

export class EditPriceListSuccessInline implements Action {
	public readonly type = PriceListActionTypes.EDIT_PRICE_LIST_INLINE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditPriceListFailInline implements Action {
	public readonly type = PriceListActionTypes.EDIT_PRICE_LIST_INLINE_FAIL;
	constructor(public payload: any) { }
}

export class UploadPriceList implements Action {
	public readonly type = PriceListActionTypes.UPLOAD_PRICE_LIST;
	constructor(public payload: any) { }
}

export class UploadPriceListSuccess implements Action {
	public readonly type = PriceListActionTypes.UPLOAD_PRICE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class UploadPriceListFail implements Action {
	public readonly type = PriceListActionTypes.UPLOAD_PRICE_LIST_FAIL;
	constructor(public payload: any) { }
}

export type PriceListAction =
	GetPriceList
|	GetPriceListSuccess
|  	GetPriceListFail
|   GetPriceListList
|   GetPriceListListSuccess
|   GetPriceListListFail
|	SavePriceList
|	SavePriceListSuccess
|	SavePriceListFail
|	EditPriceList
|	EditPriceListSuccess
|	EditPriceListFail
|	EditPriceListInline
| 	EditPriceListSuccessInline
|	EditPriceListFailInline
| 	UploadPriceList
|	UploadPriceListSuccess
|	UploadPriceListFail;


