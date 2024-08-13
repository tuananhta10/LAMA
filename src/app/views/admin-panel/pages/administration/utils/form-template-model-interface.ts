export interface FormTemplate {
  id: string;  
  condition: string;   
  name: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'condition', title: 'Disability' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'condition',
  'action'
];
 
const templateList: FormTemplate[] = [
  {
    id: "41230",  
    condition: "Intellectual condition",
    name: 'Form Template 1'
  },

  {
    id: "41231",  
    condition: "Autism",
    name: 'Form Template 2'
  },

  {
    id: "41232",  
    condition: "Autism",
    name: 'Form Template 3'
  },

  {
    id: "41233",  
    condition: "Cerebral palsy",
    name: 'Form Template 4'
  },

  {
    id: "41234",  
    condition: "Genetic conditions",
    name: 'Form Template 5'
  },
];

export {
  displayedColumns,
  selectedColumns,
  templateList
}