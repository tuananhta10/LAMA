export interface StaffWarning {
  id: string;  
  name: string;  
  warning_number: string;  
  communicated_by: string;  
  status: string;  
  next_review: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'warning_number', title: 'Warning Number' },
  { col_name: 'communicated_by', title: 'Communicated By' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'next_review', title: 'Next Review' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'warning_number',
  'communicated_by',
  'next_review',
  'status',
  'action'
];
 
const staffWarningList: StaffWarning[] = [
  {
    id: '10011', 
    name:'Test Value',
    warning_number: 'Test Value',
    communicated_by: 'Test Value',
    status: 'Active',
    next_review:'Test Value',
  },

  {
    id: '10012', 
    name:'Test Value',
    warning_number: 'Test Value',
    communicated_by: 'Test Value',
    status: 'Active',
    next_review:'Test Value',
  },

  {
    id: '10013', 
    name:'Test Value',
    warning_number: 'Test Value',
    communicated_by: 'Test Value',
    status: 'Active',
    next_review:'Test Value',
  },

  {
    id: '10014', 
    name:'Test Value',
    warning_number: 'Test Value',
    communicated_by: 'Test Value',
    status: 'Active',
    next_review:'Test Value',
  },

  {
    id: '10015', 
    name:'Test Value',
    warning_number: 'Test Value',
    communicated_by: 'Test Value',
    status: 'Active',
    next_review:'Test Value',
  },

  {
    id: '10016', 
    name:'Test Value',
    warning_number: 'Test Value',
    communicated_by: 'Test Value',
    status: 'Active',
    next_review:'Test Value',
  },
];

export {
  displayedColumns,
  selectedColumns,
  staffWarningList
}