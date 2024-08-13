export interface EmployeeTask {
  id?: any;
  ndis_participant_number: string;  
  name: string;  
  address_a: string;  
  email_address?: string;
  enquiry: string;  
  profile_image: string;
  documents: string[];
  save_template?: boolean;
  details: string; 
  disability_type: string;
  state: string;  
  date_of_enquiry: string;  
  priority_level: string;
  ndis_funding: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'ndis_participant_number', title: 'NDIS Number' },
  { col_name: 'profile_image', title: '' },
  { col_name: 'name', title: 'Participant Name' },
  { col_name: 'email_address', title: 'Email'},
  { col_name: 'disability_type', title: 'Primary Diagnosis' },
  { col_name: 'ndis_funding', title: 'Funding Type' },
  { col_name: 'address_a', title: 'Address' },
  { col_name: 'state', title: 'State' },
  { col_name: 'employee_name', title: 'Assigned Staff'},
  { col_name: 'referral_date', title: 'Referral Date' },
  { col_name: 'branch_name', title: 'Branch' },  
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'name',
  
  //'profile_image',
  
  'email_address', 
  'branch_name',
  //'ndis_participant_number',
  'ndis_funding',
  'disability_type',
  //'address_a',
  'employee_name',
  'referral_date', 
  'status',
  'action'
];
 
const employeeTaskList: EmployeeTask[] = [
  {
    ndis_participant_number: 'P23-4123-333',  
    name: 'Martin Manson',  
    address_a: 'Perth WA',  
    enquiry: 'Support Coordination',  
    profile_image: '/assets/images/faces/face-1.jpg',
    documents: [],
    ndis_funding: 'Plan Managed',
    disability_type: 'Deaf',
    details: 'Support Coordinator for 15 years', 
    state: 'Referral Received',
    date_of_enquiry: 'February 8, 2022',
    priority_level: 'warning'
  },

  {
    ndis_participant_number: 'P23-4123-332',  
    name: 'Finick Gardon',  
    address_a: 'Perth WA',    
    enquiry: 'Support Coordination',  
    profile_image: '/assets/images/faces/face-2.jpg',
    documents: ['sampledocs.png'],
    ndis_funding: 'Plan Managed',
    disability_type: 'Stroke',
    details: '4 hrs Support per day in-home and to access community', 
    state: 'Referral Received',
    date_of_enquiry: 'February 25, 2022',
    priority_level: 'warning'
  },

  
];

export {
  displayedColumns,
  selectedColumns,
  employeeTaskList
}