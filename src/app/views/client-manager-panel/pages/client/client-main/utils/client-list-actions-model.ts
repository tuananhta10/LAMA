const displayedColumns: any[] = [
  { col_name: 'profile_pic_url', title: '  Profile' },
  { col_name: 'id', title: 'ID' },
  { col_name: 'title', title: 'Title' },
  { col_name: 'first_name', title: 'Name' },
  { col_name: 'age', title: 'Age' },
  { col_name: 'birthdate', title: 'Birth Date' },
  { col_name: 'birthplace', title: 'Birth Place' },
  { col_name: 'date_added', title: 'Entry Date' },
  { col_name: 'email_address', title: 'Email' },
  { col_name: 'home_phone_no', title: 'Home Phone' },
  { col_name: 'mobile_phone_no', title: 'Mobile Phone' },
  { col_name: 'work_phone_no', title: 'Work Phone' },
  { col_name: 'address', title: 'Address' },
  { col_name: 'suburb', title: 'Suburb' },
  { col_name: 'state', title: 'State' },
  { col_name: 'post_code', title: 'Postal' },
  { col_name: 'branch_name', title: 'Main Branch' },
  { col_name: 'gender', title: 'Gender' },
  { col_name: 'preferred_name', title: 'Nickname' },
  { col_name: 'primary_diagnosis', title: 'Primary Diagnosis' },    
  { col_name: 'type_of_service', title: 'Type of Service' },
  { col_name: 'occupation', title: 'Occupation' },
  { col_name: 'religion_name', title: 'Religion' },
  { col_name: 'citizenship', title: 'Citizenship' },
  { col_name: 'disability_type', title: 'Disability Type' },
  { col_name: 'condition_description', title: 'Disability Type Description' },
  { col_name: 'preferred_careworker', title: 'Preferred Careworker' },
  { col_name: 'program_name', title: 'Program Name' },
  { col_name: 'pm_require_approval', title: 'PM Require Approval' },
  { col_name: 'service_required', title: 'Service Required' },
  { col_name: 'service_location', title: 'Service Location' },
  { col_name: 'last_service_date', title: 'Last Service Date' },
  { col_name: 'end_service_date', title: 'End Service Date' },
  { col_name: 'minimum_classification_name', title: 'Minimum Classification Name' },
  { col_name: 'exit_date', title: 'Exit Date' },
  { col_name: 'risk_notification', title: 'Risk Notification' },
  { col_name: 'status', title: 'Status' },
];


const selectedColumnFromStorage = localStorage.getItem('selected_client_columns');

const selectedColumns: string[] = selectedColumnFromStorage 
? selectedColumnFromStorage.split(',') 
: [
    'profile_pic_url',
    'id',
    'first_name',
    'date_added',
    'email_address',
    'mobile_phone_no',
    'disability_type',
    'suburb',
    'branch_name',
    'status'
  ];

const selectedColumnsMobile: string[] = [
  'id',
  'age',
  'first_name',
  'date_added',
  'email_address',
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
      name:'Edit Columns',
      class: 'edit-column',
      icon: '/assets/images/icons/edit-column.png',
      action_event: (action_event) => action_event
    },

    /*{
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
	tableController
};