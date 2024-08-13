export interface EmployeeLeave {
  id: string;  
  profile_image: string;
  employee_name: string;
  leave_from: string;
  leave_to: string;
  leave_reason: string;
  status: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'profile_image', title: ' ' },
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'leave_from', title: 'Leave From' },
  { col_name: 'leave_to', title: 'Leave To' },
  { col_name: 'leave_reason', title: 'Leave Reason' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id', 
  'profile_image',
  'employee_name',
  'leave_from',
  'leave_to',
  'leave_reason',
  'status',
  'action'
];
 
const employeeLeaveList: EmployeeLeave[] = [
  {
    id: '4123332',  
    profile_image: '/assets/images/faces/face-2.jpg',
    employee_name: 'Vicki Smith',
    leave_from: '13-01-2022',
    leave_to: '13-11-2022',
    leave_reason: 'Annual Leave',
    status: 'Approved',
  },
  {
    id: '4123333',  
    profile_image: '/assets/images/faces/face-2.jpg',
    employee_name: 'Vicki Smith',
    leave_from: '13-01-2022',
    leave_to: '13-11-2022',
    leave_reason: 'Unpaid Leave',
    status: 'Approved',
  },

  {
    id: '4123334',  
    profile_image: '/assets/images/faces/face-2.jpg',
    employee_name: 'Vicki Smith',
    leave_from: '13-01-2022',
    leave_to: '13-11-2022',
    leave_reason: 'Annual Leave',
    status: 'Pending',
  },

  {
    id: '4123335',  
    profile_image: '/assets/images/faces/face-2.jpg',
    employee_name: 'Vicki Smith',
    leave_from: '13-01-2022',
    leave_to: '13-11-2022',
    leave_reason: 'Annual Leave',
    status: 'Pending',
  },

  {
    id: '4123336',  
    profile_image: '/assets/images/faces/face-2.jpg',
    employee_name: 'Vicki Smith',
    leave_from: '13-01-2022',
    leave_to: '13-11-2022',
    leave_reason: 'Maternity Leave',
    status: 'Approved',
  },

  {
    id: '4123337',  
    profile_image: '/assets/images/faces/face-2.jpg',
    employee_name: 'Vicki Smith',
    leave_from: '13-01-2022',
    leave_to: '13-11-2022',
    leave_reason: 'Personal Leave',
    status: 'Rejected',
  },
];

export {
  displayedColumns,
  selectedColumns,
  employeeLeaveList
}