import { SendPasswordResetActions, SendPasswordResetActionsTypes } from "../actions/admin-send-password-reset.action";

export interface SendPasswordResetState {
	sendPasswordReset: any;
	pending: any;
	error: any;
	success: any;
}

export const SEND_PASSWORD_RESET_INITIAL_STATE: SendPasswordResetState = {
	sendPasswordReset: {},
	pending: false,
	error: null,
	success: null
}

export const SendPasswordResetReducer = (
    state: SendPasswordResetState = SEND_PASSWORD_RESET_INITIAL_STATE,
	action: SendPasswordResetActions,
): SendPasswordResetState => {
    switch(action.type){

        case SendPasswordResetActionsTypes.SEND_EMAIL:
            return { ...state, pending: true }

        case SendPasswordResetActionsTypes.SEND_EMAIL_SUCCESS:
            return { ...state, success: action.payload.result, pending:false }

        case SendPasswordResetActionsTypes.SEND_EMAIL_FAILED:
            return { ...state, pending: false, error:action.payload.error }

        case SendPasswordResetActionsTypes.PASSWORD_RESET:
            return { ...state, pending: true }
    
        case SendPasswordResetActionsTypes.PASSWORD_RESET_SUCCESS:
            return { ...state, success: action.payload.result, pending:false }
    
        case SendPasswordResetActionsTypes.PASSWORD_RESET_FAILED:
            return { ...state, pending: false, error:action.payload.statusText }

        default:
            return state;
    }
}