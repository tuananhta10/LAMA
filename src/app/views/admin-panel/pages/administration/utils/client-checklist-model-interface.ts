export interface ClientChecklist {
  id: string;  
  name: string;  
  funding_source_full_name: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'empty', title: ' ' },
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'funding_source_full_name', title: 'Funding Source' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'empty',
  'name',
  'funding_source_full_name',
  'action'
];
 
const checkList: ClientChecklist[] = [
  {
    id: "41230",  
    name: "NDIS",
    funding_source_full_name: "NDIS"
  },

  {
    id: "41231",  
    name: "CASH",
    funding_source_full_name: "CASH"
  },

  {
    id: "41232",  
    name: "PLAN",
    funding_source_full_name: "PLAN"
  },

];

export {
  displayedColumns,
  selectedColumns,
  checkList
}