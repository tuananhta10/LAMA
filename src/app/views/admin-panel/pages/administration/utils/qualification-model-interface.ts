export interface Qualification {
  id: string;  
  qualification: string; 
  type: string;  
  description: string;  
  mandatory: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'qualification', title: 'Qualifications' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'mandatory', title: 'Mandatory' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'qualification',
  'type',
  'description',
  'mandatory',
  'action'
  //'status',
];
 
const qualificationList: Qualification[] = [
  {
    id: "41230",  
    qualification: "CERT in dementia",
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam',  
    mandatory: "Yes",  
    type: "Certification"
  },
  {
    id: "41231",  
    qualification: "Home and Community Care",
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam',  
    mandatory: "Yes",  
    type: "Certification"
  },
  {
    id: "41232",  
    qualification: "CERT in Disability",
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam',  
    mandatory: "Yes",  
    type: "Certification"
  },
];

export {
  displayedColumns,
  selectedColumns,
  qualificationList
}