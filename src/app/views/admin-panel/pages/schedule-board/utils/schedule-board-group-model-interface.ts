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

export interface GroupShiftDetail {
  id: string;
  group_id?: string;
  name: string;  
  total_hours: number;  
  total_billable_hours: number;
  transport_distance?: any;
  profile_pic_url: any;
  total_transport?: any;
  total_travel_km?: any;
}

export interface ScheduleBoardGroup{
  group: GroupShiftDetail;
  schedule: any[];
  start_date: any;
  end_date: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

export const displayedColumns: TableHeader[] = [
  { col_name: 'group', title: "" },
  { col_name: 'mon', title: 'Monday' },
  { col_name: 'tue', title: 'Tuesday' },
  { col_name: 'wed', title: 'Wednesday' },
  { col_name: 'thu', title: 'Thursday' },
  { col_name: 'fri', title: 'Friday' },
  { col_name: 'sat', title: 'Saturday' },
  { col_name: 'sun', title: 'Sunday' },
];


export const scheduleBoardListGroup: ScheduleBoardGroup[] = [
  {
    group: {
      id: "4324",
      name: "Art and Creativity",
      total_hours: 14.00,
      total_billable_hours: 14.00,
      profile_pic_url: ""
    },
    schedule: [
      // Monday
      [
        {
          id: "11101",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '09:00',
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
          activity: "Social Support Group",
          start_time: '13:00',
          end_time: '14:00',
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
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '09:00',
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
          activity: "Group Medications",
          start_time: '13:00',
          end_time: '14:00',
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "scheduled"
        },
      ],
      // Wednesday
      [
        {
          id: "11103",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending",
        }
      ],
      [
        // Thursday
        {
          id: "11104",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      
      // Friday
      [
        {
          id: "11105",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      // Saturday
      [
        {
          id: "11106",    
          type: "Individual",  
          employee_id: '124',
          employee: "",
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      // Sunday
      [
        {
          id: "11107",    
          type: "Individual",  
          employee_id: '124',
          employee: "", 
          activity: "Go to Church w/ Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        }
      ]
    ],  
    start_date: new Date(),  
    end_date: new Date()
  },  

  {
    group: {
      id: "4325",
      name: "District 360 Team",
      total_hours: 8.00,
      total_billable_hours: 8.00,
      profile_pic_url: ""
    },
    schedule: [
      // Monday
      [
        {
          id: "11101",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '09:00',
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "completed"
        }
      ],
      // Tuesday
      [
        {
          id: "33102",    
          type: "Individual",  
          employee_id: "",
          employee: "",  
          activity: "Group Medications",
          start_time: '13:00',
          end_time: '14:00',
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "scheduled"
        },
      ],
      // Wednesday
      [
        {
          id: "11103",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending",
        }
      ],
      [
        // Thursday
        
      ],
      
      // Friday
      [
        {
          id: "11105",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      // Saturday
      [
        {
          id: "11106",    
          type: "Individual",  
          employee_id: '124',
          employee: "",
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      // Sunday
      [
        
      ]
    ],  
    start_date: new Date(),  
    end_date: new Date()
  }, 
]

export const groupProfileSchedule: ScheduleBoardGroup[] = [
  {
    group: {
      id: "4324",
      name: "Art and Creativity",
      total_hours: 14.00,
      total_billable_hours: 14.00,
      profile_pic_url: ""
    },
    schedule: [
      // Monday
      [
        {
          id: "11101",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '09:00',
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
          activity: "Social Support Group",
          start_time: '13:00',
          end_time: '14:00',
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
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '09:00',
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
          activity: "Group Medications",
          start_time: '13:00',
          end_time: '14:00',
          total_hours: 1.00,
          billable: true,
          transport_distance: 0.00,
          status: "scheduled"
        },
      ],
      // Wednesday
      [
        {
          id: "11103",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending",
        }
      ],
      [
        // Thursday
        {
          id: "11104",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      
      // Friday
      [
        {
          id: "11105",    
          type: "Individual",  
          employee_id: '124',
          employee: "James Vladimir",  
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      // Saturday
      [
        {
          id: "11106",    
          type: "Individual",  
          employee_id: '124',
          employee: "",
          activity: "Social Support Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        },
      ],
      // Sunday
      [
        {
          id: "11107",    
          type: "Individual",  
          employee_id: '124',
          employee: "", 
          activity: "Go to Church w/ Group",
          start_time: '8:00',
          end_time: '10:00',
          total_hours: 2.00,
          billable: true,
          transport_distance: 0.00,
          status: "pending"
        }
      ]
    ],  
    start_date: new Date(),  
    end_date: new Date()
  },  

]