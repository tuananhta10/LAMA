
export interface Navigation{
  name: string;  
  route: string; 
  icon?: string;  
  icon_active?: string;  
  submenus: SubMenu[]
}

export interface SubMenu{
  name: string;  
  route: string; 
  restriction?: boolean
}

export interface HelpFaqs{
  id: number;
  icon: string;  
  question: string;  
  answer: string;  
  route?: string;
  type?:string;
}

const loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

const AdminAccess: Navigation[] = [
  {
    name:'Referrals',
    route: '/admin/referrals',
    submenus: [],
    //icon: '/assets/images/icons/admin-icon/menu-pack-1/referral.png',
    //icon_active: '/assets/images/icons/admin-icon/menu-pack-1/referral-purple.png',
  },
  /*{
    name:'Intake',
    route: '/admin/intake',
    submenus: [],
    //icon: '/assets/images/icons/admin-icon/menu-pack-1/intake.png',
    //icon_active: '/assets/images/icons/admin-icon/menu-pack-1/intake-purple.png',
  },*/
  {
    name:'Participants',
    route: '/admin/clients',
    //icon: '/assets/images/icons/admin-icon/menu-pack-1/client.png',
    //icon_active: '/assets/images/icons/admin-icon/menu-pack-1/client-purple.png',
    submenus: [
      {
        name: 'Participant List',
        route: '/admin/clients'
      },

      {
        name: 'Participant Funding',
        route: '/admin/clients/client-funding'
      },

      {
        name: 'Groups',
        route: '/admin/clients/client-groups'
      },

      /*{
        name: 'Service Providers',
        route: '/admin/clients/groups'
      },*/

      {
        name: 'Service Schedule',
        route: '/admin/clients/service-schedule'
      },

      {
        name: 'Bulk Claim',
        route: '/admin/clients/funding-claim'
      },

      {
        name: 'Invoice Batches',
        route: '/admin/clients/invoice-batches'
      },

      {
        name: 'Invoices',
        route: '/admin/clients/invoices'
      },

      /*{
        name: 'Service Calendar',
        route: '/admin/clients/groups'
      },*/
    ]
  },
  {
    name:'Employees',
    route: '/admin/employees',
    //icon: '/assets/images/icons/admin-icon/menu-pack-1/employee.png',
    //icon_active: '/assets/images/icons/admin-icon/menu-pack-1/employee-purple.png',
    submenus: [
      /*{
        name: 'Search',   
        route: 'search'
      },*/
      {
        name: 'Employee List',
        route: '/admin/employees'
      },

      {
        name: 'Employee Shifts',
        route: '/admin/employees/employee-shift'
      },

      /*{
        name: 'Available Shifts',
        route: '/admin/employees/available-shift'
      },*/

      {
        name: 'Employee Tasks',
        route: '/admin/employees/employee-task'
      },

      {
        name: 'Employee Leave',
        route: '/admin/employees/employee-leave'
      },

      {
        name: 'Accidents / Incidents ',
        route: '/admin/care/incidents'
      },

      /*{
        name: 'Service Calendar',
        route: '/admin/employees/service-calendar'
      },
      */
      /*{
        name: 'Timesheets',
        route: '/admin/employees/timesheet'
      },*/
      {
        name: 'Timesheet Approvals',
        route: '/admin/employees/timesheet-approval'
      },
/*
      {
        name: 'Bulk Email Notifications',
        route: '/admin/employees/email-notifications'
      },

      {
        name: 'Bulk SMS Notifications',
        route: '/admin/employees/sms-notifications'
      },*/
    ]
  },

  /*{
    name:'Care',
    route: '/admin/care',
    icon: '/assets/images/icons/admin-icon/menu-pack-1/care.png',
    icon_active: '/assets/images/icons/admin-icon/menu-pack-1/care-purple.png',
    submenus: [
      {
        name: 'Needs Assessments',
        route: '/admin/care/needs-assessments'
      },

      {
        name: 'Support Coordination',
        route: '/admin/care/support-coordination'
      },

      {
        name: 'Accidents / Incidents ',
        route: '/admin/care/incidents'
      },
      {
        name: 'Plan Management Import Invoice',
        route: '/admin/care/plan-management-import-invoice'
      },

      {
        name: 'Plan Management Claim',
        route: '/admin/care/plan-management-claims'
      },
    ]
  },*/
  {
    name:'Admin',
    route: '/admin/setup',
    //icon: '/assets/images/icons/admin-icon/menu-pack-1/admin.png',
    //icon_active: '/assets/images/icons/admin-icon/menu-pack-1/admin-purple.png',
    submenus: [
      {
        name: 'Search',   
        route: 'search'
      },

      {
        name: 'Branch List',
        restriction: true,
        route: '/admin/setup/branch-list'
      },

      {
        name: 'Cancellation Policies',
        route: '/admin/setup/cancellation-policy'
      },

      {
        name: 'Employee Positions',
        route: '/admin/setup/employee-position'
      },

      /*{
        name: 'Expense Type List',
        route: '/admin/setup/expense-type-list'
      },*/
      {
        name: 'External Providers',
        route: '/admin/setup/external-providers'
      },
      {
        name: 'Funding Source',
        route: '/admin/setup/funding-source'
      },
      /*{
        name: 'Gender',
        route: '/admin/setup/gender'
      },*/
      {
        name: 'Interests',
        route: '/admin/setup/interests'
      },
      {
        name: 'Languages',
        route: '/admin/setup/languages'
      },
      /*{
        name: 'Job Types',
        route: '/admin/setup/job-types'
      },*/
      /*{
        name: 'Organization List',
        route: '/admin/setup/organization-list'
      },*/
      {
        name: 'Organisation Settings',
        restriction: true,
        route: '/admin/setup/organization-settings'
      },
      
      {
        name: 'Payrate Loading',
        route: '/admin/setup/payrate-loading'
      },
      {
        name: 'Payrates',
        route: '/admin/setup/payrates'
      },
      {
        name: 'Price List',
        route: '/admin/setup/price-list'
      },
      {
        name: 'Public Holiday',
        route: '/admin/setup/public-holiday'
      },
      /*{
        name: 'Qualifications',
        route: '/admin/setup/qualifications'
      },*/
      {
        name: 'Qualifications',
        route: '/admin/setup/qualifications'
      },
      {
        name: 'SOS Numbers',
        route: '/admin/setup/sos-numbers'
      },
      /*{
        name: 'SMS Credits',
        route: '/admin/setup/sms-credits'
      },*/
      /*{
        name: 'Service Types',
        route: '/admin/setup/service-types'
      },*/
      /*{
        name: 'Skills',
        route: '/admin/setup/skills'
      },*/
      /*{
        name: 'Client Checklist',
        route: '/admin/setup/client-checklist'
      },*/
      /*{
        name: 'Communication Groups',
        route: '/admin/setup/bulk-communication-groups'
      },*/
      /*{
        name: 'Communication Templates',
        route: '/admin/setup/communication-templates'
      },*/
      /*{
        name: 'Form Templates',
        route: '/admin/setup/form-templates'
      },*/
      {
        name: 'Sync Data',
        route: '/admin/setup/sync-data'
      },

      /*{
        name: 'Change Pricelist',
        route: '/admin/setup/client-checklist'
      },*/
      
      /*{
        name: 'Goal Templates',
        route: '/admin/setup/goal-templates'
      },*/
      
      /*{
        name: 'Hobbies',
        route: '/admin/setup/hobbies'
      },*/

      /*{
        name: 'Travel & Transport Settings',
        route: '/admin/setup/travel-transport-settings'
      },*/

    ]
  },
  {
    name:'Schedule',
    route: '/admin/schedule',
    //icon: '/assets/images/icons/admin-icon/menu-pack-1/schedule.png',
    //icon_active: '/assets/images/icons/admin-icon/menu-pack-1/schedule-purple.png',
    submenus: []
  },
];

