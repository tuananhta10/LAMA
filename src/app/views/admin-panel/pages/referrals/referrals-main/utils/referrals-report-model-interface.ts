export interface TableHeader {
  col_name: string;
  title: string;
}

export const columns: TableHeader[] = [
  { col_name: 'ndis_participant_number', title: 'NDIS Number' },
  { col_name: 'profile_image', title: '' },
  { col_name: 'name', title: 'Participant Name' },
  { col_name: 'branch_name', title: 'Branch '},
  { col_name: 'doctor_name', title: 'Doctor Name '},
  { col_name: 'branch_name', title: 'Branch '},
 
  { col_name: 'email_address', title: 'Email'},
  { col_name: 'disability_type', title: 'Primary Diagnosis' },
  { col_name: 'ndis_funding', title: 'Funding Type' },
  { col_name: 'address_a', title: 'Address' },
  { col_name: 'state', title: 'State' },
  { col_name: 'referrer_full_name', title: 'Referred By'},
  { col_name: 'referral_date', title: 'Referral Date' },
  { col_name: 'employee_name', title: 'Assigned Staff'},
  { col_name: 'branch_id', title: 'Branch Id' },  
  { col_name: 'status', title: 'Status' },
  
];

export const selectedColumns: string[] =  [
  'name',
  'branch_name',
  'doctor_name',
  'branch_name',
  //'profile_image',
  
  'email_address', 
  'ndis_participant_number',
  'ndis_funding',
  'disability_type',
  //'address_a',
  'referrer_full_name',
  'referral_date', 
  'employee_name',
  'status',
  
];
 