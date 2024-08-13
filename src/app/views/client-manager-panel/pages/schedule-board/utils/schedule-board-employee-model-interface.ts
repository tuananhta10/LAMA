export interface ShiftSchedule {
  id?: string;  
  type?: string;  
  client?: string;
  client_id?: string;  
  activity?: string;
  funding_source?: string;
  start_time?: any;
  end_time?: any;
  total_hours?: number;
  transport_distance?: number;
  billable?: boolean;
  employee_leave?: boolean;
  employee_leave_date_from?: any;  
  employee_leave_date_to?: any;
  employee_leave_date_whole_day?: boolean;
  status?: string;
}

export interface EmployeeShiftDetail {
  id: string;
  name: string;  
  employee_position: string;
  total_hours: number;  
  total_billable_hours: number;
  profile_pic_url: any;
  total_transport?: any;
  total_travel_km?: any;
}

export interface ScheduleBoardEmployee{
  employee: EmployeeShiftDetail;
  schedule: any[];
  start_date: any;
  end_date: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

export const displayedColumns: TableHeader[] = [
  { col_name: 'employee', title: '' },
  { col_name: 'mon', title: 'Monday' },
  { col_name: 'tue', title: 'Tuesday' },
  { col_name: 'wed', title: 'Wednesday' },
  { col_name: 'thu', title: 'Thursday' },
  { col_name: 'fri', title: 'Friday' },
  { col_name: 'sat', title: 'Saturday' },
  { col_name: 'sun', title: 'Sunday' },
];


export const scheduleBoardListEmployee: ScheduleBoardEmployee[] = [
  {
     employee: {
       id: "8325",
       name: "Unassigned",
       employee_position: "",
       total_hours: 3.00,
       total_billable_hours: 3.00,
       profile_pic_url: "/assets/images/placeholder/default-avatar.png"
     },
     schedule: [
       // Monday
       {
         
       },
       // Tuesday
       {
         id: "51101",    
         type: "Individual",  
         client_id: '124',
         client: "Carmin Milan",  
         funding_source: "SELF",
         activity: "Support",
         start_time: new Date("January 18, 2022, 1:00 PM"),
         end_time: new Date("January 18, 2022, 2:00 PM"),
         total_hours: 1.00,
         billable: true,
         transport_distance: 0.00,
         status: "created"
       },
       // Wednesday
       {},
       // Thursday
       {
         id: "51102",    
         type: "Individual",  
         client_id: '124',
         client: "Carmin Milan",  
         funding_source: "PLAN",
         activity: "Coordination of Supports",
         start_time: new Date("January 20, 2022, 1:00 PM"),
         end_time: new Date("January 20, 2022, 2:00 PM"),
         total_hours: 1.00,
         billable: true,
         transport_distance: 0.00,
         status: "created"
       },
       // Friday
       {
         id: "51103",    
         type: "Individual",  
         client_id: '124',
         client: "Carmin Milan",  
         funding_source: "PLAN",
         activity: "Coordination of Supports",
         start_time: new Date("January 21, 2022, 1:00 PM"),
         end_time: new Date("January 21, 2022, 2:00 PM"),
         total_hours: 1.00,
         billable: true,
         transport_distance: 0.00,
         status: "created"
       },
       // Saturday
       {},
       // Sunday
       {}
     ],  
     start_date: new Date("January 17, 2022"),  
     end_date: new Date("January 23, 2022")
   },


  {
    employee: {
      id: "4324",
      name: "James Vladimir",
      employee_position: "Support Worker",
      total_hours: 14.00,
      total_billable_hours: 14.00,
      profile_pic_url: "/assets/images/faces/face-3.jpg"
    },
    schedule: [
      // Monday
      {
        id: "11101",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 17, 2022, 8:00 AM"),
        end_time: new Date("January 17, 2022, 2:00 PM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Tuesday
      {
        id: "11102",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 18, 2022, 8:00 AM"),
        end_time: new Date("January 18, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Wednesday
      {
        id: "11103",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 19, 2022, 8:00 AM"),
        end_time: new Date("January 19, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending",
      },
      // Thursday
      {
        id: "11104",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 20, 2022, 8:00 AM"),
        end_time: new Date("January 20, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Friday
      {
        id: "11105",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 21, 2022, 8:00 AM"),
        end_time: new Date("January 21, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Saturday
      {
        id: "11106",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 22, 2022, 8:00 AM"),
        end_time: new Date("January 22, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Sunday
      {
        id: "11107",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Church",
        start_time: new Date("January 23, 2022, 8:00 AM"),
        end_time: new Date("January 23, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      }
    ],  
    start_date: new Date("January 17, 2022"),  
    end_date: new Date("January 23, 2022")
  },  

 {
    employee: {
      id: "4325",
      name: "Pamela Sunder",
      employee_position: "Support Worker",
      total_hours: 3.00,
      total_billable_hours: 3.00,
      profile_pic_url: "/assets/images/faces/face-4.jpg"
    },
    schedule: [
      // Monday
      {
        employee_leave: true,
        employee_leave_date_from: new Date("January 17, 2022"),  
        employee_leave_date_to: new Date("January 17, 2022"),
        employee_leave_date_whole_day: true,
      },
      // Tuesday
      {
        id: "21101",    
        type: "Individual",  
        client_id: '124',
        client: "Julius Martin",  
        funding_source: "SELF",
        activity: "Support",
        start_time: new Date("January 18, 2022, 1:00 PM"),
        end_time: new Date("January 18, 2022, 2:00 PM"),
        total_hours: 1.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Wednesday
      {},
      // Thursday
      {
        id: "21101",    
        type: "Individual",  
        client_id: '124',
        client: "Marian Angela",  
        funding_source: "PLAN",
        activity: "Coordination of Supports",
        start_time: new Date("January 20, 2022, 1:00 PM"),
        end_time: new Date("January 20, 2022, 2:00 PM"),
        total_hours: 1.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Friday
      {
        id: "21102",    
        type: "Individual",  
        client_id: '124',
        client: "Marian Angela",  
        funding_source: "PLAN",
        activity: "Coordination of Supports",
        start_time: new Date("January 21, 2022, 1:00 PM"),
        end_time: new Date("January 21, 2022, 2:00 PM"),
        total_hours: 1.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Saturday
      {},
      // Sunday
      {}
    ],  
    start_date: new Date("January 17, 2022"),  
    end_date: new Date("January 23, 2022")
  },
 
  {
    employee: {
      id: "1325",
      name: "Cane Melion",
      employee_position: "Support Coordinator",
      total_hours: 6.00,
      total_billable_hours: 6.00,
      profile_pic_url: "/assets/images/faces/face-6.jpg"
    },
    schedule: [
      // Monday
      {
        id: "11101",    
        type: "Individual",  
        client_id: '124',
        client: "Samson Martin",  
        funding_source: "NDIS",
        activity: "Coordination of Supports",
        start_time: new Date("January 17, 2022, 7:00 AM"),
        end_time: new Date("January 17, 2022, 9:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Tuesday
      {},
      // Wednesday
      {
        id: "11102",    
        type: "Individual",  
        client_id: '124',
        client: "Samson Martin",  
        funding_source: "NDIS",
        activity: "Coordination of Supports",
        start_time: new Date("January 19, 2022, 7:00 AM"),
        end_time: new Date("January 19, 2022, 9:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Thursday
      {},
      // Friday
      {
        id: "11103",    
        type: "Individual",  
        client_id: '124',
        client: "Samson Martin",  
        funding_source: "NDIS",
        activity: "Coordination of Supports",
        start_time: new Date("January 21, 2022, 7:00 AM"),
        end_time: new Date("January 21, 2022, 9:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Saturday
      {},
      // Sunday
      {}
    ],  
    start_date: new Date("January 17, 2022"),  
    end_date: new Date("January 23, 2022")
  }, 

  {
    employee: {
      id: "5325",
      name: "Mark Martines",
      employee_position: "Support Worker",
      total_hours: 6.00,
      total_billable_hours: 6.00,
      profile_pic_url: "/assets/images/faces/face-7.jpg"
    },
    schedule: [
      // Monday
      {
        id: "51101",    
        type: "Individual",  
        client_id: '124',
        client: "Michael Menon",  
        funding_source: "PLAN",
        activity: "Coordination of Supports",
        start_time: new Date("January 17, 2022, 9:10 AM"),
        end_time: new Date("January 17, 2022, 11:10 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Tuesday
      {},
      // Wednesday
      {
        id: "51102",    
        type: "Individual",  
        client_id: '124',
        client: "Michael Menon",  
        funding_source: "PLAN",
        activity: "Coordination of Supports",
        start_time: new Date("January 19, 2022, 9:10 AM"),
        end_time: new Date("January 19, 2022, 11:10 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "cancelled"
      },
      // Thursday
      {},
      // Friday
      {
        id: "51103",    
        type: "Individual",  
        client_id: '124',
        client: "Michael Menon",  
        funding_source: "PLAN",
        activity: "Coordination of Supports",
        start_time: new Date("January 21, 2022, 9:10 AM"),
        end_time: new Date("January 21, 2022, 11:10 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Saturday
      {},
      // Sunday
      {}
    ],  
    start_date: new Date("January 17, 2022"),  
    end_date: new Date("January 23, 2022")
  },
];

export const employeeProfileSchedule: ScheduleBoardEmployee[] = [
  {
    employee: {
      id: "4324",
      name: "James Vladimir",
      employee_position: "Support Worker",
      total_hours: 14.00,
      total_billable_hours: 14.00,
      profile_pic_url: "/assets/images/faces/face-3.jpg"
    },
    schedule: [
      // Monday
      {
        id: "11101",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 17, 2022, 8:00 AM"),
        end_time: new Date("January 17, 2022, 2:00 PM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Tuesday
      {
        id: "11102",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 18, 2022, 8:00 AM"),
        end_time: new Date("January 18, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Wednesday
      {
        id: "11103",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 19, 2022, 8:00 AM"),
        end_time: new Date("January 19, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending",
      },
      // Thursday
      {
        id: "11104",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 20, 2022, 8:00 AM"),
        end_time: new Date("January 20, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Friday
      {
        id: "11105",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 21, 2022, 8:00 AM"),
        end_time: new Date("January 21, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Saturday
      {
        id: "11106",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Social Support",
        start_time: new Date("January 22, 2022, 8:00 AM"),
        end_time: new Date("January 22, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Sunday
      {
        id: "11107",    
        type: "Individual",  
        client_id: '124',
        client: "James Johnson",  
        funding_source: 'NDIS',
        activity: "Church",
        start_time: new Date("January 23, 2022, 8:00 AM"),
        end_time: new Date("January 23, 2022, 10:00 AM"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      }
    ],  
    start_date: new Date("January 17, 2022"),  
    end_date: new Date("January 23, 2022")
  }
];