export interface ExpenseTypes {
  id: string;  
  name: string;  
  code: string;
  category: string;
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
  { col_name: 'code', title: 'Code' },
  { col_name: 'category', title: 'Category' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'code',  
  'category',  
  'description',
  'action'
];
 
const expenseList: ExpenseTypes[] = [
  {
    id: "41230",  
    name: "Travel Expense",
    code: "EXP001",
    category: "Travel",
    description: "Travel and Navigation",
  },

  {
    id: "41231",  
    name: "Meal Expense",
    code: "EXP002",
    category: "Meal",
    description: "",
  },

  {
    id: "41232",  
    name: "Entertainment Expense",
    code: "EXP003",
    category: "Entertainment",
    description: "",
  },

  {
    id: "41233",  
    name: "Medicine Expense",
    code: "EXP004",
    category: "Medicine",
    description: "On hand medicines for clients",
  },

  {
    id: "41234",  
    name: "Overtime Expense",
    code: "EXP005",
    category: "Overtime Payment",
    description: "",
  },
];

export {
  displayedColumns,
  selectedColumns,
  expenseList
}