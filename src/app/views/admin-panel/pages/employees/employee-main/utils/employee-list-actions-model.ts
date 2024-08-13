const displayedColumns: any[] = [
    { col_name: 'profile_pic_url', title: '  Profile' },
    { col_name: 'id', title: 'ID' },
    { col_name: 'payroll_id', title: 'Payroll ID' },
    { col_name: 'title', title: 'Title' },
    { col_name: 'first_name', title: 'First Name' },
    { col_name: 'last_name', title: 'Last Name' },
    { col_name: 'name', title: 'Name' },
    { col_name: 'age', title: 'Age' },
    { col_name: 'birthdate', title: 'Birth Date' },
    //{ col_name: 'birthplace', title: 'Birth Place' },
    { col_name: 'date_added', title: 'Entry Date' },
    { col_name: 'email_address', title: 'Email' },
    { col_name: 'home_phone_no', title: 'Home Phone' },
    { col_name: 'mobile_phone_no', title: 'Mobile Phone' },
    { col_name: 'work_phone_no', title: 'Work Phone' },
    { col_name: 'address_a', title: 'Address' },
    { col_name: 'address_b', title: 'Address B' },
    { col_name: 'suburb', title: 'Suburb' },
    { col_name: 'state', title: 'State' },
    { col_name: 'post_code', title: 'Postal' },
    { col_name: 'branch_name', title: 'Main Branch' },
    { col_name: 'gender', title: 'Gender' },
    { col_name: 'preferred_name', title: 'Nickname' },
    { col_name: 'type', title: 'Type' },
    { col_name: 'job_type', title: 'Job Type' },
    { col_name: 'job_description', title: 'Job Description' },
    { col_name: 'tasks_performed', title: 'Tasks Performed' },
    { col_name: 'employment_type', title: 'Employment' },
    { col_name: 'status', title: 'Status' },
    { col_name: 'interests', title: 'Interests' },
    { col_name: 'hobbies', title: 'Hobbies' },
    { col_name: 'skills', title: 'Skills' },
    { col_name: 'smokers', title: 'Smokers' },
    { col_name: 'allergies', title: 'Allergies' },
    { col_name: 'on_hold', title: 'On Hold' },
    { col_name: 'volunteer', title: 'Volunteer' },
    { col_name: 'member', title: 'Member' },
    { col_name: 'hourly_rate', title: 'Hourly Rate' },
    /*{ col_name: 'pay_travel_time', title: 'Pay Travel Time' },
    { col_name: 'pay_travel_mileage', title: 'Pay Travel Mileage' },
    { col_name: 'travel_distance', title: 'Travel Distance' },
    { col_name: 'travel_time', title: 'Travel Time' },*/
    { col_name: 'emergency_contact_email', title: 'Emergency Contact Email' },
    { col_name: 'emergency_contact_name', title: 'Emergency Contact Name' },
    { col_name: 'emergency_contact_relationship', title: 'Emergency Contact Relationship' },  
    { col_name: 'employee_position_display_name', title: 'Position' },  
    { col_name: 'action', title: '' },  
];

export const download_template: any[] = [
    //{ col_name: 'name', title: 'Name' },
    { col_name: 'first_name', title: 'First Name' },
    { col_name: 'last_name', title: 'Last Name' },
    { col_name: 'employee_position', title: 'Employee Position' },
    { col_name: 'employment_type', title: 'Employment Type' },
    { col_name: 'job_type', title: 'Job Type' },
    { col_name: 'email_address', title: 'Email' },
    { col_name: 'home_phone_no', title: 'Home Phone' },
    { col_name: 'mobile_phone_no', title: 'Mobile Phone' },
    { col_name: 'address', title: 'Address' },
    { col_name: 'suburb', title: 'Suburb' },
    { col_name: 'state', title: 'State' },
    { col_name: 'post_code', title: 'Postal' },
    { col_name: 'branch_name', title: 'Main Branch' },
    { col_name: 'date_started', title: 'Date Started' },
    { col_name: 'id', title: 'ID' },
];


export const sample_data_template = [
  {
    "first_name": "Mark ",
    "last_name": "Simpson",
    "employee_position": "Admin",
    "employment_type": "Full-Time",
    "job_type": "Support Service",
    "email_address": "mark.simpson@gmail.com",
    "home_phone_no": "4318416079",
    "mobile_phone_no": "44879554612",
    "address": "44 Market Street",
    "suburb": "Kensington",
    "state": "VIC",
    "post_code": "3031",
    "branch_name": "Main Branch",
    "date_started": "09/09/2021",
    "id": 9470
  },

  {
    "first_name": "Crimson",
    "last_name": "Couture",
    "employee_position": "Support Worker",
    "employment_type": "Casual",
    "job_type": "Operations",
    "email_address": "crimson.couture@gmail.com",
    "home_phone_no": "523455534",
    "mobile_phone_no": "12353466",
    "address": "44 Market Street",
    "suburb": "Kensington",
    "state": "VIC",
    "post_code": "3031",
    "branch_name": "Main Branch",
    "date_started": "09/09/2021",
    "id": 8799
  }
]


