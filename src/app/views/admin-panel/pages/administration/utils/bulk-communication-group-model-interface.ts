export interface CommunicationGroup {
  id: string;  
  name: string;  
  communication_type: string;  
  recipient_type: string;  
  list_type: string;  
  created_by: string;  
  created_on: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'communication_type', title: 'Communication Type' },
  { col_name: 'recipient_type', title: 'Recipient Type' },
  { col_name: 'description', title: 'Description' },
  //{ col_name: 'created_by', title: 'Created By' },
  { col_name: 'date_added', title: 'Created On' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'communication_type',
  'recipient_type',
  'description',
  //'created_by',
  'date_added',
  'action'
];
 
const groupList: CommunicationGroup[] = [
  {
    id: "41230",  
    name: "D360 SW Perth",
    communication_type: "Email",
    recipient_type: "Employees",  
    list_type: "Dynamic",  
    created_by: "Samson Julius",  
    created_on: "05/02/2021 5:30:50 PM"
  },

  {
    id: "41231",  
    name: "D361 SW Perth",
    communication_type: "Email",
    recipient_type: "Employees",  
    list_type: "Dynamic",  
    created_by: "Samson Julius",  
    created_on: "05/02/2021 5:30:50 PM"
  },

  {
    id: "41233",  
    name: "D362 SW Perth",
    communication_type: "Email",
    recipient_type: "Employees",  
    list_type: "Dynamic",  
    created_by: "Samson Julius",  
    created_on: "05/02/2021 5:30:50 PM"
  },

  {
    id: "41234",  
    name: "D363 SW Perth",
    communication_type: "Email",
    recipient_type: "Clients",  
    list_type: "Dynamic",  
    created_by: "Samson Julius",  
    created_on: "05/02/2021 5:30:50 PM"
  },
];

export {
  displayedColumns,
  selectedColumns,
  groupList
}