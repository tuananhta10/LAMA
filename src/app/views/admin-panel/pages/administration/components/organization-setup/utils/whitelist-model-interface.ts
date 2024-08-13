export interface WhiteList {
  id: string;  
  name: string; 
  ip: string; 
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedIPColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'ip', title: 'IP Address'},
  { col_name: 'action', title: '' },
];

const selectedIPColumns: string[] =  [
  'id',
  'name',
  'ip',  
  'action'
];
 
const whiteList: WhiteList[] = [
  {
    id: "41230",  
    name: 'Administrator IP Local',
    ip: '125.115.0.1'
  },

];

export {
  displayedIPColumns,
  selectedIPColumns,
  whiteList
}