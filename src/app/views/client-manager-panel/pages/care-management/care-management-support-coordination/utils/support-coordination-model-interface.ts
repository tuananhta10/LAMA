export interface SupportCoordination {
  id: string;  
  client: string;  
  engagement_date: string;  
  version_numberr: string;  
  current_version: string;  
  disability: string;
  managing_person: string;  
  name: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'client', title: 'Client' },
  { col_name: 'engagement_date', title: 'Engagement Date' },
  { col_name: 'version_numberr', title: 'Version' },
  { col_name: 'current_version', title: 'Current Version' },
  { col_name: 'disability', title: 'Disability/Condition' },
  { col_name: 'managing_person', title: 'Managing Person' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  'client',  
  'engagement_date',  
  'version_numberr',  
  'current_version',  
  'disability',
  'managing_person',  
  'name',
  'action'
];
 
const supportList: SupportCoordination[] = [
  {
    id: '111', 
    client: 'Trudy Kim',  
    engagement_date: '22-05-2021',  
    version_numberr: '1.0',  
    current_version: '1.0',  
    disability: 'Dementia',
    managing_person: 'Adrian Morales',  
    name: 'Trudy Kim',  
  },
  
  {
    id: '112', 
    client: 'James Damien',  
    engagement_date: '22-05-2021',  
    version_numberr: '1.0',  
    current_version: '1.0',  
    disability: 'Depression',
    managing_person: 'Adrian Morales',  
    name: 'James Damien',  
  },

  {
    id: '113', 
    client: 'Ashley Kenedy',  
    engagement_date: '22-05-2021',  
    version_numberr: '1.0',  
    current_version: '1.0',   
    disability: 'Anxiety',
    managing_person: 'Julius Augustus',  
    name: 'Ashley Kenedy',  
  },

  {
    id: '114', 
    client: 'Harry James',  
    engagement_date: '22-05-2021',  
    version_numberr: '1.0',  
    current_version: '1.0',   
    disability: 'Mild Blindness',
    managing_person: 'Julius Augustus',  
    name: 'Harry James', 
  },

  {
    id: '115', 
    client: 'Trudy Mindy',  
    engagement_date: '22-05-2021',  
    version_numberr: '1.0',  
    current_version: '1.0',  
    disability: 'Anxiety',
    managing_person: 'Julius Augustus',  
    name: 'Trudy Mindy'
  },
];

export {
  displayedColumns,
  selectedColumns,
  supportList
}