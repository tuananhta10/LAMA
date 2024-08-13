export interface ClientFunding {
  id: string;  
  name: string;  
  funding_source: string;
  funding_type: string;  
  start_date: string; 
  end_date: string;  
  budget: number;  
  allocated: number;   
  utilise_total: number;  
  balance: number;
  registration_number: string;  
  branch: string;
  status: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'funding_source', title: 'Funding<br> Source' },
  { col_name: 'funding_type', title: 'Type' },
  { col_name: 'start_date', title: 'Start Date' },
  { col_name: 'end_date', title: 'End Date' },
  { col_name: 'budget', title: 'Budget', type: 'currency' },
  { col_name: 'allocated', title: 'Allocated', type: 'currency' },
  { col_name: 'utilise_total', title: 'Utilized Total', type: 'currency' },
  { col_name: 'balance', title: 'Balance', type: 'currency' },
  { col_name: 'registration_number', title: 'Registration<br> Number' },
  { col_name: 'branch', title: 'Branch' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  //'name', 
  'funding_source',
  'funding_type', 
  'start_date',
  'end_date', 
  'budget',
  'allocated',
  'utilise_total',
  'balance',
  'registration_number',
  'branch',
  'action'
  //'status',
];
 
const clientFundingList: ClientFunding[] = [
  {
    id: "41230",  
    name: "Venus Lim",  
    funding_source: "Cash",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41231",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41232",  
    name: "Paul Jackson",  
    funding_source: "NDIS",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41233",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41234",  
    name: "Venus Lim",  
    funding_source: "Cash",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41235",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41236",  
    name: "Paul Jackson",  
    funding_source: "NDIS",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41237",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41238",  
    name: "Venus Lim",  
    funding_source: "Cash",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41239",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41240",  
    name: "Paul Jackson",  
    funding_source: "NDIS",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41241",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41242",  
    name: "Venus Lim",  
    funding_source: "Cash",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41243",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41244",  
    name: "Paul Jackson",  
    funding_source: "NDIS",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },

  {
    id: "41245",  
    name: "Venus Lim",  
    funding_source: "Plan",
    funding_type: "Individual",  
    start_date: "01-06-21", 
    end_date: "01-06-22",  
    budget: 5000,  
    allocated: 1123,   
    utilise_total: 3877,  
    balance: 3877,
    registration_number: "5578254422",  
    branch: "District",
    status: "Active",  
  },
];

export {
  displayedColumns,
  selectedColumns,
  clientFundingList
}