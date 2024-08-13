export interface ClientList {
  id: any;
  status: string;
  title: string;
  profile_pic_url: any;
  profile_pic_url_download_url: any;
  interests: string[];
  hobbies: string[];
  skills: string[];
  first_name: string;
  last_name: string;
  birthdate: any;
  birthplace: any;
  branch_name: string;
  main_branch_id: any;
  date_added: any;
  age: number;
  email_address: string;
  home_phone_no: string;
  mobile_phone_no: string;
  work_phone_no: string;
  suburb: string;
  state: string;
  post_code: string;
  preferred_careworker_id: number;
  preferred_gender: string;
  preferred_language: string;
  preferred_language_id: number;
  preferred_name: string;
  primary_diagnosis: string;
  address: string;
  address_a: string;  
  address_b: string;
  type_of_service: string;
  occupation: string;
  religion_name: string;
  gender: string;  
  registration_no: string;
  citizenship: string;
  disability_type: string;
  condition_description: string;
  preferred_careworker: string;
  program_name: string;
  pm_require_approval: boolean;
  service_required: string;  
  service_location: string;
  last_service_date: string;  
  end_service_date: string;
  minimum_classification_name: string;
  exit_date: string;  
  risk_notification: string;
  ndis_plan_start_date?: string;  
  ndis_plan_end_date?: string;  
  emergency_contact_relationship?: string;
}

export interface ColumnSelector {
  col_name: string;
  title: string;
  selected: boolean
}

export interface DialogData {
  displayedColumns: ColumnSelector[],
  selectedColumns: any[];
  selectedRows: ClientList[],
  cancel: boolean 
}

export interface ClientDetailSimple {
  clientDetail: ClientList
}

export interface ClientListBanner {
  image_name: string;
  image_src: string;
  option: string;
  cancel: boolean
}