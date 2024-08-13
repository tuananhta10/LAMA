export interface EmployeeTraining {
  id: string;  
  employee: string;  
  qualification: string;  
  completion_date: string; 
  description: any[]; 
  status: string;  
  expiry_date: string;  
  attachment: any[];
  label_style: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'employee', title: 'Employee Name' },
  { col_name: 'qualification', title: 'Qualification' },
  { col_name: 'completion_date', title: 'Completion Date' },
  { col_name: 'expiry_date', title: 'Expiry Date' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'employee',
  'qualification',
  'completion_date',
  'expiry_date',
  'status',
  'action'
];
 
const trainingList: EmployeeTraining[] = [
  {
    id: '10011', 
    employee:'Hailey Cruz',
    qualification: 'Australian Birth Certificate',
    completion_date: '07-03-2020',
    description: [],
    status: 'Completed',
    expiry_date:'21-03-2022',
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10012', 
    employee:'Hailey Cruz',
    qualification: 'Australian Citizenship Certificate',
    completion_date: '10-03-2020',
    description: ['Submit Documents', `Submit Valid ID's`],
    status: 'In Progress',
    expiry_date:'21-03-2022',
    attachment: [],
    label_style: 'success',
  },

  {
    id: '10013', 
    employee:'Hailey Cruz',
    qualification: 'Code of Conduct',
    completion_date: '11-03-2020',
    description: [],
    status: 'In Progress',
    expiry_date:'21-03-2022',
    attachment: ['url', 'url'],
    label_style: 'success',
  },

  {
    id: '10014', 
    employee:'Hailey Cruz',
    qualification: 'CPR',
    completion_date: '05-03-2020',
    description: [],
    status: 'Completed',
    expiry_date:'21-03-2022',
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10015', 
    employee:'Hailey Cruz',
    qualification: 'Employee Handbook',
    completion_date: '12-03-2020',
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, sodales eget nisi '],
    status: 'Completed',
    expiry_date:'21-03-2022',
    attachment: ['url', 'url'],
    label_style: 'warning',
  },

  {
    id: '10016', 
    employee:'Hailey Cruz',
    qualification: 'First Aid',
    completion_date: '11-03-2020',
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, sodales eget nisi '],
    status: 'Completed',
    expiry_date:'21-03-2022',
    attachment: ['url', 'url'],
    label_style: 'success',
  },

  {
    id: '10017', 
    employee:'Hailey Cruz',
    qualification: 'Flu Vaccination Certificate',
    completion_date: '09-03-2020',
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, sodales eget nisi '],
    status: 'Planned',
    expiry_date:'21-03-2022',
    attachment: ['url', 'url'],
    label_style: 'danger',
  },

  {
    id: '10018', 
    employee:'Hailey Cruz',
    qualification: 'ID Drivers Licence',
    completion_date: '09-03-2020',
    //description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, sodales eget nisi '],
    description: ['Road and Drive Test', 'Submit Documents', `Submit Valid Government ID's`],
    status: 'Expired',
    expiry_date:'21-03-2022',
    attachment: ['url', 'url'],
    label_style: 'danger',
  },
];

export {
  displayedColumns,
  selectedColumns,
  trainingList
}