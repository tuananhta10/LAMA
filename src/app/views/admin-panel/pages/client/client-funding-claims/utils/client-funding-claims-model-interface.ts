export interface ClientFundingClaim {
  invoice_id: string;  
  invoice_name: string;  
  funding_source_id: string;
  funding_source_code: string;
  invoice_type: string;  
  invoice_date_added: any; 
  time_created?: any;
  created_by: string;
  invoice_start_date?: any;  
  invoice_end_date?: any;
  invoice_batch?: any;
  invoice_total_hours: number;
  invoice_total_amount: number;
}


/*
  RegistrationNumber - The Provider’s registration number shown in your Profile as Organization ID. 
  Data type: Number only, no spaces and up to 30 numeric characters. Organization ID number will start with ‘405’ and consists of a total of nine digits.

  NDISNumber - Participant NDIS Number
  Data type: Number only, no spaces and up to 20 numeric characters.Participant NDIA number will start with numbers ‘43’ and consists of a total of nine digits.

  SupportsDeliveredFrom - Start date of the support provided
  Data type: Accepts YYYY-MM-DD or DD-MM-YYYY date format.
    Note: Also accepts instead of dashes (-) any of the following: 
    • Forward Slash ( / )
    • Back Slash ( \ ) • Full stop ( . ) • Colon (:)
    • Semicolon (;)
    • Logical (||)

  SupportsDeliveredTo - End date of the support provided
  Data type: Accepts YYYY-MM-DD or DD-MM-YYYY date format.
    Note: Also accepts instead of dashes (-) any of the following: 
    • Forward Slash ( / )
    • Back Slash ( \ ) • Full stop ( . ) • Colon (:)
    • Semicolon (;)
    • Logical (||)

  SupportNumber - Support Item number of the service provided from the NDIS Support Catalogue 2019-20.
  Data type: Up to 60 characters - underscore acceptable.

  ClaimReference - The Provider’s own Invoice reference for the payment.
  Data type: Up to 50 characters, 
    which includes: • Forward Slash ( / )
    • Underscore ( _ )
    • Hyphen ( - ) • Alphanumeric

  Quantity - Number of units.
  Data type: Up to 5 Numeric characters. Accepts NNNNN OR NNN.NN format.
    Can be used to represent hours (e.g. 2.5 hours = 2 hours 30 minutes) but cannot be in hour format 
    (e.g. 2: 30 = 2 hours 30  minutes).
    Note: you cannot use both hour and quantity formats for the same claim (i.e. A claim for one 
    session of 2 hours 30 minutes should be either Quantity = 1 Hours = 2:30 or Quantity = 2.5 and 
    Hours = 1).

  Hours - Actual duration of the service provided. For example, if the service was provided for 2 hours 15 minutes then enter 2:15
  Data Type: Hours format: HHH:MM e.g. 2: 30 = 2 hours 30 minutes.
    Cannot use decimal format (e.g. 2.5 hours = 2 hours 30 minutes).
    Note: you cannot use both hour and quantityb formats for the same claim 
    (i.e. A claim for one session of 2 hours 30 minutes should be either Quantity = 1 Hours = 2:30 
    or Quantity = 2.5 and Hours = 1).

  UnitPrice - Price per unit sold or the hourly price of the service provided.
  Data type: Up to 8 Numeric and 2 decimal digits, e.g.: NNNNNNN.NN

  GSTCode - GST as applicable to the item or service. P1 = Tax Claimable (10%)
    P2 = GST Free
    P5 = GST out of Scope

  AuthorisedBy - Legacy data can be left blank
  ParticipantApproved - Legacy data, can be left blank
  InKindFundingProgram - Not Applicable

  ClaimType - Claim type of the service provided: 
  Data Type:
    “(Blank)” – Direct Service. You must leavefield blank.
    CANC: Cancellation 
    REPW: NDIA Required Report
    TRAN: Provider Travel 
    NF2F: Non-Face-to Face Services
    THLT: Telehealth Supports
    IRSS: Irregular SIL Supports

  CancellationReason - Reason of the cancellation type:
  Data Type:
    NSDH: No show due to health reason.
    NSDF: No show due to family issues.
    NSDT: No show due to unavailability of transport.
    NSDO: Other.

  ABN of Support Provider - It is the unique Australian Business Number (ABN) of the provider who 
  provided this support or service. The ABN is documented on the tax invoice, regular invoice or receipt 
  issued by the support provider.

*/



