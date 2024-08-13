export interface Interests {
  id: string;  
  name: string;  
  description: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'empty', title: ' ' },
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'empty',
  'name',
  'description',
  'action'
];
 
const interestList: Interests[] = [
  {
    id: "41230",  
    name: "Tennis",
    description: "Playing Tennis"
  },

  {
    id: "41231",  
    name: "Music Festivals",
    description: "Going to music festival events"
  },

  {
    id: "41232",  
    name: "Guitar",
    description: "Playing Guitar"
  },

  {
    id: "41233",  
    name: "Singing",
    description: "Karaoke and Singing"
  },

  {
    id: "41234",  
    name: "Basketball",
    description: "Playing Basketball"
  },

  {
    id: "41235",  
    name: "Automotive",
    description: "Cars and Trucks"
  },

  {
    id: "41236",  
    name: "Animals",
    description: "Dogs, Cats and other fluffy things"
  },
];

export {
  displayedColumns,
  selectedColumns,
  interestList
}