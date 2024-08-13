export interface SosNumbers {
  id: string;  
  title: string;  
  phone_number: string;
  description: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'title', title: 'Title' },
  { col_name: 'phone_number', title: 'Phone Number' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'title',
  'phone_number',
  'description',
  'action'
];
 
const sosNumberList: SosNumbers[] = [
  {
    id: "41230",  
    title: "Police Station",
    phone_number: "911",
    description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium "
  },

  {
    id: "41231",  
    title: "Fire Station",
    phone_number: "117",
    description: "Nemo enim ipsam voluptatem quia voluptas sit"
  },

  {
    id: "41232",  
    title: "Martin Luther - Main Support Coordinator",
    phone_number: "554-1534-254",
    description: "Qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit"
  },

  {
    id: "41233",  
    title: "NDIS President",
    phone_number: "413-1444-153",
    description: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil"
  },
];

export {
  displayedColumns,
  selectedColumns,
  sosNumberList
}