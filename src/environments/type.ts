export interface Environment {
    /**
     * IsProduction build?
     */
    production: boolean;

    /**
     * Server URL
     */
    server: string;

    /**
     * Server URL
     */
    host: string;

    /**
     * Environment name
     */
    name: 'development' | 'staging' | 'production';

    /**
     * NgRx name
     */
    NgRxName?: string;

    /**
     * NgRx max age
     */
    NgRxMaxAge?: number;

    /**
     * is environment for debugging?
     */
    isDebug: boolean;

    firebase: any;

    googleAPIKey: any;

    stripeKey: any;

    productKeyForClientPrice: string;

    productKeyForSetupFee: string;

    productKeyForSMSCredit: string;

    myob:MYOB

    xeroHost:string
}


interface MYOB {
    clientID:string;
    myobClientID:string;
}