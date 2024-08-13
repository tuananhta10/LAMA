export interface TableHeader {
  col_name: string;
  title: string;
}

export const columns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'first_name', title: 'First Name' },
  { col_name: 'last_name', title: 'Last Name' },
  { col_name: 'branch_name', title: 'Branch' },
  { col_name: 'birthdate', title: 'Birth Date' },
  { col_name: 'background', title: 'Background' },
  { col_name: 'disability_type', title: 'Disability Type' },
  { col_name: 'registration_no', title: 'NDIS Number' },
  { col_name: 'gender', title: 'Gender' },
  { col_name: 'home_phone_no', title: 'Home Phone' },
  { col_name: 'mobile_phone_no', title: 'Mobile Phone' },
  { col_name: 'email_address', title: 'Email' },
  { col_name: 'entry_date', title: 'Entry Date' },
  { col_name: 'service_required', title: 'Service Required' },
  { col_name: 'service_location', title: 'Service Location' },
  { col_name: 'citizenship', title: 'Citizenship' },
  { col_name: 'address', title: 'Address' },
  { col_name: 'suburb', title: 'Suburb' },
  { col_name: 'state', title: 'State' },
  { col_name: 'post_code', title: 'Postal' },
  { col_name: 'status', title: 'Status' },
  
];

export const selectedColumns: string[] =  [
  'id',
  'first_name',
  'last_name',
  'branch_name',
  'birthdate',
  'background',
  'disability_type',
  'registration_no',
  'gender',
  'home_phone_no',
  'mobile_phone_no',
  'email_address',
  'entry_date',
  'service_location',
  'service_required',
  'citizenship',
  'address',
  'suburb',
  'state',
  'post_code',
  'status'
];
 