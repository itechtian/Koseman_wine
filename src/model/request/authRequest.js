class AuthRequest {

    static initiateEnrollment = {
        customerFirstName:null,
        customerLastName:null,
        customerPhoneNo:null,
        customerEmail:null,
        customerPassword:null,
        customerPassword_confirmation:null,
    }

    static completeEnrollment = {
        customerOtp:null,
        customerEmail:null
    }

    static login = {
        customerEmail:null,
        customerPassword:null
    }
    static sendOtp = {
        customerEmail:null,
    }
}

export default AuthRequest