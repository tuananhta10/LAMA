export interface CommunicationTemplate {
  id: string;  
  type: string;   
  name: string;  
  table_id: any;  
  view_id: any;  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'table_id', title: 'Table Id' },
  { col_name: 'view_id', title: 'View Id' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'type',
  'table_id',  
  'view_id',
  'action'
];

export const employee_template: any[] = [
    { col_name: 'id', title: 'ID' },
    { col_name: 'payroll_id', title: 'Payroll ID' },
    { col_name: 'title', title: 'Title' },
    { col_name: 'first_name', title: 'First Name' },
    { col_name: 'last_name', title: 'Last Name' },
    { col_name: 'age', title: 'Age' },
    { col_name: 'birthdate', title: 'Birth Date' },
    { col_name: 'date_added', title: 'Entry Date' },
    { col_name: 'email_address', title: 'Email' },
    { col_name: 'home_phone_no', title: 'Home Phone' },
    { col_name: 'mobile_phone_no', title: 'Mobile Phone' },
    { col_name: 'work_phone_no', title: 'Work Phone' },
    { col_name: 'address_a', title: 'Address A' },
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
    { col_name: 'employment_type', title: 'Employment Type' },
    { col_name: 'employee_position_display_name', title: 'Employee Position' },  
    { col_name: 'interests', title: 'Interests' },
    { col_name: 'hobbies', title: 'Hobbies' },
    { col_name: 'skills', title: 'Skills' },
    { col_name: 'emergency_contact_email', title: 'Emergency Contact Email' },
    { col_name: 'emergency_contact_name', title: 'Emergency Contact Name' },
    { col_name: 'emergency_contact_relationship', title: 'Emergency Contact Relationship' },  
    { col_name: 'status', title: 'Status' },
];

export const participant_template: any[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'title', title: 'Title' },
  { col_name: 'first_name', title: 'First Name' },
  { col_name: 'last_name', title: 'Last Name' },
  { col_name: 'age', title: 'Age' },
  { col_name: 'birthdate', title: 'Birth Date' },
  { col_name: 'birthplace', title: 'Birth Place' },
  { col_name: 'entry_date', title: 'Entry Date' },
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
  { col_name: 'type_of_service', title: 'Type of Service' },
  { col_name: 'religion_name', title: 'Religion' },
  { col_name: 'citizenship', title: 'Citizenship' },
  { col_name: 'disability_type', title: 'Disability Type' },
  { col_name: 'condition_description', title: 'Disability Type Description' },
  { col_name: 'preferred_careworker', title: 'Preferred Careworker' },
  { col_name: 'service_required', title: 'Service Required' },
  { col_name: 'service_location', title: 'Service Location' },
  { col_name: 'last_service_date', title: 'Last Service Date' },
  { col_name: 'end_service_date', title: 'End Service Date' },
  { col_name: 'risk_notification', title: 'Risk Notification' },
  { col_name: 'care_notes', title: 'Care Notes' },
  { col_name: 'general_notes', title: 'Generate Notes' },
  { col_name: 'client_care_notes', title: 'Client Care Notes' },
  { col_name: 'background', title: 'Background' },
  { col_name: 'ndis_number', title: 'NDIS Number' },
  { col_name: 'status', title: 'Status' },
];
 
const templateList: CommunicationTemplate[] = [
  {
    id: "41230",  
    name: 'Service Schedule',
    type: "Meeting",
    table_id: '22',
    view_id: '55'
  },

  {
    id: "41231",  
    name: 'New Shift Email Notification',
    type: "Email",
    table_id: '51',
    view_id: '13'
  },

  {
    id: "41232",  
    name: 'Incident Email Notification',
    type: "Email",
    table_id: '53',
    view_id: '11'
  },

  {
    id: "41233",  
    name: 'General Notification',
    type: "Email",
    table_id: '51',
    view_id: '13'
  },

  {
    id: "41234",  
    name: 'Happy Birthday',
    type: "Meeting",
    table_id: '24',
    view_id: ''
  },

  {
    id: "41235",  
    name: 'Shift Available',
    type: "Task",
    table_id: '35',
    view_id: ''
  },
];

export {
  displayedColumns,
  selectedColumns,
  templateList
}