export interface Organization {
  id: string;  
  organization_register: string; 
  phone: string; 
  email_address: string;
  website: string;
  suburb: string;
  address_1: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'organization_register', title: 'Organization' },
  { col_name: 'email_address', title: 'Email'},
  { col_name: 'website', title: 'Website'},
  { col_name: 'phone', title: 'Phone'},
  { col_name: 'suburb', title: 'Suburb'},
  { col_name: 'address_1', title: 'Address_1'},
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'organization_register',
  'email_address',
  'website',
  'phone',
  'suburb',
  'address_1',
  'action',
];
 
const organizationList: Organization[] = [
  {
    id: "41230",  
    organization_register: 'LAMA Org',
    phone: "315-2334-134",  
    email_address: "admin@lama-care.com",
    website: "www.lama-care.au",
    suburb: "Perth SA",
    address_1: "Perth SA, Australia",

  },

];

export {
  displayedColumns,
  selectedColumns,
  organizationList
}