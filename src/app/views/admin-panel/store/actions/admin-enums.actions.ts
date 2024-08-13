import { Action } from '@ngrx/store';

export const enum AdminEnumsActionTypes {

	//branches
	GET_BRANCHES = '[Client Enums] Get Branches', 
	GET_BRANCHES_SUCCESS = '[Client Enums] Get Client Branches Success', 
	GET_BRANCHES_FAIL = '[Client Enums] Get Client Branches Fail',
	ADD_BRANCH = '[Client Enums] Add Branches',

    //countries
	GET_COUNTRIES = '[Client Enums] Get Countries', 
	GET_COUNTRIES_SUCCESS = '[Client Enums] Get Countries Success', 
	GET_COUNTRIES_FAIL = '[Client Enums] Get Client Countries Fail',
	ADD_COUNTRY = '[Client Enums] Add Country',

    //religions
	GET_RELIGIONS = '[Client Enums] Get Religions', 
	GET_RELIGIONS_SUCCESS = '[Client Enums] Get Religions Success', 
	GET_RELIGIONS_FAIL = '[Client Enums] Get Client Religions Fail',
	ADD_RELIGION = '[Client Enums] Add Religion',

    //languages
	GET_LANGUAGES = '[Client Enums] Get Languages', 
	GET_LANGUAGES_SUCCESS = '[Client Enums] Get Languages Success', 
	GET_LANGUAGES_FAIL = '[Client Enums] Get Client Languages Fail',
	ADD_LANGUAGE = '[Client Enums] Add Language', 

    //programs
	GET_PROGRAMS = '[Client Enums] Get Programs', 
	GET_PROGRAMS_SUCCESS = '[Client Enums] Get Programs Success', 
	GET_PROGRAMS_FAIL = '[Client Enums] Get Client Programs Fail', 
	ADD_PROGRAM = '[Client Enums] Add Program',

    //classifications
	GET_CLASSIFICATIONS = '[Client Enums] Get Classifications', 
	GET_CLASSIFICATIONS_SUCCESS = '[Client Enums] Get Classifications Success', 
	GET_CLASSIFICATIONS_FAIL = '[Client Enums] Get Client Classifications Fail', 
	ADD_CLASSIFICATION = '[Client Enums] Add Classification',

	//position
	GET_POSITIONS = '[Client Enums] Get Position', 
	GET_POSITIONS_SUCCESS = '[Client Enums] Get Position Success', 
	GET_POSITIONS_FAIL = '[Client Enums] Get Client Position Fail', 
	ADD_POSITION = '[Client Enums] Add Position',

	//manager
	GET_MANAGERS = '[Client Enums] Get MANAGER', 
	GET_MANAGERS_SUCCESS = '[Client Enums] Get MANAGER Success', 
	GET_MANAGERS_FAIL = '[Client Enums] Get Client MANAGER Fail', 
	ADD_MANAGER = '[Client Enums] Add MANAGER',

	//employment type
	GET_EMPLOYMENT_TYPES = '[Client Enums] Get EMPLOYMENT_TYPE', 
	GET_EMPLOYMENT_TYPES_SUCCESS = '[Client Enums] Get EMPLOYMENT_TYPE Success', 
	GET_EMPLOYMENT_TYPES_FAIL = '[Client Enums] Get Client EMPLOYMENT_TYPE Fail', 
	ADD_EMPLOYMENT_TYPE = '[Client Enums] Add EMPLOYMENT_TYPE',

	//priceList
	GET_PRICE_LISTS = '[Client Enums] Get PRICE_LIST', 
	GET_PRICE_LISTS_SUCCESS = '[Client Enums] Get PRICE_LIST Success', 
	GET_PRICE_LISTS_FAIL = '[Client Enums] Get Client PRICE_LIST Fail', 
	ADD_PRICE_LIST = '[Client Enums] Add PRICE_LIST',
}

//branches
export class GetBranches implements Action {
	public readonly type = AdminEnumsActionTypes.GET_BRANCHES;
	constructor(public payload: any) { }
}

export class GetBranchesSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_BRANCHES_SUCCESS;
	constructor(public payload: any) { }
}

export class GetBranchesFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_BRANCHES_FAIL;
	constructor(public payload: any) { }
}

export class AddBranch implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_BRANCH;
	constructor(public payload: any) { }
}

//Countries
export class GetCountries implements Action {
	public readonly type = AdminEnumsActionTypes.GET_COUNTRIES;
	constructor(public payload: any) { }
}

export class GetCountriesSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_COUNTRIES_SUCCESS;
	constructor(public payload: any) { }
}

export class GetCountriesFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_COUNTRIES_FAIL;
	constructor(public payload: any) { }
}

export class AddCountry implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_COUNTRY;
	constructor(public payload: any) { }
}

