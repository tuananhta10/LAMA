export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

export const columns: TableHeader[] = [
  { col_name: 'client_service_schedule_id', title: 'Schedule ID' },
  { col_name: 'client_name', title: 'Participant Name' },
  { col_name: 'funding_source_full_name', title: 'Participant Funding'},
  { col_name: 'employee_name', title: 'Employee Name' },
  { col_name: 'employee_employment_type', title: 'Employment Type'},
  { col_name: 'employee_pay_rate_category', title: 'Payrate Category'},
  { col_name: 'employee_pay_rate_classification', title: 'Payrate Classification'},
  { col_name: 'employee_pay_rate_hourly_pay_rate', title: 'Standard Rate/hr'},
  { col_name: 'time_in', title: 'Time In' },
  { col_name: 'time_out', title: 'Time Out' },
  { col_name: 'approved_total_hours', title: 'Total Hours' },
  { col_name: 'client_service_schedule_start_date', title: 'Date of Shift' },
  { col_name: 'service_type_support_item_name', title: 'Support Item'},
  { col_name: 'service_type_support_item_number', title: 'Support Item Number'},
  { col_name: 'client_service_schedule_type', title: 'Service Type' },
  { col_name: 'client_service_schedule_client_total', title: 'Client Total Amount', type: 'currency' },
  { col_name: 'case_notes', title: 'Case notes' },
  { col_name: 'employee_timesheet_approved', title: 'Approved' },
  { col_name: 'employee_timesheet_paid', title: 'Paid' },
  { col_name: 'client_service_schedule_total_transport', title: 'Total Transport Km'},
  { col_name: 'client_service_schedule_total_travel_km', title: 'Total Travel Km'},
];

export const selectedColumns: string[] =  [
  'client_service_schedule_id',
  'client_name', 
  'funding_source_full_name',
  'employee_name',
  'employee_employment_type',
  'employee_pay_rate_category',
  'employee_pay_rate_classification',
  'employee_pay_rate_hourly_pay_rate',
  'time_in',
  'time_out',
  'approved_total_hours',
  'client_service_schedule_start_date',
  'service_type_support_item_name',
  'service_type_support_item_number',
  'client_service_schedule_type',
  'employee_timesheet_approved',  
  'employee_timesheet_paid',
  'client_service_schedule_total_transport',
  'client_service_schedule_total_travel_km'
];
 