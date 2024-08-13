export interface ShiftSchedule {
  id?: string;  
  type?: string;  
  employee?: string;
  employee_id?: string;  
  activity?: string;
  start_time?: any;
  end_time?: any;
  total_hours?: number;
  transport_distance?: number;
  billable?: boolean;
  status?: string;
}

export interface ClientShiftDetail {
  id: string;
  client_id?: string;
  name: string;  
  total_hours: number;  
  total_billable_hours: number;
  profile_pic_url: any;
  total_transport?: any;
  total_travel_km?: any;
}

export interface ScheduleBoardClient{
  client: ClientShiftDetail;
  schedule: any[];
  start_date: any;
  end_date: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

export const displayedColumns: TableHeader[] = [
  { col_name: 'client', title: "" },
  { col_name: 'mon', title: 'Monday' },
  { col_name: 'tue', title: 'Tuesday' },
  { col_name: 'wed', title: 'Wednesday' },
  { col_name: 'thu', title: 'Thursday' },
  { col_name: 'fri', title: 'Friday' },
  { col_name: 'sat', title: 'Saturday' },
  { col_name: 'sun', title: 'Sunday' },
];


export const scheduleBoardListClient: ScheduleBoardClient[] = [
  {
    client: {
      id: "4324",
      name: "James Johnson",
      total_hours: 14.00,
      total_billable_hours: 14.00,
      profile_pic_url: "/assets/images/faces/face-9.jpg"
    },
    schedule: [
      // Monday
      [
        {
          id: "11101",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support",
          start_time: new Date("January 17, 2022 8:00"),
          end_time: new Date("January 17, 2022 9:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "completed"
        },

        {
          id: "11101",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support",
          start_time: new Date("January 17, 2022 13:00"),
          end_time: new Date("January 17, 2022 14:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "cancelled"
        },
      ],
      // Tuesday
      [
        {
          id: "33102",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support",
          start_time: new Date("January 18, 2022 8:00"),
          end_time: new Date("January 18, 2022 9:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "completed"
        },

        {
          id: "33102",    
          type: "Individual",  
          employee_id: "",
          employee: "",  
          activity: "Client Medications",
          start_time: new Date("January 18, 2022 13:00"),
          end_time: new Date("January 18, 2022 14:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "scheduled"
        },
      ],
      // Wednesday
      {
        id: "11103",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
        activity: "Social Support",
        start_time: new Date("January 19, 2022 8:00"),
        end_time: new Date("January 19, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending",
      },
      // Thursday
      {
        id: "11104",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
        activity: "Social Support",
        start_time: new Date("January 20, 2022 8:00"),
        end_time: new Date("January 20, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Friday
      {
        id: "11105",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
        activity: "Social Support",
        start_time: new Date("January 21, 2022 8:00"),
        end_time: new Date("January 21, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Saturday
      {
        id: "11106",    
        type: "Individual",  
        employee_id: '124',
        employee: "",
        activity: "Social Support",
        start_time: new Date("January 22, 2022 8:00"),
        end_time: new Date("January 22, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Sunday
      {
        id: "11107",    
        type: "Individual",  
        employee_id: '124',
        employee: "", 
        activity: "Go to Church w/ Client",
        start_time: new Date("January 23, 2022 8:00"),
        end_time: new Date("January 23, 2022 10:00"),
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
    client: {
      id: "4325",
      name: "Marian Angela",
      total_hours: 2.00,
      total_billable_hours: 2.00,
      profile_pic_url: "/assets/images/faces/face-8.jpg"
    },
    schedule: [
      // Monday
      {},
      // Tuesday
      {},
      // Wednesday
      {},
      // Thursday
      {
        id: "21101",    
        type: "Individual",  
        employee_id: '124',
        employee: "Pamela Sunder",  
        activity: "Coordination of Supports",
        start_time: new Date("January 20, 2022 13:00"),
        end_time: new Date("January 20, 2022 14:00"),
        total_hours: 1.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Friday
      {
        id: "21102",    
        type: "Individual",  
        employee_id: '124',
        employee: "Pamela Sunder",  
        activity: "Coordination of Supports",
        start_time: new Date("January 21, 2022 13:00"),
        end_time: new Date("January 21, 2022 14:00"),
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
    client: {
      id: "7325",
      name: "Carmin Milan",
      total_hours: 3.00,
      total_billable_hours: 3.00,
      profile_pic_url: "/assets/images/faces/face-12.jpg"
    },
    schedule: [
      // Monday
      {},
      // Tuesday
      {
        id: "21101",    
        type: "Individual",  
        employee_id: "",
        employee: "",  
        activity: "Coordination of Supports",
        start_time: new Date("January 18, 2022 13:00"),
        end_time: new Date("January 18, 2022 14:00"),
        total_hours: 1.00,
        billable: true,
        transport_distance: 0.00,
        status: "created"
      },
      // Wednesday
      {},
      // Thursday
      {
        id: "21101",    
        type: "Individual",  
        employee_id: "",
        employee: "",  
        activity: "Coordination of Supports",
        start_time: new Date("January 20, 2022 13:00"),
        end_time: new Date("January 20, 2022 14:00"),
        total_hours: 1.00,
        billable: true,
        transport_distance: 0.00,
        status: "created"
      },
      // Friday
      {
        id: "21102",    
        type: "Individual",  
        employee_id: "",
        employee: "",  
        activity: "Coordination of Supports",
        start_time: new Date("January 21, 2022 13:00"),
        end_time: new Date("January 21, 2022 14:00"),
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
    client: {
      id: "1325",
      name: "Samson Martin",
      total_hours: 6.00,
      total_billable_hours: 6.00,
      profile_pic_url: "/assets/images/faces/face-11.jpg"
    },
    schedule: [
      // Monday
      {
        id: "11101",    
        type: "Individual",  
        employee_id: '124',
        employee: "Cane Melion",  
        activity: "Coordination of Supports",
        start_time: new Date("January 17, 2022 7:00"),
        end_time: new Date("January 17, 2022 9:00"),
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
        employee_id: '124',
        employee: "Cane Melion",  
        activity: "Coordination of Supports",
        start_time: new Date("January 19, 2022 7:00"),
        end_time: new Date("January 19, 2022 9:00"),
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
        employee_id: '124',
        employee: "Cane Melion",  
        activity: "Coordination of Supports",
        start_time: new Date("January 21, 2022 7:00"),
        end_time: new Date("January 21, 2022 9:00"),
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
    client: {
      id: "5325",
      name: "Michael Menon",
      total_hours: 6.00,
      total_billable_hours: 6.00,
      profile_pic_url: "/assets/images/faces/face-13.jpg"
    },
    schedule: [
      // Monday
      {
        id: "51101",    
        type: "Individual",  
        employee_id: '124',
        employee: "Mark Martines",  
        activity: "Coordination of Supports",
        start_time: new Date("January 17, 2022 9:10"),
        end_time: new Date("January 17, 2022 11:10"),
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
        employee_id: '124',
        employee: "Mark Martines",  
        activity: "Coordination of Supports",
        start_time: new Date("January 19, 2022 9:10"),
        end_time: new Date("January 19, 2022 11:10"),
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
        employee_id: '124',
        employee: "Mark Martines",  
        activity: "Coordination of Supports",
        start_time: new Date("January 21, 2022 9:10"),
        end_time: new Date("January 21, 2022 11:10"),
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
]

export const clientProfileSchedule: ScheduleBoardClient[] = [
  {
    client: {
      id: "4324",
      name: "James Johnson",
      total_hours: 14.00,
      total_billable_hours: 14.00,
      profile_pic_url: "/assets/images/faces/face-9.jpg"
    },
    schedule: [
      // Monday
      [
        {
          id: "11101",    
          type: "Individual",  
          employee_id: '124',
          employee: "",  
          activity: "Social Support",
          start_time: new Date("January 17, 2022 8:00"),
          end_time: new Date("January 17, 2022 9:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "completed"
        },

        {
          id: "11101",    
          type: "Individual",  
          employee_id: '124',
          employee: "",  
          activity: "Social Support",
          start_time: new Date("January 17, 2022 13:00"),
          end_time: new Date("January 17, 2022 14:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "cancelled"
        },
      ],
      // Tuesday
      [
        {
          id: "33102",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support",
          start_time: new Date("January 18, 2022 8:00"),
          end_time: new Date("January 18, 2022 9:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "completed"
        },

        {
          id: "33102",    
          type: "Individual",  
          employee_id: "",
          employee: "",  
          activity: "Client Medications",
          start_time: new Date("January 18, 2022 13:00"),
          end_time: new Date("January 18, 2022 14:00"),
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "scheduled"
        },
      ],
      // Wednesday
      {
        id: "11103",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
        activity: "Social Support",
        start_time: new Date("January 19, 2022 8:00"),
        end_time: new Date("January 19, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending",
      },
      // Thursday
      {
        id: "11104",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
        activity: "Social Support",
        start_time: new Date("January 20, 2022 8:00"),
        end_time: new Date("January 20, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Friday
      {
        id: "11105",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
        activity: "Social Support",
        start_time: new Date("January 21, 2022 8:00"),
        end_time: new Date("January 21, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Saturday
      {
        id: "11106",    
        type: "Individual",  
        employee_id: '124',
        employee: "",
        activity: "Social Support",
        start_time: new Date("January 22, 2022 8:00"),
        end_time: new Date("January 22, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      },
      // Sunday
      {
        id: "11107",    
        type: "Individual",  
        employee_id: '124',
        employee: "", 
        activity: "Go to Church w/ Client",
        start_time: new Date("January 23, 2022 8:00"),
        end_time: new Date("January 23, 2022 10:00"),
        total_hours: 2.00,
        billable: true,
        transport_distance: 0.00,
        status: "pending"
      }
    ],  
    start_date: new Date("January 17, 2022"),  
    end_date: new Date("January 23, 2022")
  },  
]