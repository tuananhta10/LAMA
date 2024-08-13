export const ahCalculation: any[] = ["Shift Start", "Shift End", "Highest Rate"];
export const status: any[] = ["unassigned", "scheduled", "created", "pending", "cancelled", "completed"];
export const rateTypeOption: any[] = [
    { id: 1, name: "Standard Rate" },
    { id: 2, name: "Afternoon Rate" },
    { id: 3, name: "Evening Rate" },
    { id: 4, name: "Night Rate" },
    { id: 5, name: "Saturday Rate" },
    { id: 6, name: "Sunday Rate" },
    { id: 7, name: "Public Holiday Rate" },
];

export const serviceLocation: string[] = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA", "Remote", "Very Remote"];

export const unitType: any = {
    "FixedRate": "E",  
    "HourlyRate": "H",  
    "PerDay": "D",  
    "PerWeek": "WK",  
    "PerYear": "YR"
};

export const recurringInterval: string[] = ["Daily", "Weekly", "Fortnightly", "Monthly"];

export const clientColumns:any[] = [
    {name: 'Name', field: 'name'},/* {name: 'Funding Source', field: 'funding_source_name' }*/
    {name: 'Email', field: 'email_address', capitalize: true}, 
    {name: 'Mobile Phone', field: 'mobile_phone_no'},
    {name: 'Home Phone', field: 'home_phone_no'},
    //{name: 'Suburb', field: 'suburb'}, 
    {name: 'Disability Type', field: 'disability_type'}
];

export const employeeColumns:any[] = [
    {name: 'Name', field: 'name'},/* {name: 'Funding Source', field: 'funding_source_name' }*/
    {name: 'Email', field: 'email_address', capitalize: true}, 
    {name: 'Mobile Phone', field: 'mobile_phone_no'},
    /*{name: 'Home Phone', field: 'home_phone_no'},*/ 
    //{name: 'Suburb', field: 'suburb'}, 
    {name: 'Employment', field: 'employment_type'},
    {name: 'Employee Position', field: 'employee_position'}
];

export const employeePayrateColumn:any[] =  [
  { field: 'employee', name: 'Employee' },
  { field: 'employment_type', name: 'Employment Type', sub_title: 'Employment Type'},
  { field: 'classification', name: 'Classification', sub_title: 'Payrate Classification' },
  { field: 'category', name: 'Category', sub_title: 'Payrate Category' },
  { field: 'shift', name: 'Shift Type', editable: false },
  { field: 'hourly_pay_rate', name: 'Hourly Rate', type: 'currency', editable: false, sub_title: 'Hourly Pay Rate' },
  { field: 'total_hours', name: 'Total Hours', editable: false },
  { field: 'main_total', name: 'Main Total', type: 'currency', editable: false },
]; 

export const clientTotalColumn:any[] =  [
  { field: 'rate_type', name: 'Rate Type'},
  { field: 'editable_rate_value', name: 'Support Item Price' },
  { field: 'total_hours', name: 'Total Hours', editable: false },
  { field: 'calculated_cost', name: 'Calculated Cost', type: 'currency', editable: false },
  { field: 'expenses_total', name: 'Expense Total', type: 'currency', editable: false },
  { field: 'service_fee', name: 'Service Fee', type: 'currency', editable: false },
  { field: 'travel_total', name: 'Travel Total', type: 'currency', editable: false },
  { field: 'client_total', name: 'Main Total', type: 'currency', editable: false },
]; 

export const checkBoxOptions:any = [
    {label: "Su", checked: false},
    {label: "M", checked: false}, 
    {label: "T", checked: false}, 
    {label: "W", checked: false},
    {label: "Th", checked: false}, 
    {label: "F", checked: false}, 
    {label: "Sa", checked: false},
];