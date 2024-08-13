export interface Branch {
  id: string;  
  name: string; 
  phone: string; 
  email_address: string;
  timezone: string;
  suburb: string;
  address_a: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Branch' },
  { col_name: 'email_address', title: 'Email'},
  { col_name: 'timezone', title: 'Timezone'},
  { col_name: 'phone', title: 'Phone'},
  { col_name: 'suburb', title: 'Suburb'},
  { col_name: 'state', title: 'State'},
  { col_name: 'post_code', title: 'Post Code'},
  { col_name: 'address_a', title: 'Address'},
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'email_address',
  'timezone',
  'phone',
  'address_a',
  'suburb',
  'state',
  'post_code',
  'action',
];
 
const branchList: Branch[] = [
  {
    id: "41230",  
    name: 'LAMA Org',
    phone: "315-2334-134",  
    email_address: "admin@lama-care.com",
    timezone: "www.lama-care.au",
    suburb: "Perth SA",
    address_a: "Perth SA, Australia",

  },

];

export {
  displayedColumns,
  selectedColumns,
  branchList
}