export interface NeedsAssessments {
  id: string;  
  client: string;  
  condition: string;  
  funding_submitted: string;  
  date_submitted: string;  
  funding_approved: string;
  date_approved: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'client', title: 'Client' },
  { col_name: 'condition', title: 'Condition' },
  { col_name: 'funding_submitted', title: 'Funding Submitted' },
  { col_name: 'date_submitted', title: 'Date Submitted' },
  { col_name: 'funding_approved', title: 'Funding Approved' },
  { col_name: 'date_approved', title: 'Date Approved' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  'client',  
  'condition',  
  'funding_submitted',  
  'date_submitted',  
  'funding_approved',
  'date_approved',  
  'action'
];
 
const needsAssessmentsList: NeedsAssessments[] = [
  {
    id: '111', 
    client: 'Trudy Kim',  
    condition: 'Dementia',  
    funding_submitted: 'Yes',  
    date_submitted: '22-05-2021',  
    funding_approved: 'No',
    date_approved: '22-11-2021',  
  },
  
  {
    id: '112', 
    client: 'James Damien',  
    condition: 'Depression',  
    funding_submitted: 'Yes',  
    date_submitted: '22-05-2021',  
    funding_approved: 'No',
    date_approved: '22-11-2021',  
  },

  {
    id: '113', 
    client: 'Ashley Kenedy',  
    condition: 'Anxiety',  
    funding_submitted: 'Yes',  
    date_submitted: '22-05-2021',  
    funding_approved: 'Yes',
    date_approved: '22-11-2021',  
  },

  {
    id: '114', 
    client: 'Harry James',  
    condition: 'Mild Blindness',  
    funding_submitted: 'Yes',  
    date_submitted: '22-05-2021',  
    funding_approved: 'Yes',
    date_approved: '22-11-2021',  
  },

  {
    id: '115', 
    client: 'Trudy Mindy',  
    condition: 'Dementia',  
    funding_submitted: 'Yes',  
    date_submitted: '22-05-2021',  
    funding_approved: 'No',
    date_approved: '22-11-2021',  
  },
];

export {
  displayedColumns,
  selectedColumns,
  needsAssessmentsList
}