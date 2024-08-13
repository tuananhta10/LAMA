export interface EmployeePosition {
  id: string;  
  name: string; 
  access_level?: string; 
  code?: string;  
  colour?: string;
  restrict_service_type?: any
  employee_position_qualification?: any;

  // new field
  position_summary?: string;
  key_responsibilities?: string;  
  required_qualities?: string;  
  desired_competencies?: string;  
}

export interface TableHeader {
  col_name: string;
  title: string;
  type?: string;
  type_text?: string;
  classStyle?: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'empty', title: ' ' },
  { col_name: 'id', title: 'ID' },
  { col_name: 'display_name', title: 'Employee Position' },
  { col_name: 'name', title: 'Level of Access' },
  
  { col_name: 'code', title: 'Code' },
  //{ col_name: 'colour', title: 'Colour' },
  { col_name: 'risk_assessed_roles', title: 'Risked Assessed Roles', type: 'bool' },
  { col_name: 'employee_position_qualification', title: 'Compliance Documents', type: 'length', type_text: 'Qualifications', classStyle: 'view-qualification' },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  'id',
  'display_name',
  'code',
  'name',
  //'colour',
  'risk_assessed_roles',
  'employee_position_qualification',
  'action'
];
 
const employeePositionList: EmployeePosition[] = [
  {
    id: "41230",  
    name: 'Service Manager'
  },

  {
    id: "41231",  
    name: 'HR Manager'
  },

  {
    id: "41232",  
    name: 'Health Worker'
  },

  {
    id: "41233",  
    name: 'Physical Therapist'
  },

  {
    id: "41234",  
    name: 'Administrator'
  },

  {
    id: "41235",  
    name: 'Support Coordinator'
  },

  {
    id: "41236",  
    name: 'Scheduler'
  },

  {
    id: "41237",  
    name: 'Volunteer'
  },

  {
    id: "41238",  
    name: 'Assistant Nurse'
  },

  {
    id: "41239",  
    name: 'Psychologist'
  },

  {
    id: "412310",  
    name: 'Maintenance Technician'
  },

  {
    id: "412311",  
    name: 'Doctor Associate'
  },
];

export {
  displayedColumns,
  selectedColumns,
  employeePositionList
}