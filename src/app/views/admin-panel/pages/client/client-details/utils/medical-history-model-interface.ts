export interface MedicalHistory {
  id: string;  
  client_id: string;   
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'client_id', title: 'Client Id' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'client_id',
  'action'
  //'status',
];
 
const medicalHistoryList: MedicalHistory[] = [
  {
    id: "41230",  
    client_id: "2533311"
  },

  {
    id: "41231",  
    client_id: "2533312"
  },

  {
    id: "41232",  
    client_id: "2533313"
  },

  {
    id: "41233",  
    client_id: "2533314"
  },

  {
    id: "41234",  
    client_id: "2533315"
  },

  {
    id: "41235",  
    client_id: "2533316"
  },

  {
    id: "41236",  
    client_id: "2533317"
  },

  {
    id: "41238",  
    client_id: "2533319"
  },

  {
    id: "41240",  
    client_id: "2533320"
  },

  {
    id: "41241",  
    client_id: "2533321"
  },

  {
    id: "41242",  
    client_id: "2533322"
  },

  {
    id: "41243",  
    client_id: "2533323"
  },

  {
    id: "41244",  
    client_id: "2533324"
  },
];

export {
  displayedColumns,
  selectedColumns,
  medicalHistoryList
}