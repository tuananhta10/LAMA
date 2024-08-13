export interface EmployeeTimesheet {
  employee_timesheet_id: string;  
  employee_name: string;
  start_date: any;
  end_date: any;
  time_in?: any;
  time_out?: any;
  client_service_schedule_id: number,
  approved_total_hours: number;
  employee_timesheet_start_time: any;
  employee_timesheet_end_time: any;
  employee_id?: any;
  calendar_schedule: any;
  client_service_schedule_start_date: string;
  client_service_schedule_start_time: string;
  client_service_schedule_end_date: string;
  client_service_schedule_end_time: string;
  service_type_support_item_number: string;
  service_type_support_item_name: string;
  client_service_schedule_activity?: string;
  case_notes: any;
  employee_timesheet_approved?: any;
  employee_timesheet_paid?: any;
  employee_position_name:string
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'client_name', title: 'Participant Name' },
  { col_name: 'funding_source_full_name', title: 'Participant Funding'},
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'client_service_schedule_id', title: 'Schedule ID' },
  { col_name: 'time_in', title: 'Schedule In' },
  { col_name: 'time_out', title: 'Schedule Out' },
  { col_name: 'calendar_schedule', title: 'Calendar Schedule' },
  { col_name: 'client_service_schedule_type', title: 'Type' },
  { col_name: 'approved_total_hours', title: 'Total Hours' },
  { col_name: 'client_service_schedule_client_total', title: 'Client Total Amount', type: 'currency' },
  { col_name: 'service_type_support_item_name', title: 'Support Item Name' },
  { col_name: 'case_notes', title: 'Case notes' },
  { col_name: 'employee_timesheet_approved', title: 'Approved' },
  { col_name: 'employee_timesheet_paid', title: 'Paid' },
  { col_name: 'action', title: '' },
];


const selectedColumns: string[] =  [
  'client_service_schedule_id',
  'client_name', 
  'funding_source_full_name',
  'employee_name',
  //'client_service_schedule_id',
  'time_in',
  'time_out',
  'calendar_schedule',
  'client_service_schedule_type',
  //'service_type_support_item_name',
  'approved_total_hours',
  //'client_service_schedule_client_total',
  'employee_timesheet_approved',  
  'employee_timesheet_paid',
  //'case_notes',
  'action'
];
 
 
const employeeTimesheetList: EmployeeTimesheet[] = [
  {
    employee_timesheet_id: '4123332',  
    employee_name: 'Vicki Smith',
    start_date: 1645027200,
    end_date: 1646130764,
    client_service_schedule_id: 93,
    employee_timesheet_start_time: '08:00 AM',  
    employee_timesheet_end_time: '10:30 AM',
    approved_total_hours: 2.5,
    calendar_schedule: 'June 1, 2022, 07:30 AM - 10:00 AM',
    client_service_schedule_start_date: 'June 1, 2002',
    client_service_schedule_start_time: '07:30 AM',
    client_service_schedule_end_date: 'June 1, 2002',
    client_service_schedule_end_time: '10:30 AM',
    service_type_support_item_number: "",
    service_type_support_item_name: "",
    client_service_schedule_activity: 'Access Community Social And Rec Activities',
    case_notes: 'Not Available',
    employee_timesheet_approved: true,
    employee_timesheet_paid: false,
    employee_position_name:''
  },
  {
    employee_timesheet_id: '4123333',  
    employee_name: 'James Kummug',
    start_date: 1645027200,
    end_date: 1646130764,
    client_service_schedule_id: 93,
    employee_timesheet_start_time: '08:00 AM',  
    employee_timesheet_end_time: '10:30 AM',
    approved_total_hours: 2.5,
    calendar_schedule: 'June 1, 2022, 07:30 AM - 10:00 AM',
    client_service_schedule_start_date: 'June 1, 2002',
    client_service_schedule_start_time: '07:30 AM',
    client_service_schedule_end_date: 'June 1, 2002',
    client_service_schedule_end_time: '10:30 AM',
    service_type_support_item_number: "",
    service_type_support_item_name: "",
    client_service_schedule_activity: 'Access Community Social And Rec Activities',
    case_notes: 'Not Available',
    employee_timesheet_approved: true,
    employee_timesheet_paid: false,
    employee_position_name:''
  },
  {
    employee_timesheet_id: '4505646',  
    employee_name: 'Janice Kummug',
    start_date: 1645027200,
    end_date: 1646130764,
    client_service_schedule_id: 93,
    employee_timesheet_start_time: '08:00 AM',  
    employee_timesheet_end_time: '10:30 AM',
    approved_total_hours: 2.5,
    calendar_schedule: 'June 1, 2022, 07:30 AM - 10:00 AM',
    client_service_schedule_start_date: 'June 1, 2002',
    client_service_schedule_start_time: '07:30 AM',
    client_service_schedule_end_date: 'June 1, 2002',
    client_service_schedule_end_time: '10:30 AM',
    service_type_support_item_number: "",
    service_type_support_item_name: "",
    client_service_schedule_activity: 'Access Community Social And Rec Activities',
    case_notes: 'Not Available',
    employee_timesheet_approved: "",
    employee_timesheet_paid: false,
    employee_position_name:''
  },
  {
    employee_timesheet_id: '7895456',  
    employee_name: 'Jalen Kummug',
    start_date: 1645027200,
    end_date: 1646130764,
    client_service_schedule_id: 93,
    employee_timesheet_start_time: '08:00 AM',  
    employee_timesheet_end_time: '10:30 AM',
    approved_total_hours: 2.5,
    calendar_schedule: 'June 1, 2022, 07:30 AM - 10:00 AM',
    client_service_schedule_start_date: 'June 1, 2002',
    client_service_schedule_start_time: '07:30 AM',
    client_service_schedule_end_date: 'June 1, 2002',
    client_service_schedule_end_time: '10:30 AM',
    service_type_support_item_number: "",
    service_type_support_item_name: "",
    client_service_schedule_activity: 'Access Community Social And Rec Activities',
    case_notes: 'Not Available',
    employee_timesheet_approved: "",
    employee_timesheet_paid: false,
    employee_position_name:''
  }
];

export {
  displayedColumns,
  selectedColumns,
  employeeTimesheetList
}