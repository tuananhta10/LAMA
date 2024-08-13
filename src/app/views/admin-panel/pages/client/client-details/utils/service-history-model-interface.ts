export interface ServiceHistory {
  id: string;  
  service: string;  
  entry_by: string;  
  date: string;  
  hours: string;  
  profile_image: string;
  job_description: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'service', title: 'Service' },
  { col_name: 'profile_image', title: ' ' },
  { col_name: 'entry_by', title: 'Entry By' },
  { col_name: 'date', title: 'Date' },
  { col_name: 'hours', title: 'Hours' },
  { col_name: 'action', title: '' },

];

const selectedColumns: string[] =  [
  'id',
  'service',  
  'profile_image',
  'entry_by',  
  'date',  
  'hours',
  'action'
  //'status',
];
 
const serviceHistoryList: ServiceHistory[] = [
  {
    id: "41230",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-1.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Support Worker'
  },

  {
    id: "41231",  
    service: "Induction",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-2.jpg",  
    date: "13-09-2021",  
    hours: "2:00",
    job_description: 'Support Worker'
  },
  {
    id: "41232",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-3.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Psychiatrist'
  },

  {
    id: "41233",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-4.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Psychiatrist'
  },

  {
    id: "41234",  
    service: "Induction",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-5.jpg",  
    date: "13-09-2021",  
    hours: "2:00",
    job_description: 'HR Manager'
  },
  {
    id: "41235",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-6.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Support Worker'
  },

  {
    id: "41236",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-7.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Support Worker'
  },

  {
    id: "41237",  
    service: "Meet and Greet",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-8.jpg",  
    date: "13-09-2021",  
    hours: "3:00",
    job_description: 'Careworker'
  },

  {
    id: "41238",  
    service: "Meet and Greet",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-9.jpg",  
    date: "13-09-2021",  
    hours: "3:00",
    job_description: 'Nutritionist'
  },

  {
    id: "41239",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-10.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Support Worker'
  },

  {
    id: "412310",  
    service: "Induction",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-11.jpg",  
    date: "13-09-2021",  
    hours: "2:00",
    job_description: 'Caregiver'
  },
  {
    id: "412311",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-12.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Urologist'
  },

  {
    id: "41212",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-13.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Support Worker'
  },

  {
    id: "412313",  
    service: "Induction",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-14.jpg",  
    date: "13-09-2021",  
    hours: "2:00",
    job_description: 'Internal Doctor/Medicine'
  },
  {
    id: "412314",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-15.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Support Worker'
  },

  {
    id: "412315",  
    service: "Travel Allowance",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-16.jpg",  
    date: "13-09-2021",  
    hours: "1:00",
    job_description: 'Support Worker'
  },

  {
    id: "412316",  
    service: "Meet and Greet",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-1.jpg",  
    date: "13-09-2021",  
    hours: "3:00",
    job_description: 'Support Worker'
  },

  {
    id: "412317",  
    service: "Meet and Greet",
    entry_by: "Vicki Smith",
    profile_image: "/assets/images/faces/face-2.jpg",  
    date: "13-09-2021",  
    hours: "3:00",
    job_description: 'Support Worker'
  },
];

export {
  displayedColumns,
  selectedColumns,
  serviceHistoryList
}