
export interface Navigation{
  name: string;  
  route: string; 
  icon?: string;  
  icon_active?: string;  
  submenus: SubMenu[],
  access?: any[]
}

export interface SubMenu{
  name: string;  
  route: string;
  access?: any[] 
}

export interface HelpFaqs{
  id: string;
  icon: string;  
  title: string;  
  description: string;  
  route: string;
}

const loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));

const AdminAccess: Navigation[] = [
  {
    name:'Referrals',
    route: '/staff/referrals',
    submenus: [],
    access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator']
  },
  {
    name:'Participants',
    route: '/staff/clients',
    access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator', 'Support Worker App'],
    submenus: [
      {
        name: 'Participant',
        route: '/staff/clients',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator', 'Support Worker App'],
      },

      {
        name: 'Participant Funding',
        route: '/staff/clients/client-funding',
        access: ['Admin'],
      },

      {
        name: 'Groups',
        route: '/staff/clients/client-groups',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
      },

      {
        name: 'Service Schedule',
        route: '/staff/clients/service-schedule',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
      },

    ]
  },
  {
    name:'Employees',
    route: '/staff/employees',
    access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
    submenus: [
      {
        name: 'Employees',
        route: '/staff/employees',
        access: ['Admin', 'Scheduler', 'Service Facilitator','Support Worker App', 'Support Coordinator'],
      },

      {
        name: 'Employee Shifts',
        route: '/staff/employees/employee-shift',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
      },


      {
        name: 'Employee Tasks',
        route: '/staff/employees/employee-task',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
      },

      {
        name: 'Employee Leave',
        route: '/staff/employees/employee-leave',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
      },

      {
        name: 'Accidents / Incidents ',
        route: '/staff/care/incidents',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
      },

      {
        name: 'Timesheets',
        route: '/staff/employees/timesheet',
        access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
      },
    ]
  },


  {
    name:'Schedule',
    route: '/staff/schedule',
    access: ['Admin', 'Scheduler', 'Service Facilitator', 'Support Coordinator'],
    submenus: []
  },
];

const HelpFaqsMenu: HelpFaqs[] = [
  {
    id: 'warning',
    icon: "/assets/images/icons/help-warning.png",  
    title: "Help Center",  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },

  {
    id: 'info',
    icon: "/assets/images/icons/info.png",  
    title: `What's New`,  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },

  {
    id: 'success',
    icon: "/assets/images/icons/success.png",  
    title: "Getting Started",  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },

  {
    id: 'danger',
    icon: "/assets/images/icons/danger.png",  
    title: "Error about page",  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },

  {
    id: 'warning',
    icon: "/assets/images/icons/help-warning.png",  
    title: "Help Center",  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },

  {
    id: 'info',
    icon: "/assets/images/icons/info.png",  
    title: `What's New`,  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },

  {
    id: 'success',
    icon: "/assets/images/icons/success.png",  
    title: "Getting Started",  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },

  {
    id: 'danger',
    icon: "/assets/images/icons/danger.png",  
    title: "Error about page",  
    description: "Ut ipsum justo, malesuada a enim vitae, malesuada",  
    route: "",
  },
];

export {
  AdminAccess,
  HelpFaqsMenu
}