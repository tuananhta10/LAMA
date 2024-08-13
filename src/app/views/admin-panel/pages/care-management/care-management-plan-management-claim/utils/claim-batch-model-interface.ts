export interface SupportCoordination {
  id: string;  
  name: string;  
  batch_total: any;  
  invoice_count: any;  
  status: string;  
  remittance_sent: string;  
  payment_amount_received: string;  
  invoice_with_rejections: string;  
  created_by: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'batch_total', title: 'Batch Total' },
  { col_name: 'invoice_count', title: 'Invoice Count' },
  { col_name: 'remittance_sent', title: 'Remittance Sent' },
  { col_name: 'payment_amount_received', title: 'Payment Amount Received' },
  { col_name: 'invoice_with_rejections', title: 'Invoice with Rejections' },
  { col_name: 'created_by', title: 'Created By' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },

];

const selectedColumns: string[] =  [
  'id', 
  'name',  
  'batch_total',
  'invoice_count',
  'remittance_sent',
  'payment_amount_received',
  'invoice_with_rejections',
  'created_by',
  'status',
  'action'
];
 
const supportList: SupportCoordination[] = [
  {
    id: '111', 
    name: 'Test Claim',  
    batch_total: '20',  
    invoice_count: '10',  
    remittance_sent: '5',  
    payment_amount_received: '0',
    invoice_with_rejections: '0',  
    created_by: 'Trudy Kim',  
    status: 'In-Progress',  
  },

];

export {
  displayedColumns,
  selectedColumns,
  supportList
}