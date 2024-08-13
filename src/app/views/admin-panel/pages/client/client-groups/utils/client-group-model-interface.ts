export interface ClientGroup {
  id: any;  
  name: string;  
  main_branch_id: any;
  branch_name: string;
  default_service_type: any;  
  default_group_fund: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Group Name' },
  { col_name: 'branch_name', title: 'Branch' },
  { col_name: 'main_branch_id', title: 'Branch ID' },
  { col_name: 'default_service_type', title: 'Default Service Type' },
  { col_name: 'default_group_fund', title: 'Default Group Funds' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name', 
  'branch_name',  
  //'default_service_type',  
  //'default_group_fund',
  'action'
  //'status',
];
 
const clientGroupList: ClientGroup[] = [
  {
    id: 1001,
    name: 'Art and Creativity',  
    branch_name: 'Main Branch',
    main_branch_id: 0,
    default_service_type: null,  
    default_group_fund: null,
  },

  {
    id: 1002,
    name: 'District 360 Team',  
    branch_name: 'Main Branch',
    main_branch_id: 0,
    default_service_type: null,  
    default_group_fund: null,
  },

  {
    id: 1003,
    name: 'Grow Group',  
    branch_name: 'Main Branch',
    main_branch_id: 0,
    default_service_type: null,  
    default_group_fund: null,
  },

  {
    id: 1004,
    name: 'Recreation Groups',  
    branch_name: 'Main Branch',
    main_branch_id: 0,
    default_service_type: null,  
    default_group_fund: null,
  },
];

export {
  displayedColumns,
  selectedColumns,
  clientGroupList
}