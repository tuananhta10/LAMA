export interface GoalTemplate {
  id: string;  
  instruction: string;   
  name: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'instruction', title: 'Instruction' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'instruction',
  'action'
];
 
const templateList: GoalTemplate[] = [
  {
    id: "41230",  
    instruction: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    name: 'Form Template 1'
  },

  {
    id: "41231",  
    instruction: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    name: 'Form Template 2'
  },

  {
    id: "41232",  
    instruction: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    name: 'Form Template 3'
  },

  {
    id: "41233",  
    instruction: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    name: 'Form Template 4'
  },

  {
    id: "41234",  
    instruction: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    name: 'Form Template 5'
  },
];

export {
  displayedColumns,
  selectedColumns,
  templateList
}