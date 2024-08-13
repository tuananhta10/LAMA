export interface EmployeeTask {
  id: string;  
  template: string;
  task_name: string;  
  description: string[];  
  assigned_to: string[];  
  related_goal: string;  
  link_to_a_shift: string;
  documents: string[];
  save_template?: boolean;
  completion_date: string; 
  status: string;  
  due_date: string;  
  priority_level: string;
}


export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'task_name', title: 'Task Name' },
  { col_name: 'employee_name', title: 'Assigned To' },
  { col_name: 'due_date', title: 'Due Date' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  'task_name',
  'employee_name',
  'due_date', 
  'status',
  'action'
];
 
const employeeTaskList: EmployeeTask[] = [
  {
    id: '4123333',  
    template: '',
    task_name: 'Check Document Certification',  
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.'],  
    assigned_to: ['Mark Martines'],  
    related_goal: '',  
    link_to_a_shift: '',
    documents: [],
    completion_date: '', 
    status: 'To do',
    due_date: 'February 8, 2022',
    priority_level: 'warning'
  },

  {
    id: '4123332',  
    template: '',
    task_name: 'Send Reports',  
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, sodales eget nisi at, bibendum sollicitudin massa. Quisque at enim nisi.'],  
    assigned_to: ['Mark Martines', 'George Adams'],  
    related_goal: '',  
    link_to_a_shift: '',
    documents: ['sampledocs.png'],
    completion_date: '', 
    status: 'To do',
    due_date: 'February 25, 2022',
    priority_level: 'warning'
  },

  {
    id: '4123332',  
    template: '',
    task_name: 'Buy Medicine for Client',  
    description: ['Donec nisl felis, sodales eget nisi at, bibendum sollicitudin massa. Quisque at enim nisi.'],  
    assigned_to: ['Mark Martines', 'George Adams'],  
    related_goal: '',  
    link_to_a_shift: '',
    documents: ['sampledocs.png'],
    completion_date: '', 
    status: 'To do',
    due_date: 'March 3, 2022',
    priority_level: 'success'
  },

  {
    id: '4123334',  
    template: '',
    task_name: 'Submit Visa Documents',  
    description: ['Accountant contract', 'Request work payslips', 'Cancel VAT ID'],  
    assigned_to: ['Mark Martines', 'George Adams'],  
    related_goal: '',  
    link_to_a_shift: '',
    documents: [],
    completion_date: '', 
    status: 'In Progress',
    due_date: 'January 7, 2022',
    priority_level: 'success'
  },

  {
    id: '4123335',  
    template: '',
    task_name: 'Donec nisl felis, sodales eget nisi at',  
    description: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl felis, sodales eget nisi at, bibendum sollicitudin massa. Quisque at enim nisi.'],  
    assigned_to: ['Mark Martines', 'George Adams'],  
    related_goal: '',  
    link_to_a_shift: '',
    documents: ['sampledocs.png'],
    completion_date: 'December 15, 2021', 
    status: 'Done',
    due_date: 'December 22, 2021',
    priority_level: 'danger'
  },

  {
    id: '4123336',  
    template: '',
    task_name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',  
    description: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Donec nisl felis, sodales'],  
    assigned_to: ['Mark Martines', 'George Adams', 'Anna Damien'],  
    related_goal: '',  
    link_to_a_shift: '',
    documents: [],
    completion_date: '', 
    status: 'Done',
    due_date: 'January 1, 2022',
    priority_level: 'warning'
  },

  {
    id: '4123337',  
    template: '',
    task_name: 'Lorem ipsum dolor sit amet',  
    description: ['Lorem ipsum dolor sit amet', 'Consectetur adipiscing elit', 'Donec nisl felis, sodales'],  
    assigned_to: ['Mark Martines'],  
    related_goal: '',  
    link_to_a_shift: '',
    documents: [],
    completion_date: '', 
    status: 'Archive',
    due_date: 'January 7, 2022',
    priority_level: 'danger'
  },
];

export {
  displayedColumns,
  selectedColumns,
  employeeTaskList
}