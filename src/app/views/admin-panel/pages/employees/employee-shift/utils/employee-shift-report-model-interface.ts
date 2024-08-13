export interface TableHeader {
  col_name: string;
  title: string;
}

export const columns: TableHeader[] = [
  { col_name: 'id', title: 'Shift ID' },
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'client_name', title: 'Participant' },
  { col_name: 'type', title: 'Type' },
  { col_name: 'activity', title: 'Activity' },
  { col_name: 'support_item', title: 'Support Item' },
  { col_name: 'support_item_number', title: 'Support Item Number' },
  { col_name: 'weekday', title: 'Weekday' },
  { col_name: 'calendar_schedule', title: 'Schedule' },
  { col_name: 'start_date', title: 'Start Date' },
  { col_name: 'end_date', title: 'End Date' },
  { col_name: 'time_from', title: 'Time From' },
  { col_name: 'time_to', title: 'Time To' },
  { col_name: 'total_hours', title: 'Total Hours' },
  { col_name: 'client_total', title: 'Total Cost' },
  { col_name: 'group', title: 'Group' },
  { col_name: 'status', title: 'Status' },
  
];

export const selectedColumns: string[] =  [
  'id',
  'employee_name',
  'client_name',
  'type',
  'activity',
  'start_date',
  'end_date',
  'time_from',
  'time_to',
  'total_hours',
  'status',
];
 