export interface PriceListTTP {
  id: any;
  organization_id: any;
  service_type_id: any; 
  service_type_support_item_number: string;  
  rate_type: string;   
  service_type_support_item_name: string;  
  support_category_name: any;
  standard_rate_ttp: number;
  afternoon_rate_ttp : number;  
  evening_rate_ttp : number;  
  night_rate_ttp : number;  
  saturday_rate_ttp : number;  
  sunday_rate_ttp : number;  
  public_holiday_rate_ttp: number;  
  branch_state : string;
  standard_rate_ttp_max: number;
  saturday_rate_ttp_max : number;  
  sunday_rate_ttp_max : number;
  afternoon_rate_ttp_max:number;
  night_rate_ttp_max:number;
  public_holiday_rate_ttp_max:number;
}

export interface TableHeaderTTP {
  col_name: string;
  title: string;
  type?: string;
  editable: boolean;
}

const displayedColumnsTTP: TableHeaderTTP[] = [
  { col_name: "service_type_support_item_number", title: "Base Code", editable: false },
  { col_name: "service_type_support_item_name", title: "Support Item Name", editable: false },
  { col_name: "rate_type", title: "Rate Type", editable: false },
  { col_name: "service_type_registration_group_number", title: "Group Number", editable: false },
  { col_name: "support_category_name", title: "Category", editable: false },
  { col_name: "standard_rate_ttp", title: "Weekday Rate TTP", type: "currency", editable: true },
  { col_name: "afternoon_rate_ttp", title: "Weekday Afternoon TTP", type: "currency", editable: true },
  { col_name: "evening_rate_ttp", title: "Weekday Evening TTP", type: "currency", editable: true },
  { col_name: "night_rate_ttp", title: "Weekday Night TTP", type: "currency", editable: true },
  { col_name: "saturday_rate_ttp", title: "Saturday Rate TTP", type: "currency", editable: true },
  { col_name: "sunday_rate_ttp", title: "Sunday Rate TTP", type: "currency", editable: true },
  { col_name: "public_holiday_rate_ttp", title: "Public Holiday Rate TTP", type: "currency", editable: true },
  { col_name: 'action', title: '', editable: false },
];

const selectedColumnsTTP: string[] =  [
  'service_type_support_item_number',
  //'service_type_registration_group_number',
  'service_type_support_item_name',
  'rate_type',
  //'support_category_name',
  'standard_rate_ttp',
  'afternoon_rate_ttp',
  'evening_rate_ttp',
  'night_rate_ttp',
  'saturday_rate_ttp',
  'sunday_rate_ttp',
  'public_holiday_rate_ttp',
  "action"
];
 

/*
  E = Fixed Rate
  H = Hourly Rate
  D = Per Day 
  WK = Per Week 
  YR = Per Year 
*/

const pricelistListTTP: PriceListTTP[] = [
  {
    id: 1,
    organization_id: 2255,
    service_type_id: 1351, 
    service_type_support_item_number: "07_101_0106_6_3", 
    rate_type: "Hourly Rate",   
    service_type_support_item_name: "Psychosocial Recovery Coaching",  
    support_category_name: "Support Coordination",
    standard_rate_ttp: 85.62,
    afternoon_rate_ttp: 94.25,  
    evening_rate_ttp: 95.97,  
    night_rate_ttp: 95.97,  
    saturday_rate_ttp: 120.12,
    sunday_rate_ttp: 154.61,  
    public_holiday_rate_ttp: 189.11,  
    branch_state: "ACT",

    standard_rate_ttp_max: 85.62,
    saturday_rate_ttp_max : 120.12,  
    sunday_rate_ttp_max : 154.61,
    afternoon_rate_ttp_max: 94.25,  
    night_rate_ttp_max: 95.97,  
    public_holiday_rate_ttp_max: 189.11
  },

  {
    id: 2,
    organization_id: 3133,
    service_type_id: 5343, 
    service_type_support_item_number: "01_300_0104_1_1", 
    rate_type: "Hourly Rate",   
    service_type_support_item_name: "Assistance With Self-Care Activities - Level 1",  
    support_category_name: "Assistance with Daily Life (Includes SIL)",
    standard_rate_ttp: 57.23,
    afternoon_rate_ttp: 59.81,  
    evening_rate_ttp: 95.97,  
    night_rate_ttp: 62.99,  
    saturday_rate_ttp: 80.28,
    sunday_rate_ttp: 103.34,  
    public_holiday_rate_ttp: 107.99,  
    branch_state: "ACT",
    standard_rate_ttp_max: 57.23,
    saturday_rate_ttp_max : 80.28,  
    sunday_rate_ttp_max : 103.34,
    afternoon_rate_ttp_max: 59.81,  
    night_rate_ttp_max: 62.99,  
    public_holiday_rate_ttp_max: 107.99  
  },

  {
    id: 3,
    organization_id: 3133,
    service_type_id: 2213, 
    service_type_support_item_number: "13_030_0102_4_3", 
    rate_type: "Hourly Rate",   
    service_type_support_item_name: "Transition Through School And To Further Education",  
    support_category_name: "Improved Learning",
    standard_rate_ttp: 65.09,
    afternoon_rate_ttp: 65.09,  
    evening_rate_ttp: 95.97,  
    night_rate_ttp: 65.09,  
    saturday_rate_ttp: 65.09,
    sunday_rate_ttp: 65.09,  
    public_holiday_rate_ttp: 65.09,  
    branch_state: "ACT",
    standard_rate_ttp_max: 65.09,
    saturday_rate_ttp_max : 65.09,  
    sunday_rate_ttp_max : 65.09,
    afternoon_rate_ttp_max: 65.09,  
    night_rate_ttp_max: 65.09, 
    public_holiday_rate_ttp_max: 65.09 
  },

  {
    id: 4,
    organization_id: 3133,
    service_type_id: 1255, 
    service_type_support_item_number: "13_030_0102_4_3", 
    rate_type: "Fixed Rate",   
    service_type_support_item_name: "Establishment Fee For Personal Care/Participation",  
    support_category_name: "Assistance with Daily Life (Includes SIL)",
    standard_rate_ttp: 572.3,
    afternoon_rate_ttp: 572.3,  
    evening_rate_ttp: 95.97,  
    night_rate_ttp: 572.3,  
    saturday_rate_ttp: 572.3,
    sunday_rate_ttp: 572.3,  
    public_holiday_rate_ttp: 572.3,  
    branch_state: "ACT",
    standard_rate_ttp_max: 572.3,
    saturday_rate_ttp_max : 572.3,  
    sunday_rate_ttp_max : 572.3,
    afternoon_rate_ttp_max: 572.3,  
    night_rate_ttp_max: 572.3,  
    public_holiday_rate_ttp_max: 572.3
  },
];

export {
  displayedColumnsTTP,
  selectedColumnsTTP,
  pricelistListTTP
}