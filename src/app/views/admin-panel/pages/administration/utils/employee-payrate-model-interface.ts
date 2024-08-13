export interface EmployeePayrate {
  id: any;  
  award_code?: string;
  parent_classification_name?: string;
  classification: string; 
  calculated_rate?: number;
  calculated_rate_type?: string;

  category: string; 
  employment_type: string[];
  weekly_pay_rate: number;  
  hourly_pay_rate: number;  
  saturday_rate: number;  
  sunday_rate: number;  
  public_holiday_rate: number;
  afternoon_rate: number;
  night_rate: number;
  overtime_monday_saturday_first_two: number;  
  overtime_monday_saturday_after_two: number;  
  overtime_public_holiday: number;  
  less_than_10_hour_break: number;  
  broken_shift: number;
  twentyfour_hour_shift: number;
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
  editable?: boolean;
  sub_title?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'award_code', title: 'Award Code' },
  { col_name: 'classification', title: 'Classification' },
  { col_name: 'category', title: 'Payrate Category' },
  { col_name: 'employment_type', title: 'Employment Type'},
  { col_name: 'weekly_pay_rate', title: 'Weekly Rate', type: 'currency', sub_title: 'Weekly Pay Rate' },
  { col_name: 'hourly_pay_rate', title: 'Calculated Rate', type: 'currency', editable:true, sub_title: 'Hourly Pay Rate' },
  { col_name: 'calculated_rate_type', title: 'Calculated Rate Type', sub_title: 'Base Rate Type' },
  { col_name: 'action', title: ''},
];

const selectedColumns: string[] =  [
  'award_code',
  'category',
  'classification',
  'hourly_pay_rate',
  'calculated_rate_type',
  'action'
];
 
export const download_template: any[] = [ 
  { col_name: 'award_code', title: 'Award Code' },
  { col_name: 'classification', title: 'Classification' },
  { col_name: 'category', title: 'Payrate Category' },
  { col_name: 'employment_type', title: 'Employment Type'},
  { col_name: 'weekly_pay_rate', title: 'Weekly Rate', type: 'currency', sub_title: 'Weekly Pay Rate' },
  { col_name: 'hourly_pay_rate', title: 'Calculated Rate', type: 'currency', sub_title: 'Hourly Pay Rate' },
  { col_name: 'calculated_rate_type', title: 'Calculated Rate Type', sub_title: 'Base Rate Type' },
  
];

export const sample_data_template = [
  {
    'award_code': 'MA000100',
    'category': "Home care employee level 1",
    'classification': "pay point 1",
    'hourly_pay_rate': 28.78,
    'calculated_rate_type': "Hourly",
  },

  {
    'award_code': 'MA000100',
    'category': "Family day care employee level 5",
    'classification': "pay point 4",
    'hourly_pay_rate': 38.66,
    'calculated_rate_type': "Hourly",
  },
];

const employeePayrateList: EmployeePayrate[] = [
  {
    "id": 1001,  
    "classification": "Level 1 - pay point 1", 
    "employment_type": ["Full-time", "Part-time"],
    "category": "Social and community services employee", 
    "weekly_pay_rate": 840.10,  
    "hourly_pay_rate": 22.11,  
    "saturday_rate": 33.17,  
    "sunday_rate": 44.22,  
    "public_holiday_rate": 55.28,
    "afternoon_rate": 24.87,
    "night_rate": 25.43,
    "overtime_monday_saturday_first_two": 33.17,  
    "overtime_monday_saturday_after_two": 44.22,  
    "overtime_public_holiday": 55.28,  
    "less_than_10_hour_break": 44.22,  
    "broken_shift": 44.22,
    "twentyfour_hour_shift": 0.00
  },

  {
    "id": 1002,  
    "classification": "Level 1 - pay point 2", 
    "employment_type": ["Full-time", "Part-time"],
    "category": "Social and community services employee", 
    "weekly_pay_rate": 868.50,  
    "hourly_pay_rate": 22.86,  
    "saturday_rate": 34.29,  
    "sunday_rate": 45.72,  
    "public_holiday_rate": 57.15,
    "afternoon_rate": 25.72,
    "night_rate": 26.29,
    "overtime_monday_saturday_first_two": 34.29,  
    "overtime_monday_saturday_after_two": 45.72,  
    "overtime_public_holiday": 57.15,  
    "less_than_10_hour_break": 45.72,  
    "broken_shift": 45.72,
    "twentyfour_hour_shift": 0.00
  },

  {
    "id": 2001,  
    "classification": "Level 1 - pay point 1", 
    "employment_type": ["Full-time", "Part-time"],
    "category": "Crisis accommodation employee", 
    "weekly_pay_rate": 1236.69,  
    "hourly_pay_rate": 32.54,  
    "saturday_rate": 48.81,  
    "sunday_rate": 65.08,  
    "public_holiday_rate": 81.35,
    "afternoon_rate": 36.61,
    "night_rate": 37.42,
    "overtime_monday_saturday_first_two": 48.81,  
    "overtime_monday_saturday_after_two": 65.08,  
    "overtime_public_holiday": 81.35,  
    "less_than_10_hour_break": 65.08,  
    "broken_shift": 0.00,
    "twentyfour_hour_shift": 0.00
  },
]

export {
  displayedColumns,
  selectedColumns,
  employeePayrateList
}