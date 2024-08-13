export interface FundingSource {
  id: string;  
  code: string;  
  full_name: string;  
  funding_source_provider: string;  
  self_funded: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'code', title: 'Code' },
  { col_name: 'full_name', title: 'Funding Name' },
  { col_name: 'funding_source_provider', title: 'Provider' },  
  { col_name: 'self_funded', title: 'Self Funded' },  
  { col_name: 'action', title: '' },

];

const selectedColumns: string[] =  [
  'id',
  'code',
  'full_name',
  'funding_source_provider',
  'self_funded',
  'action'
];
 
const fundingSourceList: FundingSource[] = [
  {
    id: "41230",  
    code: 'CASH',
    full_name: 'CASH',  
    funding_source_provider: 'Self Funded',  
    self_funded: 'Yes',
  },

  {
    id: "41231",  
    code: 'CASH',
    full_name: 'CASH',  
    funding_source_provider: 'Self Funded',  
    self_funded: 'Yes',
  },

  {
    id: "41232",  
    code: 'CASH',
    full_name: 'CASH',  
    funding_source_provider: 'Self Funded',  
    self_funded: 'Yes',
  },

  {
    id: "41233",  
    code: 'CASH',
    full_name: 'CASH',  
    funding_source_provider: 'Self Funded',  
    self_funded: 'Yes',
  },

  {
    id: "41234",  
    code: 'CASH',
    full_name: 'CASH',  
    funding_source_provider: 'Self Funded',  
    self_funded: 'Yes',
  },
];

export {
  displayedColumns,
  selectedColumns,
  fundingSourceList
}