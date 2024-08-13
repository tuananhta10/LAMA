export interface ExternalProvider {
  id: string;  
  name: string;  
  charge_percentage: number;  
  description: string;
  charge_to_clients?: any;
  pay_employees?: any; 
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: any;
  classStyle?: any
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'full_name', title: 'Name' },
  { col_name: 'services_provided', title: 'Services Provided' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'phone', title: 'Phone' },
  { col_name: 'email', title: 'Email', type: 'email', classStyle: 'text-lowercase' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'full_name',
  'type',
  'services_provided',
  'phone',
  'email',
  'action'
];
 
const externalProviderList: ExternalProvider[] = [];

export {
  displayedColumns,
  selectedColumns,
  externalProviderList
}