export interface PayrateLoading {
  id: any;  
  name: string;  
  employment_type: string;   
  applicable_day: string;
  start_time: string;
  end_time: string;
  loading_rate: any;

  start_time_full?: string;
  end_time_full?: string;  
  loading_rate_percent?: string;

  pay_item: string;
}

export interface TableHeader {
  col_name: string;
  title: string;
}

const displayedColumns: TableHeader[] = [
  { col_name: "id", title: "ID" },
  { col_name: "name", title: "Name" },
  { col_name: "employment_type", title: "Employment Type" },
  { col_name: "applicable_day", title: "Applicable Day" },
  { col_name: "start_time_full", title: "Start Time" },
  { col_name: "end_time_full", title: "End Time" },
  { col_name: "loading_rate_percent", title: "Loading Rate" },
  //{ col_name: "pay_item", title: "Pay Item" },
  { col_name: 'action', title: '' },
];

const selectedColumns: string[] =  [
  "id",
  "name",
  "employment_type",
  "applicable_day",
  "start_time_full",
  "end_time_full",
  "loading_rate_percent",
  //"pay_item",
  'action'
];
 
const payrateLoadingList: PayrateLoading[] = [
  {
    id: "41230", 
    name: "Saturday Casual", 
    employment_type: "Casual",
    applicable_day: "Saturday",
    start_time: "00:00 AM",
    end_time: "23:59 PM",
    loading_rate: "1.000",
    pay_item: "Base Hourly lvl1 Saturday",
  },

  {
    id: "41231", 
    name: "Saturday Casual", 
    employment_type: "Casual",
    applicable_day: "Saturday",
    start_time: "00:00 AM",
    end_time: "23:59 PM",
    loading_rate: "1.000",
    pay_item: "Base Hourly lvl1 Saturday",
  },

  {
    id: "41232", 
    name: "Saturday Casual", 
    employment_type: "Casual",
    applicable_day: "Saturday",
    start_time: "00:00 AM",
    end_time: "23:59 PM",
    loading_rate: "1.000",
    pay_item: "Base Hourly lvl1 Saturday",
  },

  {
    id: "41233", 
    name: "Saturday Casual", 
    employment_type: "Casual",
    applicable_day: "Saturday",
    start_time: "00:00 AM",
    end_time: "23:59 PM",
    loading_rate: "1.000",
    pay_item: "Base Hourly lvl1 Saturday",
  },

  {
    id: "41234", 
    name: "Saturday Casual", 
    employment_type: "Casual",
    applicable_day: "Saturday",
    start_time: "00:00 AM",
    end_time: "23:59 PM",
    loading_rate: "1.000",
    pay_item: "Base Hourly lvl1 Saturday",
  },


  {
    id: "41235", 
    name: "Saturday Casual", 
    employment_type: "Casual",
    applicable_day: "Saturday",
    start_time: "00:00 AM",
    end_time: "23:59 PM",
    loading_rate: "1.000",
    pay_item: "Base Hourly lvl1 Saturday",
  },

  {
    id: "41236", 
    name: "Saturday Casual", 
    employment_type: "Casual",
    applicable_day: "Saturday",
    start_time: "00:00 AM",
    end_time: "23:59 PM",
    loading_rate: "1.000",
    pay_item: "Base Hourly lvl1 Saturday",
  },


];

export {
  displayedColumns,
  selectedColumns,
  payrateLoadingList
}