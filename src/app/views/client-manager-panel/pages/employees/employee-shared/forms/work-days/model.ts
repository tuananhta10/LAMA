export interface WorkDaysModel {
    week_label?: string;
    is_available: boolean;
    time_start: string;
    time_end: string;
};

export interface CalendarModel {
    label: string;
    date: any;
    availability: string,
    is_available: boolean;
    time_start: string;
    time_end: string;
};