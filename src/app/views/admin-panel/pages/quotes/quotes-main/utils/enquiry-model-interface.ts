export interface EmployeeTask {
  id: string;  
  first_name: string;  
  last_name: string;
  email_address: string;
  phone: string;
  funding_source: string;
  source: string;
  suburb: string;
  approval_stage: string;
  created_date: any;  
  follow_up_date: any;  
  total_amount: any;  
  total_hours: any;  
  branch: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'first_name', title: 'First Name' },
  { col_name: 'last_name', title: 'Last Name' },
  { col_name: 'email_address', title: 'Email Address' },
  { col_name: 'phone', title: 'Phone' },
  { col_name: 'funding_source', title: 'Funding Source' },
  { col_name: 'source', title: 'Source' },
  { col_name: 'suburb', title: 'Suburb' },
  { col_name: 'approval_stage', title: 'Approval Stage' },
  { col_name: 'created_date', title: 'Created Date' },
  { col_name: 'follow_up_date', title: 'Follow Up Date' },
  { col_name: 'total_amount', title: 'Total Amount' },
  { col_name: 'total_hours', title: 'Total Hours' },
  { col_name: 'branch', title: 'Branch' },
];

const selectedColumns: string[] =  [
  'id', 
  'first_name',  
  'last_name',
  'email_address',
  'phone',
  'funding_source',
  'source',
  'suburb',
  'approval_stage',
  'created_date', 
  'follow_up_date',  
  'total_amount', 
  'total_hours', 
  'branch' 
];
 
const employeeTaskList: EmployeeTask[] = [
  {
    id: '480',  
    first_name: 'Vicki',  
    last_name: 'Smith',
    email_address: 'vicki.smith@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '481',  
    first_name: 'George',  
    last_name: 'Samson',
    email_address: 'george.s@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '482',  
    first_name: 'Sander',  
    last_name: 'Daniel',
    email_address: 'sanderdnl@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '483',  
    first_name: 'Vicki',  
    last_name: 'Smith',
    email_address: 'vicki.smith@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '484',  
    first_name: 'George',  
    last_name: 'Samson',
    email_address: 'george.s@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '485',  
    first_name: 'Sander',  
    last_name: 'Daniel',
    email_address: 'sanderdnl@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '486',  
    first_name: 'Vicki',  
    last_name: 'Smith',
    email_address: 'vicki.smith@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '487',  
    first_name: 'George',  
    last_name: 'Samson',
    email_address: 'george.s@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '488',  
    first_name: 'Sander',  
    last_name: 'Daniel',
    email_address: 'sanderdnl@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '489',  
    first_name: 'Vicki',  
    last_name: 'Smith',
    email_address: 'vicki.smith@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '490',  
    first_name: 'George',  
    last_name: 'Samson',
    email_address: 'george.s@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },

  {
    id: '491',  
    first_name: 'Sander',  
    last_name: 'Daniel',
    email_address: 'sanderdnl@gmail.com',
    phone: '423556621',
    funding_source: 'NDIS',
    source: 'Manually',
    suburb: 'JOJONUP',
    approval_stage: 'Approval Stage',
    created_date: '19-01-2022',  
    follow_up_date: '19-01-2022',  
    total_amount: '3,000',  
    total_hours: '6hrs',  
    branch: 'Branch', 
  },
];

export {
  displayedColumns,
  selectedColumns,
  employeeTaskList
}