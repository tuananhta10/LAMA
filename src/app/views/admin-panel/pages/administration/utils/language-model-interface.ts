export interface Language {
  id: string;  
  code: string;   
  name: string;  
  icon: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'code', title: 'Code' },
  { col_name: 'icon', title: ' ' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'code',
  'icon',
  'name',
  'action'
];
 
const languageList: Language[] = [
  {
    id: "41230",  
    code: "EN",
    icon: '/assets/images/icons/currency-1.png',
    name: 'English'
  },

  {
    id: "41231",  
    code: "VI",
    icon: '/assets/images/icons/currency-2.png',
    name: 'Vietnamese'
  },

  {
    id: "41232",  
    code: "GR",
    icon: '/assets/images/icons/currency-3.png',
    name: 'Greek'
  },

  {
    id: "41233",  
    code: "ES",
    icon: '/assets/images/icons/currency-4.png',
    name: 'Spanish'
  },

  {
    id: "41234",  
    code: "MD",
    icon: '/assets/images/icons/currency-5.png',
    name: 'Mandarin'
  },
];

export {
  displayedColumns,
  selectedColumns,
  languageList
}