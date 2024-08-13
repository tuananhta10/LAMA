export interface EmployeeTask {
  id?: any;
  ndis_participant_number: string;  
  name: string;  
  address_a: string;  
  assigned_to: string[];  
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
  { col_name: 'ndis_funding', title: 'NDIS Funding' },
  { col_name: 'address_a', title: 'Address' },
  { col_name: 'referrer_full_name', title: 'Referred By'},
  { col_name: 'referral_date', title: 'Referral Date' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'name',
  
  //'profile_image',
  
  'email_address', 
  'ndis_participant_number',
  'ndis_funding',
  'disability_type',
  'address_a',
  'referrer_full_name',
  'referral_date', 
  'status',
  'action'
];
 
const employeeTaskList: EmployeeTask[] = [
  {
    ndis_participant_number: 'P23-4123-333',  
    name: 'Martin Manson',  
    address_a: 'Perth WA',  
    assigned_to: ['Mark Martines'],  
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
    assigned_to: ['Mark Martines', 'George Adams'],  
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

  {
    ndis_participant_number: 'P23-4123-335',  
    name: 'Andrea Sander',  
    address_a: 'Perth WA',  
    assigned_to: ['Mark Martines', 'George Adams'],  
    enquiry: 'Services',  
    profile_image: '/assets/images/faces/face-3.jpg',
    documents: ['sampledocs.png'],
    ndis_funding: 'Plan Managed',
    disability_type: 'Dementia',
    details: '24/7 supports in own home', 
    state: 'Referral Received',
    date_of_enquiry: 'March 3, 2022',
    priority_level: 'success'
  },

  {
    ndis_participant_number: 'P23-4123-334',  
    name: 'Maria Fondez',  
    address_a: 'Perth WA',
    assigned_to: ['Mark Martines', 'George Adams'],  
    enquiry: 'Services',  
    profile_image: '/assets/images/faces/face-4.jpg',
    documents: [],
    ndis_funding: 'Plan Managed',
    disability_type: 'Dementia',
    details: 'Coordination of Support Employee. Been in the service for 10 years.', 
    state: 'Contact Made',
    date_of_enquiry: 'January 7, 2022',
    priority_level: 'success'
  },

  {
    ndis_participant_number: 'P23-4123-335',  
    name: 'James Johnson',  
    address_a: 'Perth WA',
    assigned_to: ['Mark Martines', 'George Adams'],  
    enquiry: 'Services',  
    profile_image: '/assets/images/faces/face-6.jpg',
    documents: ['sampledocs.png'],
    ndis_funding: 'Plan Managed',
    disability_type: 'Psychosocial',
    details: 'Psychiatrist. For evaluating patients and been in the industry for 8 years.', 
    state: 'Intake Complete',
    date_of_enquiry: 'December 22, 2021',
    priority_level: 'danger'
  },

  {
    ndis_participant_number: 'P23-4123-336',  
    name: 'Karen Marina',  
    address_a: 'Perth WA',
    assigned_to: ['Mark Martines', 'George Adams', 'Anna Damien'],  
    enquiry: 'Support Coordination',  
    profile_image: '/assets/images/faces/face-5.jpg',
    documents: [],
    ndis_funding: 'Plan Managed',
    disability_type: 'Deaf',
    details: 'Support Coordinator for 15 years', 
    state: 'Intake Complete',
    date_of_enquiry: 'January 1, 2022',
    priority_level: 'warning'
  },

  {
    ndis_participant_number: 'P23-4123-337',  
    name: 'Miles Morales',  
    address_a: 'Perth WA',
    assigned_to: ['Mark Martines'],  
    enquiry: 'Services',  
    disability_type: 'Deaf',
    profile_image: '/assets/images/faces/face-7.jpg',
    documents: [],
    ndis_funding: 'Plan Managed',
    details: 'Support Coordinator for 15 years', 
    state: 'Onboard Complete',
    date_of_enquiry: 'January 7, 2022',
    priority_level: 'success'
  },

  {
    ndis_participant_number: 'P23-4123-445',  
    name: 'Athena Lane',  
    address_a: 'Perth WA',  
    assigned_to: ['Mark Martines', 'George Adams'],  
    enquiry: 'Services', 
    disability_type: 'Autism', 
    profile_image: '/assets/images/faces/face-8.jpg',
    documents: ['sampledocs.png'],
    ndis_funding: 'Plan Managed',
    details: 'Support Coordinator for 15 years', 
    state: 'Intake Scheduled',
    date_of_enquiry: 'March 3, 2022',
    priority_level: 'success'
  },

  {
    ndis_participant_number: 'P23-4123-434',  
    name: 'Holmes William',  
    address_a: 'Perth WA',
    assigned_to: ['Mark Martines', 'George Adams'],  
    enquiry: 'Services',  
    profile_image: '/assets/images/faces/face-9.jpg',
    documents: [],
    ndis_funding: 'Plan Managed',
    disability_type: 'Genetic Condition',
    details: 'Support Coordinator for 15 years', 
    state: 'Intake Scheduled',
    date_of_enquiry: 'January 7, 2022',
    priority_level: 'success'
  },
];

export {
  displayedColumns,
  selectedColumns,
  employeeTaskList
}