export interface Policies {
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
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'charge_percentage', title: 'Charge Percentage' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'charge_percentage',
  'description',
  'action'
];
 
const cancellationList: Policies[] = [
  {
    id: "41230",  
    name: 'Sufficient Notice',
    charge_percentage: 0.00,  
    description: "Before 3pm the day before the service"
  },

  {
    id: "41231",  
    name: 'Short Notice',
    charge_percentage: 100.00,  
    description: "Less than 2 business days notice if shift less than 8 hours or $1000; Otherwise less than 5 business days notice;"
  },

  {
    id: "41232",  
    name: 'Short Notice 50% pay to staff',
    charge_percentage: 100.00,  
    description: "Charge client 100% and pay staff 50%"
  },
];

export {
  displayedColumns,
  selectedColumns,
  cancellationList
}