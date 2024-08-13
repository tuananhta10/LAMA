
export interface Navigation{
  name: string;  
  description: string,
  route: string; 
}


export const global_search_object: Navigation[] = [
  // REFERRAL
  /**/{
    name:'Referrals',
    description: 'Module Description Here',
    route: '/admin/referrals',

  },
  // INTAKE
  /*{
    name:'Intake',
    description: 'Module Description Here',
    route: '/admin/intake',
  },*/

  // CLIENTS
  {
    name: 'Participant',
    description: 'Participant Module Description Here',
    route: '/admin/clients'
  },

  /*{
    name: 'Participants Groups',
    description: 'Participants Groups Module Description Here',
    route: '/admin/clients/groups'
  },

  {
    name: 'Participants Service Providers',
    description: 'Participants Service Providers Module Description Here',
    route: '/admin/clients/groups'
  },*/

  {
    name: 'Participant Service Schedule',
    description: 'Participant Service Schedule Module Description Here',
    route: '/admin/clients/service-schedule'
  },

  {
    name: 'Participant Invoice',
    description: 'Participant Invoice Module Description Here',
    route: '/admin/clients/invoices'
  },

  /*{
    name: 'Participant Service Calendar',
    description: 'Participant Service Calendar Module Description Here',
    route: '/admin/clients/service-calendar'
  },*/
  // EMPLOYEES
  {
    name: 'Employees',
    description: 'Employees Module Description Here',
    route: '/admin/employees'
  },

  {
    name: 'Employee Shifts',
    description: 'Employee Shifts Module Description Here',
    route: '/admin/employees/employee-shift'
  },

  /*{
    name: 'Employee Available Shifts',
    description: 'Employee Available Shifts Module Description Here',
    route: '/admin/employees/available-shift'
  },*/

  {
    name: 'Employee Tasks',
    description: 'Employee Tasks Module Description Here',
    route: '/admin/employees/employee-task'
  },

  {
    name: 'Employee Leaves',
    description: 'Employee Leaves Module Description Here',
    route: '/admin/employees/employee-leave'
  },

  /*{
    name: 'Employee Service Calendar',
    description: 'Employee Service Calendar Module Description Here',
    route: '/admin/employees/service-calendar'
  },*/

  {
    name: 'Employee Timesheets',
    description: 'Employee Timesheets Module Description Here',
    route: '/admin/employees/timesheet-approval'
  },

  // CARE MANAGEMENT
  /*{
    name:'Care',
    description: 'Care Management Module Description Here',
    route: '/admin/care',
  },

  {
    name: 'Needs Assessments',
    description: 'Needs Assessments Module Description Here',
    route: '/admin/care/needs-assessments'
  },

  {
    name: 'Support Coordination',
    description: 'Support Coordination Module Description Here',
    route: '/admin/care/staff-coordination'
  },
*/
  {
    name: 'Accidents / Incidents ',
    description: 'Accidents / Incidents Module Description Here',
    route: '/admin/care/incidents'
  },/*
  {
    name: 'Plan Management Import Invoice',
    description: 'Plan Management Module Description Here',
    route: '/admin/care/plan-management-import-invoice'
  },

  {
    name: 'Plan Management Claim',
    description: 'Plan Management Claim Module Description Here',
    route: '/admin/care/plan-management-claims'
  },
*/
  // ADMINISTRATION

  {
    name: 'Language Setup',
    description: 'Language Setup Module Description Here',
    route: '/admin/setup/languages'
  },

  {
    name: 'Qualification Setup',
    description: 'Qualification Setup Module Description Here',
    route: '/admin/setup/qualifications'
  },

  /*{
    name: 'Service Type Setup',
    description: 'Service Type Setup Module Description Here',
    route: '/admin/setup/service-types'
  },*/

  {
    name: 'Funding Source Setup',
    description: 'Funding Source Setup Module Description Here',
    route: '/admin/setup/funding-source'
  },

  {
    name: 'Price List Setup',
    description: 'Module Description Here',
    route: '/admin/setup/price-list'
  },

  /*{
    name: 'Price List Setup Expense Type List Setup',
    description: 'Module Description Here',
    route: '/admin/setup/expense-type-list'
  },*/

  {
    name: 'Payrate Loading Setup',
    description: 'Payrate Loading Setup Module Description Here',
    route: '/admin/setup/payrate-loading'
  },

   {
    name: 'Public Holiday Setup',
    description: 'Public Holiday Setup Module Description Here',
    route: '/admin/setup/public-holiday'
  },

  /*{
    name: 'Communication Templates Setup',
    description: 'Communication Templates Setup Module Description Here',
    route: '/admin/setup/communication-templates'
  },

  {
    name: 'Form Templates Setup',
    description: 'Form Templates Setup Module Description Here',
    route: '/admin/setup/form-templates'
  },*/

  {
    name: 'Goal Templates',
    description: 'Goal Templates Module Description Here',
    route: '/admin/setup/goal-templates'
  },

  {
    name: 'Interests',
    description: 'Interests Module Description Here',
    route: '/admin/setup/interests'
  },

  {
    name: 'Employee Positions',
    description: 'Employee Positions Module Description Here',
    route: '/admin/setup/employee-position'
  },

  {
    name: 'Cancellation Policies Setup',
    description: 'Cancellation Policies Setup Module Description Here',
    route: '/admin/setup/cancellation-policy'
  },

  /*{
    name: 'Bulk Communication Group Setup',
    description: 'Bulk Communication Group Setup Module Description Here',
    route: '/admin/setup/bulk-communication-groups'
  },*/

  /*{
    name: 'Participant Checklist Setup',
    description: 'Participant Checklist Setup Module Description Here',
    route: '/admin/setup/client-checklist'
  },*/

  /*{
    name: 'Change Pricelist',
    description: 'Module Description Here',
    route: '/admin/setup/client-checklist'
  },*/

  /*{
    name: 'Travel & Transport Settings',
    description: 'Module Description Here',
    route: '/admin/setup/travel-transport-settings'
  },

  {
    name: 'Sync Myob',
    description: 'Module Description Here',
    route: '/admin/setup/sync-myob'
  },*/

  /*{
    name: 'Branch Setup',
    description: 'Branch Setup Module Description Here',
    route: '/admin/setup/branch-setup'
  },

  {
    name: 'Organization Setup',
    description: 'Organization Setup Module Description Here',
    route: '/admin/setup/organization-setup'
  },*/

  {
    name:'Schedule',
    description: 'Schedule Module Description Here',
    route: '/admin/schedule'
  },

  {
    name:'Dashboard',
    description: 'Dashboard Module Description Here',
    route: '/admin/dashboard'
  },

  /*{
    name:'Admin Profile',
    description: 'Admin Profile Module Description Here',
    route: '/admin/profile'
  },*/
];


