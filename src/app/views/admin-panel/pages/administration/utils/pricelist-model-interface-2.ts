export interface PriceList {
  id: any;
  organization_id: any;
  service_type_id: any; 
  service_type_support_item_number: string;  
  service_type_unit: string;   
  service_type_support_item_name: string;  
  service_type_support_category_name: any;
  standard_rate: number;
  afternoon_rate : number;  
  night_rate : number;  
  evening_rate: number;
  saturday_rate : number;  
  sunday_rate : number;  
  public_holiday_rate: number;  
  branch_state : string;
  standard_rate_max: number;
  saturday_rate_max : number;  
  sunday_rate_max : number;
  afternoon_rate_max:number;
  night_rate_max:number;
  public_holiday_rate_max:number;
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
  editable: boolean;
}

const displayedColumns: TableHeader[] = [
  { col_name: "service_type_support_item_number", title: "Base Code", editable: false },
  { col_name: "service_type_support_item_name", title: "Support Item Name", editable: false },
  { col_name: "service_type_registration_group_number", title: "Group Number", editable: false },
  { col_name: "service_type_unit", title: "Rate Type", editable: false },
  { col_name: "service_type_support_category_name", title: "Category", editable: false },
  { col_name: "standard_rate", title: "Weekday Rate", type: "currency", editable: true },
  { col_name: "afternoon_rate", title: "Weekday Afternoon", type: "currency", editable: true },
  { col_name: "evening_rate", title: "Weekday Evening", type: "currency", editable: true },
  { col_name: "night_rate", title: "Weekday Night", type: "currency", editable: true },
  { col_name: "saturday_rate", title: "Saturday Rate", type: "currency", editable: true },
  { col_name: "sunday_rate", title: "Sunday Rate", type: "currency", editable: true },
  { col_name: "public_holiday_rate", title: "Public Holiday Rate", type: "currency", editable: true },
  { col_name: "version", title: "Version", editable: false },
  { col_name: 'action', title: '', editable: false },
];

const selectedColumns: string[] =  [
  'service_type_support_item_number',
  //'service_type_registration_group_number',
  'service_type_support_item_name',
  'service_type_unit',
  //'service_type_support_category_name',
  'standard_rate',
  'afternoon_rate',
  'evening_rate',
  'night_rate',
  'saturday_rate',
  'sunday_rate',
  'public_holiday_rate',
  'version',
  "action"
];
 

/*
  E = Fixed Rate
  H = Hourly Rate
  D = Per Day 
  WK = Per Week 
  YR = Per Year 
*/

const pricelistList: PriceList[] = [
  {
    id: 1,
    organization_id: 2255,
    service_type_id: 1351, 
    service_type_support_item_number: "07_101_0106_6_3", 
    service_type_unit: "Hourly Rate",   
    service_type_support_item_name: "Psychosocial Recovery Coaching",  
    service_type_support_category_name: "Support Coordination",
    standard_rate: 85.62,
    afternoon_rate: 94.25,  
    evening_rate: 95.97,  
    night_rate: 95.97,  
    saturday_rate: 120.12,
    sunday_rate: 154.61,  
    public_holiday_rate: 189.11,  
    branch_state: "ACT",

    standard_rate_max: 85.62,
    saturday_rate_max : 120.12,  
    sunday_rate_max : 154.61,
    afternoon_rate_max: 94.25,  
    night_rate_max: 95.97,  
    public_holiday_rate_max: 189.11
  },

  {
    id: 2,
    organization_id: 3133,
    service_type_id: 5343, 
    service_type_support_item_number: "01_300_0104_1_1", 
    service_type_unit: "Hourly Rate",   
    service_type_support_item_name: "Assistance With Self-Care Activities - Level 1",  
    service_type_support_category_name: "Assistance with Daily Life (Includes SIL)",
    standard_rate: 57.23,
    afternoon_rate: 59.81,  
    evening_rate: 95.97,  
    night_rate: 62.99,  
    saturday_rate: 80.28,
    sunday_rate: 103.34,  
    public_holiday_rate: 107.99,  
    branch_state: "ACT",
    standard_rate_max: 57.23,
    saturday_rate_max : 80.28,  
    sunday_rate_max : 103.34,
    afternoon_rate_max: 59.81,  
    night_rate_max: 62.99,  
    public_holiday_rate_max: 107.99  
  },

  {
    id: 3,
    organization_id: 3133,
    service_type_id: 2213, 
    service_type_support_item_number: "13_030_0102_4_3", 
    service_type_unit: "Hourly Rate",   
    service_type_support_item_name: "Transition Through School And To Further Education",  
    service_type_support_category_name: "Improved Learning",
    standard_rate: 65.09,
    afternoon_rate: 65.09, 
    evening_rate: 95.97,   
    night_rate: 65.09,  
    saturday_rate: 65.09,
    sunday_rate: 65.09,  
    public_holiday_rate: 65.09,  
    branch_state: "ACT",
    standard_rate_max: 65.09,
    saturday_rate_max : 65.09,  
    sunday_rate_max : 65.09,
    afternoon_rate_max: 65.09,  
    night_rate_max: 65.09, 
    public_holiday_rate_max: 65.09 
  },

  {
    id: 4,
    organization_id: 3133,
    service_type_id: 1255, 
    service_type_support_item_number: "13_030_0102_4_3", 
    service_type_unit: "Fixed Rate",   
    service_type_support_item_name: "Establishment Fee For Personal Care/Participation",  
    service_type_support_category_name: "Assistance with Daily Life (Includes SIL)",
    standard_rate: 572.3,
    afternoon_rate: 572.3,  
    evening_rate: 95.97,  
    night_rate: 572.3,  
    saturday_rate: 572.3,
    sunday_rate: 572.3,  
    public_holiday_rate: 572.3,  
    branch_state: "ACT",
    standard_rate_max: 572.3,
    saturday_rate_max : 572.3,  
    sunday_rate_max : 572.3,
    afternoon_rate_max: 572.3,  
    night_rate_max: 572.3,  
    public_holiday_rate_max: 572.3
  },
];

export {
  displayedColumns,
  selectedColumns,
  pricelistList
}