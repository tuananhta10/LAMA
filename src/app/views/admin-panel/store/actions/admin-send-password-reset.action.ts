import { Action } from '@ngrx/store';

export const enum SendPasswordResetActionsTypes {
    SEND_EMAIL = '[Forgot Password] Send Password Reset Email',
    SEND_EMAIL_SUCCESS = '[Forgot Password] Password Reset Email Sent',
    SEND_EMAIL_FAILED = '[Forgot Password] Password Reset Email Failed',

    PASSWORD_RESET = '[Forgot Password] Password Reset',
    PASSWORD_RESET_SUCCESS = '[Forgot Password] Password Reset Email Sent',
    PASSWORD_RESET_FAILED = '[Forgot Password] Password Reset Email Failed'
}

export class GetSendPasswordReset implements Action {
	public readonly type = SendPasswordResetActionsTypes.SEND_EMAIL;
	constructor(public payload: any) { }
}

export class GetSendPasswordResetSuccess implements Action {
	public readonly type = SendPasswordResetActionsTypes.SEND_EMAIL_SUCCESS;
	constructor(public payload: any) { }
}

export class GetSendPasswordResetFail implements Action {
	public readonly type = SendPasswordResetActionsTypes.SEND_EMAIL_FAILED;
	constructor(public payload: any) { }
}

export class PasswordReset implements Action {
	public readonly type = SendPasswordResetActionsTypes.PASSWORD_RESET;
	constructor(public payload: any) { }
}

export class PasswordResetSuccess implements Action {
	public readonly type = SendPasswordResetActionsTypes.PASSWORD_RESET_SUCCESS;
	constructor(public payload: any) { }
}

export class PasswordResetFail implements Action {
	public readonly type = SendPasswordResetActionsTypes.PASSWORD_RESET_FAILED;
	constructor(public payload: any) { }
}

export type SendPasswordResetActions = 
    GetSendPasswordReset
|   GetSendPasswordResetSuccess
|   GetSendPasswordResetFail
|   PasswordReset
|   PasswordResetSuccess
|   PasswordResetFail