import moment from 'moment';

export function convertTimestampUtc(date: Date){
    let year = new Date(date).getFullYear();  
    let month = new Date(date).getMonth();  
    let day = new Date(date).getDate();
    let hour = new Date(date).getHours();  
    let min = new Date(date).getMinutes();  
    let sec = new Date(date).getSeconds();

    let result = Date.UTC(year, month, day, hour, min, sec) / 1000;

    return result;
}

export function convertTo12Hrs(time: any) {
    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}