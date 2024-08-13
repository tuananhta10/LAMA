export enum AuthenticationMessage{
    PASSWORD_FILL_UP_FIELDS = 'Please provide an email to reset your password.',
    PASSWORD_EMAIL_SENT ='Password reset email has been sent. Please check your email',
    PASSWORD_EMAIL_NOT_REGISTERED = 'Sorry, the email address you entered is not registered in our system. Please verify your email or sign up for a new account.',
    PASSWORD_CHANGED = 'Password updated successfully. Please login again',

    USER_NOT_FOUND = 'User not found',

    SERVER_ERROR = 'There has been a problem with the server. Please refresh the page and try again or contact the administrator regarding this issue.'
}