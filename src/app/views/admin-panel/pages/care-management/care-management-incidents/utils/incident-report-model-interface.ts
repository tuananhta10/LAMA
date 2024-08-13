export interface TableHeader {
  col_name: string;
  title: string;
}

export const columns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'status', title: 'Status' },
  { col_name: 'severity', title: 'Severity' },
  { col_name: 'client_name', title: 'Participant' },
  { col_name: 'employee_name', title: 'Assigned Employee'},
  { col_name: 'type', title: 'Type' },
  { col_name: 'action_date', title: 'Action Date' },
  { col_name: 'date_received', title: 'Date Received' },
  { col_name: 'time_of_incident', title: 'Time of Incident'},
  { col_name: 'description', title: 'Description' },
  { col_name: 'event_after', title: 'What Happened After?' },
  { col_name: 'event_before', title: 'What Happened Before?' },
  { col_name: 'event_during', title: 'What Happened During?' },
  { col_name: 'examined_by_doctor', title: 'Examined By Doctor?' },
  { col_name: 'further_action_required', title: 'Further Action Required?' },
  { col_name: 'location', title: 'Location' },
  { col_name: 'reported_by', title: 'Reported By' },
  
];

export const selectedColumns: string[] =  [
  'id', 
  'status', 
  'severity', 
  'client_name', 
  'employee_name', 
  'type', 
  'action_date', 
  'date_received', 
  'time_of_incident', 
  'description', 
  'event_after', 
  'event_before', 
  'event_during', 
  'further_action_required', 
  'location', 
  
  'reported_by', 
  
];
 