export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'invoice_id', title: 'ID' },
  { col_name: 'invoice_name', title: 'Name' },
  { col_name: 'funding_source_code', title: 'Funding Source' },
  { col_name: 'invoice_type', title: 'Type' },
  { col_name: 'invoice_date_added', title: 'Date Created', type: 'date' },
  { col_name: 'created_by', title: 'Created By' },
  { col_name: 'invoice_total_hours', title: 'Total Hours' },
  // { col_name: 'invoice_total_transport', title: 'Total Transport' },
  { col_name: 'invoice_total_amount', title: 'Total Amount', type: 'currency' },
  { col_name: 'status', title: 'Status' },
  { title:'Registration Number', col_name:'funding_source_registration_number' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'invoice_id',
  'invoice_name', 
  'funding_source_code',
  'invoice_type', 
  'invoice_date_added',
  //'created_by',
  'invoice_total_hours',
  // 'invoice_total_transport',
  'invoice_total_amount',
  'funding_source_registration_number',
  'action'
  //'status',
];
 
const clientFundingClaimList: ClientFundingClaim[] = [
  {
    invoice_id: "41230",  
    invoice_name: "NDIS - 2022-01-01 to 2022-06-01",  
    funding_source_id: "NDIS",
    funding_source_code: "NDIS",
    invoice_type: "Funding Claim",  
    invoice_date_added: 1655110992, 
    invoice_start_date: 1640966400,  
    invoice_end_date: 1641398400,
    time_created: '08:00',
    created_by: 'James Johnson',
    invoice_total_hours: 25,
    invoice_total_amount: 150,
  },

  {
    invoice_id: "41231",  
    invoice_name: "NDIS - 2021-01-01 to 2021-06-01",  
    funding_source_id: "NDIS",
    funding_source_code: "NDIS",
    invoice_type: "Funding Claim",  
    invoice_date_added: 1655110992, 
    invoice_start_date: 1609430400,  
    invoice_end_date: 1609862400,
    time_created: '08:00',
    created_by: 'James Johnson',
    invoice_total_hours: 25,
    invoice_total_amount: 150,
  },

  {
    invoice_id: "41232",  
    invoice_name: "NDIS - 2020-01-01 to 2020-06-01",  
    funding_source_id: "NDIS",
    funding_source_code: "NDIS",
    invoice_type: "Funding Claim",  
    invoice_date_added: 1655110992, 
    invoice_start_date: 1577808000,  
    invoice_end_date: 1578240000,
    time_created: '08:00',
    created_by: 'James Johnson',
    invoice_total_hours: 25,
    invoice_total_amount: 150,
  },

];


/**/
export interface GenerateClaim{
  ID: any;
  RegistrationNumber: number;
  NDISNumber: number;
  SupportsDeliveredFrom: Date;
  SupportsDeliveredTo: Date;
  SupportNumber: string;
  ClaimReference: string;
  Quantity?: number;
  Hours: string;
  UnitPrice: number;
  GSTCode: string;
  AuthorisedBy?: any;
  ParticipantApproved?: any;
  InKindFundingProgram?: any;
  ClaimType?: string;
  CancellationReason: string;
  'ABN of Support Provider': any;
}

export const generatedClaimList: GenerateClaim[] = [
  {
    ID: 1001,
    RegistrationNumber: 405556123,
    NDISNumber: 437855,
    SupportsDeliveredFrom: new Date("June 1, 2022"),
    SupportsDeliveredTo: new Date("June 1, 2022"),
    SupportNumber: "07_001_0106_8_3",
    ClaimReference: "11266345",
    Quantity: 2.0,
    Hours: "",
    UnitPrice: 150.55,
    GSTCode: "P2",
    AuthorisedBy: "",
    ParticipantApproved: "",
    InKindFundingProgram: "",
    ClaimType: "",
    CancellationReason: "",
    'ABN of Support Provider': "",
  },

  {
    ID: 1002,
    RegistrationNumber: 405556123,
    NDISNumber: 437855,
    SupportsDeliveredFrom: new Date("June 1, 2022"),
    SupportsDeliveredTo: new Date("June 1, 2022"),
    SupportNumber: "07_101_0106_6_3",
    ClaimReference: "612236345",
    Quantity: 3.0,
    Hours: "",
    UnitPrice: 450.55,
    GSTCode: "P2",
    AuthorisedBy: "",
    ParticipantApproved: "",
    InKindFundingProgram: "",
    ClaimType: "",
    CancellationReason: "",
    'ABN of Support Provider': "",
  },

  {
    ID: 1003,
    RegistrationNumber: 405556123,
    NDISNumber: 437855,
    SupportsDeliveredFrom: new Date("June 1, 2022"),
    SupportsDeliveredTo: new Date("June 1, 2022"),
    SupportNumber: "09_011_0125_6_3",
    ClaimReference: "342567771",
    Quantity: 1.0,
    Hours: "",
    UnitPrice: 280.55,
    GSTCode: "P2",
    AuthorisedBy: "",
    ParticipantApproved: "",
    InKindFundingProgram: "",
    ClaimType: "",
    CancellationReason: "",
    'ABN of Support Provider': "",
  },
];

export {
  displayedColumns,
  selectedColumns,
  clientFundingClaimList
}