const selectedColumnFromStorage = localStorage.getItem('selected_employee_columns');

export const selectedColumnsProfile: string[] = [
  'id',
  'name',
  'email_address',
  'work_phone_no',
  'suburb',
  'address_a',
  'type',
  'job_description',
  'employment_type',
  'branch_name',
  //'status'
  //'action'
];


const selectedColumns: string[] = selectedColumnFromStorage 
? selectedColumnFromStorage.split(',') 
: [
    'profile_pic_url',
    //'age',
    //'id',
    'name',
    'email_address',
    //'work_phone_no',
    
    
    //'type',
    'job_type',
    'employment_type',
    'employee_position_display_name',
    'address_a',
    //'suburb',
    'branch_name',
    'status'
  ];

const selectedColumnsMobile: string[] = [
  'id',
  'name',
  'email_address',
  'work_phone_no',
  'suburb',
  'address_a',
  'type',
  'job_type',
  'employment_type',
  'employee_position_display_name',
  'status'
];



const displayedColumnsClients: any[] = [
    { col_name: 'id', title: 'ID' },
    { col_name: 'profile_image', title: 'Avatar' },
    { col_name: 'title', title: 'Title' },
    { col_name: 'first_name', title: 'Name' },
    { col_name: 'name', title: 'Name' },
    { col_name: 'age', title: 'Age' },
    { col_name: 'birthdate', title: 'Birth Date' },
    { col_name: 'birthplace', title: 'Birth Place' },
    { col_name: 'date_added', title: 'Entry Date' },
    { col_name: 'email', title: 'Email' },
    { col_name: 'home_phone_no', title: 'Home Phone' },
    { col_name: 'mobile_phone_no', title: 'Mobile Phone' },
    { col_name: 'work_phone_no', title: 'Work Phone' },
    { col_name: 'address', title: 'Address' },
    { col_name: 'suburb', title: 'Suburb' },
    { col_name: 'state', title: 'State' },
    { col_name: 'post_code', title: 'Postal' },
    { col_name: 'branch_name', title: 'Main Branch' },
    { col_name: 'preferred_gender', title: 'Gender' },
    { col_name: 'preferred_name', title: 'Nickname' },
    { col_name: 'primary_diagnosis', title: 'Primary Diagnosis' },    
    { col_name: 'type_of_service', title: 'Type of Service' },
    { col_name: 'occupation', title: 'Occupation' },
    { col_name: 'status', title: 'Status' },
    { col_name: 'delete', title: 'Delete'}
];


const selectedColumnFromStorageClients = localStorage.getItem('selected_employee_client_columns');

const selectedColumnsClients: string[] = /*selectedColumnFromStorageClients 
? selectedColumnFromStorageClients.split(',') 
: */[
    'profile_image',
    'name',
    'date_added',
    'email',
    'mobile_phone_no',
    'work_phone_no',
    'suburb',
    'branch_name',
    'delete'
  ];

const selectedColumnsMobileClients: string[] = [
  'id',
  'age',
  'name',
  'date_added',
  'email',
  'mobile_phone_no',
  'work_phone_no',
  'suburb',
  'branch_name',
];



const tableController: any = [
    {
      name:'Import',
      class: 'import',
      icon: '/assets/images/icons/import.png',
      action_event: (action_event) => action_event
    },

    {
      name:'Report',
      class: 'report',
      icon: '/assets/images/icons/report.png',
      action_event: (action_event) => action_event
    },
    
    {
      name:'Edit Columns',
      class: 'edit-column',
      icon: '/assets/images/icons/edit-column.png',
      action_event: (action_event) => action_event
    },
    /*
    {
      name:'Filter',
      class: 'filter',
      icon: '/assets/images/icons/filter.png',
      action_event: (action_event) => action_event
    },

    {
      name:'Mail Merge',
      class: 'mail-merge',
      icon: '/assets/images/icons/mail-merge.png',
      action_event: (action_event) => action_event
    },

    {
      name:'Import',
      class: 'import',
      icon: '/assets/images/icons/import.png',
      action_event: (action_event) => action_event
    },*/

    {
      name:'Delete',
      class: 'delete',
      icon: '/assets/images/icons/delete.png',
      action_event: (action_event) => action_event
    },
/*
    {
      name:'Export',
      class: 'export',
      icon: '/assets/images/icons/export.png',
      action_event: (action_event) => action_event
    },*/
];


export { 
  displayedColumns,
  selectedColumns,
  selectedColumnsMobile,

  displayedColumnsClients,
  selectedColumnsClients,
  selectedColumnsMobileClients,

  tableController
};