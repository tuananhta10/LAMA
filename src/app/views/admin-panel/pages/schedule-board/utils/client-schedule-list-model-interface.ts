export interface ServiceSchedule {
  id: string;  
  client_name: string;  
  client_id?: any;
  type: string;  
  start_date: string; 
  end_date?: string; 
  status: string;  
  employee_name: string;
  weekday: any;  
  start_time: string;  
  end_time: string;  
  time_from?: string;
  time_to?: string;
  total_hours: string;
  activity?: string;  
  transport_distance?: any;
}

export interface ClientServiceSchedule {
  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'is_recurring', title: 'Recurring' },
  { col_name: 'client_name', title: 'Participant' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'activity', title: 'Activity' },
  { col_name: 'employee_name', title: 'Employee' },
  { col_name: 'weekday', title: 'Weekday' },
  { col_name: 'schedule', title: 'Schedule' },
  { col_name: 'start_date', title: 'Start Date' },
  { col_name: 'end_date', title: 'End Date' },
  { col_name: 'time_from', title: 'Time From' },
  { col_name: 'time_to', title: 'Time To' },
  { col_name: 'total_hours', title: 'Total Hours' },
  { col_name: 'group', title: 'Group' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  //'id',
  //'client_name',
  'is_recurring',
  'type',
  'activity',
  'employee_name',
  'weekday',
  'schedule',
  //'end_date',
  'time_from',
  'time_to',
  'total_hours',
  //'group',
  'status',
  'action'
];
 
const serviceScheduleList: ServiceSchedule[] = [
  /*{
    id: '10011', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Juan Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },
  
  {
    id: '10012', 
    client_name:"Venus Lim",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10013', 
    client_name:"Venus Lim",
    type: "Individual",
    employee_name: "Michael Angelo",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10014', 
    client_name:"Venus Lim",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10015', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Damien Marley",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10016', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Adam Sander",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10017', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10018', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "George Andres",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10019', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10020', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10021', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },

  {
    id: '10022', 
    client_name:"Paul Jackson",
    type: "Individual",
    employee_name: "Hailey Cruz",
    start_date: '07-03-2020',
    status: 'Completed',
    weekday: "Fri",  
    start_time: "11:30",  
    end_time: "13:30",  
    total_hours: "2:00",  
    group: "",  
    attachment: [],
    label_style: 'warning',
  },*/
];

export {
  displayedColumns,
  selectedColumns,
  serviceScheduleList
}