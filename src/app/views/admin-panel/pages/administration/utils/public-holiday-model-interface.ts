import { 
  CalendarEvent,
  CalendarView
} from 'angular-calendar';
import { formatDate } from '@angular/common';
import { mainAnimations } from '@app-main-animation';
import { 
  addDays, 
  addHours, 
  startOfDay, 
  endOfDay,
  toDate 
} from 'date-fns';

export interface PublicHolidays extends CalendarEvent {
  id: string;  
  date?: any;
  branches: number
}

export interface TableHeader {
  col_name: string;
  title: string;
}

export const colors: any = {
  red: {
    primary: 'rgba(253, 197, 166, 1)',
    secondary: 'rgba(252, 243, 238, 1)',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: 'rgba(251, 191, 36, 1)',
    secondary: 'rgb(251,245,228, 1)',
  },

  pink: {
    primary: 'rgba(253, 203, 245, 1)',
    secondary: 'rgba(254, 241, 252, 1)',
  },

  light_blue: {
    primary: 'rgba(158, 221, 231, 1)',
    secondary: 'rgba(215, 244, 248, 1)',
  },
};


const displayedColumns: TableHeader[] = [
  { col_name: 'id', title: 'ID' },
  { col_name: 'name', title: 'Name' },
  { col_name: 'description', title: 'Description' },
  { col_name: 'date', title: 'Date' },
  { col_name: 'state', title: 'State' },
  { col_name: 'action', title: '' },

];

const selectedColumns: string[] =  [
  'id',
  'name',
  'description',
  'date',
  'state',
  'action'
];
 
const publicHolidayList: PublicHolidays[] = [
  {
    id: "144052",
    date: formatDate(startOfDay(new Date()), 'dd-MM-yyyy', 'en-US'),  
    branches: 1,
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
    //allDay: true,
    title: 'Test Date',
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    color: colors.blue,
  },

  {
    id: "144050",
    date: formatDate(new Date(), 'dd-MM-yyyy', 'en-US'),  
    branches: 1,
    start: startOfDay(addDays(new Date(), 2)),
    end: endOfDay(addDays(new Date(), 2)),
    //allDay: true,
    title: 'Another Test Date',
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    color: colors.red,
  },

  {
    id: "144051",
    date: formatDate(new Date("December 25, 2021"), 'dd-MM-yyyy', 'en-US'),  
    branches: 2,
    start: startOfDay(new Date("December 25, 2021")),
    //allDay: true,
    title: 'Christmas Day',
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    color: colors.yellow,
  },
  
  {
    id: "144053",
    date: formatDate(new Date("January 1, 2022"), 'dd-MM-yyyy', 'en-US'),  
    branches: 3,
    start: startOfDay(new Date("January 1, 2022")),
    //allDay: true,
    title: `New Year's Day`,
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    color: colors.red,
  },

  {
    id: "144054",
    date: formatDate(new Date("February 5, 2022"), 'dd-MM-yyyy', 'en-US'),  
    branches: 2,
    start: startOfDay(new Date("February 5, 2022")),
    //allDay: true,
    title: `National Worker's Day`,
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    color: colors.light_blue,
  },

  {
    id: "144055",
    date: formatDate(new Date("February 10, 2022"), 'dd-MM-yyyy', 'en-US'),  
    branches: 1,
    start: startOfDay(new Date("February 10, 2022")),
    end: addHours(new Date("February 10, 2022"), 18),
    title: 'Thanksgiving',
    draggable: true,
    resizable: {
      beforeStart: true,
      afterEnd: true,
    },
    color: colors.pink,
  },


];

export {
  displayedColumns,
  selectedColumns,
  publicHolidayList
}