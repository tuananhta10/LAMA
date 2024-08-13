export interface CommunicationTemplate {
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
  { col_name: 'name', title: 'Template Name' },
  { col_name: 'communication_type', title: 'Communication Type' },
  { col_name: 'recipient_type', title: 'Recipient Type' },
  //{ col_name: 'created_by', title: 'Created By' },
  { col_name: 'date_added', title: 'Created On' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'communication_type',
  'recipient_type',
  //'created_by',
  'date_added',
  'action'
];
 
const groupList: CommunicationTemplate[] = [
];

export {
  displayedColumns,
  selectedColumns,
  groupList
}