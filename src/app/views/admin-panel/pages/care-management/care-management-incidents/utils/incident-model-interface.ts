export interface Incidents {
  id: string;  
  client_name: string;  
  type: string;  
  action_date: any;  
  date_received: any;  
  description: any;  
  employee: any;
  status: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'client_name', title: 'Participant' },
  { col_name: 'employee_name', title: 'Assigned Employee'},
  { col_name: 'type', title: 'Type' },
  { col_name: 'action_date', title: 'Action Date' },
  { col_name: 'date_received', title: 'Date Received' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  'client_name',
  'employee_name',
  'type',
  'action_date',
  'date_received',
  'description',
  'status',  
  'action'
];
 
// const incidentsList: Incidents[] = [
//   {
//     id: '111', 
//     client_name: 'Trudy Kim',  
//     type: 'Incident',  
//     action_date: '27-05-2021 15:31 PM',
//     date_received: '27-10-2021 15:30 PM',  
//     employee: 'James Anderson',
//     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
//     status: 'Resolved'
//   },

//   {
//     id: '112', 
//     client_name: 'James Johnson',  
//     type: 'Medical Incident',  
//     action_date: '27-05-2021 15:31 PM',
//     date_received: '27-10-2021 15:30 PM',  
//     employee: 'James Anderson',
//     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
//     status: 'Resolved'
//   },

//   {
//     id: '113', 
//     client_name: 'Sam Adrian',  
//     type: 'Accident',  
//     action_date: '01-05-2022 15:31 PM',
//     date_received: '01-10-2022 15:30 PM',  
//     employee: 'James Anderson',
//     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
//     status: 'Open'
//   },

//   {
//     id: '114', 
//     client_name: 'Sam Adrian',  
//     type: 'Complaint',  
//     action_date: '01-05-2022 15:31 PM',
//     date_received: '01-10-2022 15:30 PM',  
//     employee: 'James Anderson',
//     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
//     status: 'Undecided'
//   },

//   {
//     id: '115', 
//     client_name: 'Julius James',  
//     type: 'Accident',  
//     action_date: '01-05-2022 15:31 PM',
//     date_received: '01-10-2022 15:30 PM',  
//     employee: 'James Anderson',
//     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
//     status: 'Withdrawn'
//   },

//   {
//     id: '116', 
//     client_name: 'Elena Marks',  
//     type: 'Accident',  
//     action_date: '01-05-2022 15:31 PM',
//     date_received: '01-10-2022 15:30 PM',  
//     employee: 'James Anderson',
//     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
//     status: 'Withdrawn'
//   },

//   {
//     id: '117', 
//     client_name: 'Mark Adrian',  
//     type: 'Incident',  
//     action_date: '01-05-2022 15:31 PM',
//     date_received: '01-10-2022 15:30 PM',  
//     employee: 'James Anderson',
//     description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
//     status: 'No Action Required'
//   },
// ];

export {
  displayedColumns,
  selectedColumns,
}