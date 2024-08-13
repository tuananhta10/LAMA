export interface EmployeeShift {
  id: string;  
  name: string;  
  type: string;  
  work_schedule: string;
  employee: string;  
  status: string;  
  week_day: string;  
  start_day: string; 
  time_from: string; 
  time_to: string; 
  total_hours: string; 
  group: string; 
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Activity' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'start_date', title: 'Start Date' },
  { col_name: 'end_date', title: 'End Date' },
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'weekday', title: 'Week Day' },
  //{ col_name: 'start_day', title: 'Start Date' },
  { col_name: 'time_from', title: 'Time From' },
  { col_name: 'time_to', title: 'Time To' },
  { col_name: 'total_hours', title: 'Total Hours' },
  { col_name: 'group', title: 'Groups' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'employee_name', 
  'type',
  'name', 
  'start_date',
  'end_date', 
  //'start_day',
  'time_from',
  'time_to',
  'total_hours',
  'status', 
  'action'
];
 
const employeeShiftList: EmployeeShift[] = [
  {
    id: '4123333',  
    name: 'Verus, Trudy - 0007 - Level 2: Coordination Of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'Marian Angela',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123334',  
    name: 'Verus, Trudy - 0007 - CORE - assistance with self-care - night-time sleepover',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'Juan Martinez',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123335',  
    name: 'Bulman, Jarred - 0037 - COS - Coordination of Supports ',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'James Johnson',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123336',  
    name: 'Bulman, Jarred - 0037 - COS - Coordination of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'Julian James',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123337',  
    name: 'Bulman, Jarred - 0037 - COS - Coordination of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'James Johnson',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123338',  
    name: 'Verus, Trudy - 0007 - Level 2: Coordination Of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'Julian James',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123339',  
    name: 'Verus, Trudy - 0007 - Level 2: Coordination Of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'Juan Martinez',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123340',  
    name: 'Bulman, Jarred - 0037 - COS - Coordination of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'James Johnson',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123341',  
    name: 'Bulman, Jarred - 0037 - COS - Coordination of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'James Johnson',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123342',  
    name: 'Verus, Trudy - 0007 - Level 2: Coordination Of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'Max Sanchez',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },

  {
    id: '4123313',  
    name: 'Bulman, Jarred - 0037 - COS - Coordination of Supports',  
    type: 'Individual',  
    work_schedule: 'Wed, 1-Feb-2022',
    employee: 'Max Sanchez',  
    status: 'In Progress',  
    week_day: 'Wednesday',  
    start_day: '01-02-2022', 
    time_from: '16:00', 
    time_to: '17:30', 
    total_hours: '1:50', 
    group: '', 
  },
];

export {
  displayedColumns,
  selectedColumns,
  employeeShiftList
}