//religions
export class GetReligions implements Action {
	public readonly type = AdminEnumsActionTypes.GET_RELIGIONS;
	constructor(public payload: any) { }
}

export class GetReligionsSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_RELIGIONS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetReligionsFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_RELIGIONS_FAIL;
	constructor(public payload: any) { }
}

export class AddReligion implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_RELIGION;
	constructor(public payload: any) { }
}

//languages
export class GetLanguages implements Action {
	public readonly type = AdminEnumsActionTypes.GET_LANGUAGES;
	constructor(public payload: any) { }
}

export class GetLanguagesSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_LANGUAGES_SUCCESS;
	constructor(public payload: any) { }
}

export class GetLanguagesFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_LANGUAGES_FAIL;
	constructor(public payload: any) { }
}

export class AddLanguage implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_LANGUAGE;
	constructor(public payload: any) { }
}

//programs
export class GetPrograms implements Action {
	public readonly type = AdminEnumsActionTypes.GET_PROGRAMS;
	constructor(public payload: any) { }
}

export class GetProgramsSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_PROGRAMS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetProgramsFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_PROGRAMS_FAIL;
	constructor(public payload: any) { }
}

export class AddProgram implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_PROGRAM;
	constructor(public payload: any) { }
}

//classifications
export class GetClassifications implements Action {
	public readonly type = AdminEnumsActionTypes.GET_CLASSIFICATIONS;
	constructor(public payload: any) { }
}

export class GetClassificationsSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_CLASSIFICATIONS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetClassificationsFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_CLASSIFICATIONS_FAIL;
	constructor(public payload: any) { }
}

export class AddClassification implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_CLASSIFICATION;
	constructor(public payload: any) { }
}

//positions
export class GetPositions implements Action {
	public readonly type = AdminEnumsActionTypes.GET_POSITIONS;
	constructor(public payload: any) { }
}

export class GetPositionsSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_POSITIONS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetPositionsFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_POSITIONS_FAIL;
	constructor(public payload: any) { }
}

export class AddPosition implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_POSITION;
	constructor(public payload: any) { }
}

//manager
export class GetManagers implements Action {
	public readonly type = AdminEnumsActionTypes.GET_MANAGERS;
	constructor(public payload: any) { }
}

export class GetManagersSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_MANAGERS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetManagersFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_MANAGERS_FAIL;
	constructor(public payload: any) { }
}

export class AddManager implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_MANAGER;
	constructor(public payload: any) { }
}

//employmentType
export class GetEmploymentTypes implements Action {
	public readonly type = AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES;
	constructor(public payload: any) { }
}

export class GetEmploymentTypesSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES_SUCCESS;
	constructor(public payload: any) { }
}

export class GetEmploymentTypesFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES_FAIL;
	constructor(public payload: any) { }
}

export class AddEmploymentType implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_EMPLOYMENT_TYPE;
	constructor(public payload: any) { }
}

//priceList
export class GetPriceLists implements Action {
	public readonly type = AdminEnumsActionTypes.GET_PRICE_LISTS;
	constructor(public payload: any) { }
}

export class GetPriceListsSuccess implements Action {
	public readonly type = AdminEnumsActionTypes.GET_PRICE_LISTS_SUCCESS;
	constructor(public payload: any) { }
}

export class GetPriceListsFail implements Action {
	public readonly type = AdminEnumsActionTypes.GET_PRICE_LISTS_FAIL;
	constructor(public payload: any) { }
}

export class AddPriceList implements Action {
	public readonly type = AdminEnumsActionTypes.ADD_PRICE_LIST;
	constructor(public payload: any) { }
}


export type AdminEnumsAction =
    GetBranches
|	GetBranchesSuccess
|  	GetBranchesFail
| 	AddBranch
|   GetCountries
|	GetCountriesSuccess
|  	GetCountriesFail
|	AddCountry
|   GetReligions
|	GetReligionsSuccess
|  	GetReligionsFail
|	AddReligion
|   GetLanguages
|	GetLanguagesSuccess
|  	GetLanguagesFail
|	AddLanguage
|   GetPrograms
|	GetProgramsSuccess
|  	GetProgramsFail
|	AddProgram
|   GetClassifications
|	GetClassificationsSuccess
|  	GetClassificationsFail
|	AddClassification
|   GetPositions
|	GetPositionsSuccess
|  	GetPositionsFail
|	AddPosition
|   GetManagers
|	GetManagersSuccess
|  	GetManagersFail
|	AddManager
|   GetEmploymentTypes
|	GetEmploymentTypesSuccess
|  	GetEmploymentTypesFail
|	AddEmploymentType
|   GetPriceLists
|	GetPriceListsSuccess
|  	GetPriceListsFail
|	AddPriceList;