const HelpFaqsMenu: HelpFaqs[] = [
  {
    id:1,
    icon:"/assets/images/icons/help-warning.png",
    question:"SEARCH GUIDE",
    answer:"",
    route:'https://lamacarehelp.zendesk.com/hc/en-au',
    type:'url'
  },
  {
    id:2,
    icon:"/assets/images/icons/help-warning.png",
    question:"EMAIL SUPPORT",
    answer:"",
    route:'support@lamacare.com.au',
    type:'email'
  },
]

// [
//   {
//     "id": 1,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "What is LAMA software and how does it work?",
//     "answer": "LAMA software is an operation system designed specifically for NDIS providers to help them manage their participants, employees, and services. It simplifies processes like pricing, scheduling, invoicing, and compliance, and provides tools for tracking communication and document access."
//   },
//   {
//     "id": 2,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "Is LAMA software easy to use?",
//     "answer": "LAMA software has been designed with the user experience in mind, with the goal of making it intuitive and straightforward to use."
//   },
//   {
//     "id": 3,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "Can LAMA software help me run my business more efficiently?",
//     "answer": "Yes, LAMA software is intended to help NDIS providers streamline their operations and save time and effort. It can assist with tasks like pricing and invoicing, and provide insight into your business through data collection."
//   },
//   {
//     "id": 4,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "Is LAMA software affordable?",
//     "answer": "LAMA software is priced to be accessible to businesses of all sizes, with the goal of helping you grow your business without breaking the bank."
//   },
//   {
//     "id": 5,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "Does LAMA software offer support for its users?",
//     "answer": "Yes, LAMA software provides support to its users to ensure that they are able to make the most of the system and get any questions or issues resolved quickly."
//   },
//   {
//     "id": 6,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "How does LAMA software handle data security and privacy?",
//     "answer": "LAMA software is designed with data security and privacy in mind, and follows all relevant regulations and guidelines to protect sensitive information."
//   },
//   {
//     "id": 7,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "Can LAMA software be customised to fit the needs of my business?",
//     "answer": "LAMA software offers a range of features and settings that can be adjusted to fit the specific needs and preferences of your business."
//   },
//   {
//     "id": 8,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "Is LAMA software compatible with other systems or software that my business uses?",
//     "answer": "LAMA software is designed to be flexible and compatible with a variety of other systems and software, such as Xero and Stripe, making it easier to integrate into your existing workflow."
//   },
//   {
//     "id": 9,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "How is LAMA software updated and maintained?",
//     "answer": "LAMA software is regularly updated to add new features, fix any issues, and ensure that it remains effective and efficient. Maintenance is handled by the LAMA Care team to ensure smooth operation."
//   },
//   {
//     "id": 10,
//     "icon": "/assets/images/icons/help-warning.png",
//     "question": "Is LAMA software only available to NDIS providers in Australia?",
//     "answer": "LAMA software is currently only available to NDIS providers in Australia, but the team is exploring options for expanding to other regions in the future."
//   }
// ]

export {
  AdminAccess,
  HelpFaqsMenu
}