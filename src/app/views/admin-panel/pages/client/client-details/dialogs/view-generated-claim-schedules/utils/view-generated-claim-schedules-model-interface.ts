export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
}

/*
  {
    "client_name": "George  Lucas",
    "client_service_schedule_approved_client_total_cost": 134.56,
    "client_service_schedule_approved_end_date": "2022-11-14T00:00:00",
    "client_service_schedule_approved_start_date": "2022-11-14T00:00:00",
    "client_service_schedule_approved_support_item_price": 67.28,
    "client_service_schedule_approved_total_hours": 2,
    "client_service_schedule_id": 348,
    "client_service_schedule_support_item_number": "04_400_0104_1_1",
    "funding_source_code": "NDIS"
}
*/
export const displayedColumns = [
  { col_name: 'client_service_schedule_id', title: 'ID' },
  { col_name: 'client_name', title: 'Client Name' },
 //{ col_name: 'client_service_schedule_id', title: 'Service Schedule ID' },
  { col_name: 'client_service_schedule_start_time', title: 'Start Time' },
  { col_name: 'client_service_schedule_end_time', title: 'End Time' },
  { col_name: 'calendar_schedule', title: 'Calendar Schedule' },
  { col_name: 'client_service_schedule_support_item_number', title: 'Claim Code' },
  { col_name: 'client_service_schedule_approved_total_hours', title: 'Units' },
  { col_name: 'client_service_schedule_approved_support_item_price', title:'Rate'},
  { col_name: 'sub_total', title: 'Sub Total' },
  { col_name: 'tax', title: 'Tax Amount' },
  { col_name: 'client_service_schedule_approved_client_total_cost', title: 'Main Total' },
  { col_name: 'employee_timesheet_paid', title: 'Paid' },
];

export const selectedColumns: string[] =  [
  'client_service_schedule_id',
  'client_name',  
  'calendar_schedule',
  'client_service_schedule_support_item_number',  
  'client_service_schedule_approved_total_hours',
  'client_service_schedule_approved_support_item_price',  
  'client_service_schedule_approved_client_total_cost'
];
