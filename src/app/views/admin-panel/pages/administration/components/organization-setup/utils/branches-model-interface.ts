export interface BranchList {
  id: string;  
  name: string;  
  code: string;
  phone: string;
  email_address: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'code', title: 'Code' },
  { col_name: 'phone', title: 'Phone' },
  { col_name: 'email_address', title: 'Email' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',  
  'code',
  'phone',
  'email_address',
  'action'
];
 
const branchList: BranchList[] = [
  {
    id: "41230",  
    name: 'Branch 124 - Perth',  
    code: 'B124P',  
    phone: '045887945',  
    email_address: 'email_address@lama-care.com'
  },

  {
    id: "41231",  
    name: 'Branch 554 - Melbourne',  
    code: 'B554M',  
    phone: '087554698',  
    email_address: 'info@lama-care.com'
  },

  {
    id: "41232",  
    name: 'Branch 416 - Sydney',  
    code: 'B416S',  
    phone: '5570598456',  
    email_address: 'info@lama-care.com'
  },
];

export {
  displayedColumns,
  selectedColumns,
  branchList
}