import { Action } from '@ngrx/store';

/* FOR LANGUAGE  
*/
export const enum LanguageActionTypes {
	GET_LANGUAGE = '[Language] Get Language', 
	GET_LANGUAGE_SUCCESS = '[Language] Get Language Success', 
	GET_LANGUAGE_FAIL = '[Language] Get Language Fail', 

    GET_LANGUAGE_LIST = '[Language] Get Language list', 
	GET_LANGUAGE_LIST_SUCCESS = '[Language] Get Language list Success', 
	GET_LANGUAGE_LIST_FAIL = '[Language] Get Language list Fail',

	SAVE_LANGUAGE = '[Language] Save Language', 
	SAVE_LANGUAGE_SUCCESS = '[Language] Save Language Success', 
	SAVE_LANGUAGE_FAIL = '[Language] Save Language Fail',
	
	EDIT_LANGUAGE = '[Language] Edit Language', 
	EDIT_LANGUAGE_SUCCESS = '[Language] Edit Language Success', 
	EDIT_LANGUAGE_FAIL = '[Language] Edit Language Fail',

	DELETE_LANGUAGE = '[Language] Delete Language', 
	DELETE_LANGUAGE_SUCCESS = '[Language] Delete Language Success', 
	DELETE_LANGUAGE_FAIL = '[Language] Delete Language Fail',
}

export class GetLanguage implements Action {
	public readonly type = LanguageActionTypes.GET_LANGUAGE;
	constructor(public payload: any) { }
}

export class GetLanguageSuccess implements Action {
	public readonly type = LanguageActionTypes.GET_LANGUAGE_SUCCESS;
	constructor(public payload: any) { }
}

export class GetLanguageFail implements Action {
	public readonly type = LanguageActionTypes.GET_LANGUAGE_FAIL;
	constructor(public payload: any) { }
}

export class GetLanguageList implements Action {
	public readonly type = LanguageActionTypes.GET_LANGUAGE_LIST;
	constructor(public payload: any) { }
}

export class GetLanguageListSuccess implements Action {
	public readonly type = LanguageActionTypes.GET_LANGUAGE_LIST_SUCCESS;
	constructor(public payload: any) { }
}

export class GetLanguageListFail implements Action {
	public readonly type = LanguageActionTypes.GET_LANGUAGE_LIST_FAIL;
	constructor(public payload: any) { }
}

export class SaveLanguage implements Action {
	public readonly type = LanguageActionTypes.SAVE_LANGUAGE;
	constructor(public payload: any) { }
}

export class SaveLanguageSuccess implements Action {
	public readonly type = LanguageActionTypes.SAVE_LANGUAGE_SUCCESS;
	constructor(public payload: any) { }
}

export class SaveLanguageFail implements Action {
	public readonly type = LanguageActionTypes.SAVE_LANGUAGE_FAIL;
	constructor(public payload: any) { }
}

export class EditLanguage implements Action {
	public readonly type = LanguageActionTypes.EDIT_LANGUAGE;
	constructor(public payload: any) { }
}

export class EditLanguageSuccess implements Action {
	public readonly type = LanguageActionTypes.EDIT_LANGUAGE_SUCCESS;
	constructor(public payload: any) { }
}

export class EditLanguageFail implements Action {
	public readonly type = LanguageActionTypes.EDIT_LANGUAGE_FAIL;
	constructor(public payload: any) { }
}

export class DeleteLanguage implements Action {
	public readonly type = LanguageActionTypes.DELETE_LANGUAGE;
	constructor(public payload: any) { }
}

export class DeleteLanguageSuccess implements Action {
	public readonly type = LanguageActionTypes.DELETE_LANGUAGE_SUCCESS;
	constructor(public payload: any) { }
}

export class DeleteLanguageFail implements Action {
	public readonly type = LanguageActionTypes.DELETE_LANGUAGE_FAIL;
	constructor(public payload: any) { }
}

export type LanguageAction =
	GetLanguage
|	GetLanguageSuccess
|  	GetLanguageFail
|   GetLanguageList
|   GetLanguageListSuccess
|   GetLanguageListFail
|	SaveLanguage
|	SaveLanguageSuccess
|	SaveLanguageFail
|	EditLanguage
|	EditLanguageSuccess
|	EditLanguageFail
|   DeleteLanguage
|   DeleteLanguageSuccess
|   DeleteLanguageFail;


