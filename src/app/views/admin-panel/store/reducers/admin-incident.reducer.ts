import { 
	IncidentAction,
	IncidentActionTypes
	
} from '../actions/admin-incident.action';

// Create new interface for reducer
export interface IncidentState {
	incident: any;
    incidentList: any;
	incidentUpload: any;
	pending: any;
	error: any;
	success: any;
}

// Set initial state of the data
export const INCIDENT_INITIAL_STATE: IncidentState = {
	incident: {},
    incidentList: [],
	incidentUpload: null,
	pending: false,
	error: null,
	success: null
}


/*
	Create Reducer
	Take 2 Parameter: from Incident 
	@param 
		state: value (incident, pending, error)
		action: from action type
*/
export const IncidentReducer = (
	state: IncidentState = INCIDENT_INITIAL_STATE,
	action: IncidentAction,
	): IncidentState => {
		switch (action.type){

			case IncidentActionTypes.GET_INCIDENT:
			return { ...state, pending: true };

			case IncidentActionTypes.GET_INCIDENT_SUCCESS:
			return { ...state, incident: action.payload, pending: false }

			case IncidentActionTypes.GET_INCIDENT_FAIL:
			return { ...state, pending: false, error: action.payload }

            case IncidentActionTypes.GET_INCIDENT_LIST:
            return { ...state, pending: true };

            case IncidentActionTypes.GET_INCIDENT_LIST_SUCCESS:
            return { ...state, incidentList: action.payload, pending: false }

            case IncidentActionTypes.GET_INCIDENT_LIST_FAIL:
            return { ...state, pending: false, error: action.payload }

			case IncidentActionTypes.SAVE_INCIDENT:
			return { ...state, pending: true };

			case IncidentActionTypes.SAVE_INCIDENT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case IncidentActionTypes.SAVE_INCIDENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case IncidentActionTypes.EDIT_INCIDENT:
			return { ...state, pending: true };

			case IncidentActionTypes.EDIT_INCIDENT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case IncidentActionTypes.EDIT_INCIDENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case IncidentActionTypes.DELETE_INCIDENT:
			return { ...state, pending: true };

			case IncidentActionTypes.DELETE_INCIDENT_SUCCESS:
			return { ...state, success: action.payload.message, pending: false }

			case IncidentActionTypes.DELETE_INCIDENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			case IncidentActionTypes.UPLOAD_INCIDENT:
			return { ...state, pending: true };

			case IncidentActionTypes.UPLOAD_INCIDENT_SUCCESS:
			return { ...state, incidentUpload: action.payload, pending: false }

			case IncidentActionTypes.UPLOAD_INCIDENT_FAIL:
			return { ...state, pending: false, error: action.payload }

			default:
			return state;
		}
	}
	
