export interface ServiceSchedule {
  id: string;  
  name: string;  
  type: string;  
  start_day: string; 
  status: string;  
  employee_name: string;
  weekday: string;  
  time_from: string;  
  time_to: string;  
  total_hours: string;  
  group: string;  
  attachment: any[];
  label_style: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'employee_name', title: 'Employee' },
  { col_name: 'weekday', title: 'Weekday' },
  { col_name: 'start_day', title: 'Start Day' },
  { col_name: 'time_from', title: 'Time From' },
  { col_name: 'time_to', title: 'Time To' },
  { col_name: 'total_hours', title: 'Total Hours' },
  { col_name: 'group', title: 'Group' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'type',
  'employee_name',
  'weekday',
  'start_day',
  'time_from',
  'time_to',
  'total_hours',
  'group',
  'status',
  'action'
];
 
const serviceScheduleList: ServiceSchedule[] = [
  {
    id: '10011', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },
  
  {
    id: '10012', 
    name:"Venus Lim",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10013', 
    name:"Venus Lim",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10014', 
    name:"Venus Lim",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10015', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10016', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10017', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10018', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10019', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10020', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10021', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10022', 
    name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_day: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    time_from: "11:30",  
    time_to: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },
];

export {
  displayedColumns,
  selectedColumns,
  serviceScheduleList
}