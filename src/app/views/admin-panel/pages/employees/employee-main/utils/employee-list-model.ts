export interface EmployeeList {
  id: any; 
  status: string; // Initial status is active
  payroll_id: string; 
  title: string; 
  type: string; 
  first_name: string; 
  middle_name: string; 
  last_name: string; 
  preferred_name: string; 
  gender: string; 
  birthdate: any;
  birthplace: any; 
  age: number; 
  email_address: string; 
  private_email: string; 
  job_description: string;
  tasks_performed: string;
  roster_info: string;  
  other_remarks: string;
  profile_pic_url: any;
  //profile_pic_url: any;
  interests: string[];
  hobbies: string[];
  skills: string[];
  medical_information: string;
  smokers: boolean;
  allergies: boolean;
  general_training_notes: string;
  qualification_summary: string;
  qualification: string;
  branch_name: string;
  main_branch_id: any;
  date_added: string;
  date_left: string;
  last_roster_date: string;  
  job_type: string;   
  employee_position_name: string;
  manager: string;
  on_hold: boolean;  
  volunteer: boolean;  
  member: boolean;
  employment_type: string;
  hourly_rate: number;
  price_list: number;
  pay_travel_time: boolean;
  pay_travel_mileage: boolean;
  position_id?: any;
  address_a: string;
  address_b: string;
  suburb: string;
  state: string;
  post_code: string;
  travel_distance: number;  
  travel_time: string;
  home_phone_no: string;
  mobile_phone_no: string;
  work_phone_no: string;
  emergency_contact_email: string;
  emergency_contact_home_phone_no: string;
  emergency_contact_mobile_phone_no: string;
  emergency_contact_name: string;
  emergency_contact_relationship: string;
  emergency_contact_work_phone_no: string; 
  last_date?:  any;
  reason_for_leaving?:  any;
}


export interface EmployeeClients {
  id: any,
  status: string,
  title: string,
  profile_image: string,
  interests: string[],
  hobbies: string[],
  skills: string[],
  first_name: string,
  last_name: string,
  birthdate: any,
  birthplace: any,
  branch_name: string,
  main_branch_id: any,
  date_added: any,
  age: number,
  email: string,
  home_phone_no: string,
  mobile_phone_no: string,
  work_phone_no: string,
  suburb: string,
  state: string,
  post_code: string,
  preferred_careworker_id: number,
  preferred_gender: string,
  preferred_language_id: number,
  preferred_name: string,
  primary_diagnosis: string,
  address: string,
  type_of_service: string,
  occupation: string,
}



export interface ColumnSelector {
  col_name: string;
  title: string;
  selected: boolean
}

export interface DialogData {
  displayedColumns: ColumnSelector[];
  selectedColumns: any[];
  selectedRows: EmployeeList[];
  cancel: boolean 
}

export interface EmployeeDetailSimple {
  employeeDetail: EmployeeList
}

export interface EmployeeListBanner {
  image_name: string;
  image_src: string;
  option: string;
  cancel: boolean
}