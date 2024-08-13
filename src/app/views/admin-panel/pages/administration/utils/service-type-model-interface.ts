export interface ServiceType {
  id: string;  
  name: string;  
  code: string;
  after_hour_calc_method: string;  
  category: string;  
  pay_travel: string;  
  web_app_name: string;  
  job_type: string;  
  service_location: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'code', title: 'Code' },
  { col_name: 'after_hour_calc_method', title: 'After Hour Calculation Method' },
  { col_name: 'category', title: 'Category' },
  { col_name: 'pay_travel', title: 'Pay Travel' },
  { col_name: 'web_app_name', title: 'Web Application Name' },
  { col_name: 'job_type', title: 'Job Type' },
  { col_name: 'service_location', title: 'Service Location' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'name',
  'code',
  'after_hour_calc_method', 
  'category',  
  'pay_travel',  
  'web_app_name',  
  'job_type',  
  'service_location',  
  'action'
];
 
const serviceTypeList: ServiceType[] = [
  {
    id: "41230",  
    name: "Activity Based Transport",
    code: "3327567856",
    after_hour_calc_method: "Shift End Rate",  
    category: "Finding and keeping a job", 
    pay_travel: "Yes",  
    web_app_name: "",  
    job_type: "Care Services",  
    service_location: "In-Home Service",
  },

  {
    id: "41231",  
    name: "Activity Based Transport",
    code: "3327567856",
    after_hour_calc_method: "Shift End Rate",  
    category: "Finding and keeping a job", 
    pay_travel: "Yes",  
    web_app_name: "",  
    job_type: "Care Services",  
    service_location: "In-Home Service",
  },

  {
    id: "41232",  
    name: "Activity Based Transport",
    code: "3327567856",
    after_hour_calc_method: "Shift End Rate",  
    category: "Finding and keeping a job", 
    pay_travel: "Yes",  
    web_app_name: "",  
    job_type: "Care Services",  
    service_location: "In-Home Service",
  },

  {
    id: "41233",  
    name: "Activity Based Transport",
    code: "3327567856",
    after_hour_calc_method: "Shift End Rate",  
    category: "Finding and keeping a job", 
    pay_travel: "Yes",  
    web_app_name: "",  
    job_type: "Care Services",  
    service_location: "In-Home Service",
  },

  {
    id: "41234",  
    name: "Activity Based Transport",
    code: "3327567856",
    after_hour_calc_method: "Shift End Rate",  
    category: "Finding and keeping a job", 
    pay_travel: "Yes",  
    web_app_name: "",  
    job_type: "Care Services",  
    service_location: "In-Home Service",
  },
];

export {
  displayedColumns,
  selectedColumns,
  serviceTypeList
}