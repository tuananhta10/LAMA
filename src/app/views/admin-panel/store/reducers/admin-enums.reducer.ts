import {
  AdminEnumsAction,
  AdminEnumsActionTypes,
} from '../actions/admin-enums.actions';

// Create new interface for reducer
export interface AdminEnumsState {
  branches: any[];
  countries: any[];
  religions: any[];
  languages: any[];
  programs: any[];
  position: any[];
  manager: any[];
  employmentType: any[];
  priceList: any[];
  classifications: any[];
  pending: any;
  error: any;
}

// Set initial state of the data
export const ADMIN_ENUMS_INITIAL_STATE: AdminEnumsState = {
  branches: [],
  countries: [],
  religions: [],
  languages: [],
  programs: [],
  classifications: [],
  position: [],
  manager: [],
  employmentType: [],
  priceList: [],
  pending: false,
  error: null,
};

/*
	Create Reducer
	Take 2 Parameter: from Client List
	@param 
		state: value (clientList, pending, error)
		action: from action type
*/
export const AdminEnumsReducer = (
  state: AdminEnumsState = ADMIN_ENUMS_INITIAL_STATE,
  action: AdminEnumsAction
): AdminEnumsState => {
  switch (action.type) {
    //Branches
    case AdminEnumsActionTypes.GET_BRANCHES:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_BRANCHES_SUCCESS:
      return {
        ...state,
        branches: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_BRANCHES_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_BRANCH:
      return {
        ...state,
        branches: [...state.branches, action.payload],
        pending: false,
      };

    //countries
    case AdminEnumsActionTypes.GET_COUNTRIES:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        countries: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_COUNTRIES_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_COUNTRY:
      return {
        ...state,
        countries: [...state.countries, action.payload],
        pending: false,
      };

    //religions
    case AdminEnumsActionTypes.GET_RELIGIONS:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_RELIGIONS_SUCCESS:
      return {
        ...state,
        religions: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_RELIGIONS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_RELIGION:
      return {
        ...state,
        religions: [...state.religions, action.payload],
        pending: false,
      };

    //languages
    case AdminEnumsActionTypes.GET_LANGUAGES:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_LANGUAGES_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_LANGUAGE:
      return {
        ...state,
        languages: [...state.languages, action.payload],
        pending: false,
      };

    //programs
    case AdminEnumsActionTypes.GET_PROGRAMS:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_PROGRAMS_SUCCESS:
      return {
        ...state,
        programs: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_PROGRAMS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_PROGRAM:
      return {
        ...state,
        programs: [...state.programs, action.payload],
        pending: false,
      };

    //classifications
    case AdminEnumsActionTypes.GET_CLASSIFICATIONS:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_CLASSIFICATIONS_SUCCESS:
      return {
        ...state,
        classifications: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_CLASSIFICATIONS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_CLASSIFICATION:
      return {
        ...state,
        countries: [...state.classifications, action.payload],
        pending: false,
      };

    //Position
    case AdminEnumsActionTypes.GET_POSITIONS:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_POSITIONS_SUCCESS:
      return {
        ...state,
        position: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_POSITIONS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_POSITION:
      return {
        ...state,
        position: [...state.position, action.payload],
        pending: false,
      };

    //Manager
    case AdminEnumsActionTypes.GET_MANAGERS:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_MANAGERS_SUCCESS:
      return {
        ...state,
        manager: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_MANAGERS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_MANAGER:
      return {
        ...state,
        manager: [...state.manager, action.payload],
        pending: false,
      };

    //EmploymentType
    case AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES_SUCCESS:
      return {
        ...state,
        employmentType: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_EMPLOYMENT_TYPES_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_EMPLOYMENT_TYPE:
      return {
        ...state,
        employmentType: [...state.employmentType, action.payload],
        pending: false,
      };

    //PriceList
    case AdminEnumsActionTypes.GET_PRICE_LISTS:
      return {
        ...state,
        pending: true,
      };

    case AdminEnumsActionTypes.GET_PRICE_LISTS_SUCCESS:
      return {
        ...state,
        priceList: action.payload,
        pending: false,
      };

    case AdminEnumsActionTypes.GET_PRICE_LISTS_FAIL:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    case AdminEnumsActionTypes.ADD_PRICE_LIST:
      return {
        ...state,
        priceList: [...state.priceList, action.payload],
        pending: false,
      };

    default:
      return state;
  }
};
