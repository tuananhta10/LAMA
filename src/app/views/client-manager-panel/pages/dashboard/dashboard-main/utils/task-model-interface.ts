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
  name: string;  
  total_hours: number;  
  total_billable_hours: number;
  profile_pic_url: any;
}

export interface Task{
  id: any;
  schedule: any[];
  start_date: any;
  end_date: any;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

export const displayedColumns: TableHeader[] = [
  { col_name: 'mon', title: 'Mon' },
  { col_name: 'tue', title: 'Tues' },
  { col_name: 'wed', title: 'Wed' },
  { col_name: 'thu', title: 'Thur' },
  { col_name: 'fri', title: 'Fri' },
  { col_name: 'sat', title: 'Sat' },
  { col_name: 'sun', title: 'Sun' },
];


export const taskLists: Task[] = [
  {
    id: "2205",
    schedule: [
      // Monday
      {
        id: "11101",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
        activity: "Social Support",
        start_time: new Date("January 17, 2022, 8:00 AM"),
        end_time: new Date("January 17, 2022, 9:00 AM"),
        total_hours: 1.00,
        billable: true,
        transport_distance: 0.00,
        status: "completed"
      },
      // Tuesday
      {
        id: "11102",    
        type: "Individual",  
        employee_id: '124',
        employee: "James Vladimir",  
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
        employee_id: '124',
        employee: "James Vladimir",  
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
        employee_id: '124',
        employee: "James Vladimir",  
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
        employee_id: '124',
        employee: "James Vladimir",  
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
        employee_id: '124',
        employee: "James Vladimir",  
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
        employee_id: '124',
        employee: "James Vladimir",  
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
]
  
