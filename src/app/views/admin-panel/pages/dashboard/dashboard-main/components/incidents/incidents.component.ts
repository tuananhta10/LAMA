import { Component, Input, OnInit } from '@angular/core';
import moment from 'moment';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { 
  addDays, 
  addHours,
  subHours,
  addWeeks, 
  startOfDay, 
  endOfDay,
  toDate,
  format,
  differenceInHours
} from 'date-fns';

@Component({
  selector: 'admin-dashboard-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {
  @Input() referralsData: any;
  @Input() incidentGraphData: any;

  public summaryData = [];
  public openData = [];
  public resolvedData = [];
  public withdrawnData = [];
  public undecidedData = [];
  public barChartLabels: string[] = [];
  public graphView: string = 'week';

  /* BAR CHART */
  public barChartOptions: any = {
    plugins: {
      title: {},
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          boxHeight: 12,
          fontColor: '#333',
          padding: 10,
          font: {
            family: 'Noto Sans'
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        barThickness: 15, // Adjust the value to reduce the bar size
        maxBarThickness: 15, // Adjust the value to maintain the maximum bar thickness
        minBarLength: 2, // Adjust the value to set the minimum bar length
        grid: {
          display: true
        },
      },
      y: {
        display: false,
        grid: {
          display: false
        },
      }
    }
  };

  public barChartType: any = 'bar';
  public barChartLegend = true;
  public barChartData: any[] = [
    {
      type: 'line',
      label: 'Summary',
      hoverBackgroundColor: 'rgb(133,92,248, 1)',
      backgroundColor: 'rgba(75,92,167, 0.2)',
      fill: true,
      borderWidth: 2,
      borderColor: 'rgba(75,92,167, 0.7)',
      pointBorderWidth: 0,
      pointBackgroundColor: '#755CA7',
      pointStyle: 'crossRot',
      tension: 0.2,
      data: this.summaryData,
    },
    {
      label: 'Open',
      data: this.openData,
      borderRadius: 2,
      hoverBackgroundColor: 'rgba(27,153,138, 1)',
      backgroundColor: 'rgba(27,153,138, 1)',
      borderColor: 'rgba(27,153,138, 1)',
    },
    {
      label: 'Resolved',
      data: this.resolvedData,
      borderRadius: 2,
      hoverBackgroundColor: 'rgba(0, 110, 229, 0.8)',
      backgroundColor: 'rgba(0, 110, 229, 1)',
      borderColor: 'rgba(0, 110, 229, 1)',
    },
    {
      label: 'Withdrawn',
      data: this.withdrawnData,
      borderRadius: 2,
      hoverBackgroundColor: 'rgb(255,99,132, 1)',
      backgroundColor: '#E5505D',
      borderColor: '#E5505D',
    },

    {
      label: 'Undecided',
      data: this.undecidedData,
      borderRadius: 2,
      hoverBackgroundColor: 'rgba(179, 171, 213, 0.8)',
      backgroundColor: 'rgba(179, 171, 213, 1)',
      borderColor: 'rgba(179, 171, 213, 1)',
    },
  ];


  public stackedGraphChartLabels: string[] = ["August 1", "August 7", "August 13", "August 20", "August 27", "August 31"];
  /* Stacked Graph CHART */
  public stackedGraphChartOptions: any = {
    indexAxis: 'y',
    plugins: {
      title: {},
      legend: {
        position: 'right',
        labels: {
          boxWidth: 15,
          boxHeight: 12,
          fontColor: '#333',
          padding: 10,
          font: {
            family: 'Noto Sans'
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false
        },
      },
      y: {
        stacked: true,
        grid: {
          display: true
        },
      }
    }
  };

  public stackedGraphChartType: any = 'bar';
  public stackedGraphChartLegend = true;
  public stackedGraphChartData: any[] = [
    {
      label: 'Open',
      pointStyle: 'cross',
      barThickness: 25,
      borderRadius: 2,
      data: [25,25,15,75,15,65,22],//this.openData,
      hoverBackgroundColor: 'rgba(94, 78, 160, 0.8)',
      backgroundColor: 'rgba(94, 78, 160, 1)',
      borderColor: 'rgba(94, 78, 160, 1)',
    },
    
    {
      label: 'Undecided',
      barThickness: 25,
      borderRadius: 2,
      data: [35,10,25,10,25,10,45],//this.undecidedData,
      hoverBackgroundColor: 'rgba(117,92,167, 0.8)',
      backgroundColor: 'rgba(117,92,167, 0.9)',
      borderColor: 'rgba(117,92,167, 1)',
    },

    {
      label: 'Referred',
      barThickness: 25,
      borderRadius: 2,
      data: [5,10,25,5,1,25,10],//this.undecidedData,
      hoverBackgroundColor: 'rgba(133,117,179, 0.8)',
      backgroundColor: 'rgba(133,117,179, 0.9)',
      borderColor: 'rgba(133,117,179, 1)',
    },

    {
      label: 'No Actions Required',
      barThickness: 25,
      borderRadius: 2,
      data: [45,25,10,5,15,4,25],//this.undecidedData,
      hoverBackgroundColor: 'rgba(179, 171, 213, 0.8)',
      backgroundColor: 'rgba(179, 171, 213, 1)',
      borderColor: 'rgba(179, 171, 213, 1)',
    },

    {
      label: 'Withdrawn',
      barThickness: 25,
      borderRadius: 2,
      data: [5,10,15,25,15,5,13],//this.withdrawnData,
      hoverBackgroundColor: 'rgb(229,80,93, 0.8)',
      backgroundColor: 'rgb(229,80,93, 0.9)',
      borderColor: 'rgb(229,80,93, 0.9)',
    },

    {
      label: 'Resolved',
      barThickness: 25,
      borderRadius: 2,
      data: [15,15,15,20,25,10,33],//this.resolvedData,
      hoverBackgroundColor: 'rgba(27,153,138, 0.8)',
      backgroundColor: 'rgba(27,153,138, 1)',
      borderColor: 'rgba(27,153,138, 1)',
    },
  ];


  /*REFERRALS*/
  public lineChartOptions: any = {
    plugins: {
      filler: {
        propagate: true
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    elements: {
      line: {
        fill: true,
        spanGaps: false,
        //borderDash: [2, 2],
      }
    },
    scales: {
      x: {
        grid: {
          display: true
        },
      },
      y: {
        display: false,
        grid: {
          display: false
        },

        suggestedMin: 0,
        suggestedMax: 5
      }
    },
    layout: {
      padding: {
        left: 25,
        right: 25,
        top: 10,
        bottom: 10
      }
    }
  };
  public lineChartType: any = 'bar';
  public lineChartLegend = false;
  public lineChartData: any[] = [
    {
      label: 'Open',
      data: [0,0,0,0,0,0,0],
      fill: true,
      hoverBackgroundColor: 'rgb(254, 192, 64, 1)',
      backgroundColor: 'rgb(254, 192, 64, 0.6)',
      borderColor: 'rgb(254, 192, 64, 1)',
      pointBackgroundColor: 'rgb(254, 192, 64, 1)',
      borderWidth: 2,
      pointBorderWidth: .4,
      tension: 0.2,
    },

    {
      label: 'Onboarded',
      data: [0,0,0,0,0,0,0],
      fill: true,
      hoverBackgroundColor: 'rgb(67,39,109, 1)',
      backgroundColor: 'rgb(67,39,109, 0.8)',
      borderColor: 'rgb(67,39,109, 1)',
      pointBackgroundColor: 'rgb(67,39,109, 1)',
      borderWidth: 2,
      pointBorderWidth: .4,
      tension: 0.3,
    },

    {
      label: 'Declined',
      data: [0,0,0,0,0,0,0],
      fill: true,
      hoverBackgroundColor: 'rgb(229, 80, 93, 1)',
      backgroundColor: 'rgb(229, 80, 93, 0.7)',
      borderColor: 'rgb(229, 80, 93, 1)',
      pointBackgroundColor: 'rgb(229, 80, 93, 1)',
      borderWidth: 2,
      pointBorderWidth: .4,
      tension: 0.3,
    },

    {
      type: 'line',
      label: 'Summary',
      data: Array(30).fill(0),
      fill: true,
      hoverBackgroundColor: 'rgb(179, 171, 213, 1)',
      backgroundColor: 'rgb(179, 171, 213, 0.6)',
      borderColor: 'rgb(179, 171, 213, 1)',
      pointBackgroundColor: 'rgb(179, 171, 213, 1)',
      borderWidth: 2,
      pointBorderWidth: .4,
      tension: 0.2,
    },
  ];

  public lineChartLabels: string[] = [];

  constructor() { }

  ngOnInit(): void {
    //console.log(this.incidentGraphData)
    this.generateReferralsGraph();
    this.generateIncidentGraph();
  }

  countObjectKeys(obj) {
    return Object.keys(obj).length;
  }

  sumObjectValues(obj) {
    let sum = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
        sum += obj[key];
      }
    }
    return sum;
  }

  generateIncidentGraph(){
    if(this.countObjectKeys(this.incidentGraphData) > 0){

      console.log("INCIDENT GRAPH", this.incidentGraphData)


      for(let item in this.incidentGraphData){
        console.log(item, this.sumObjectValues(this.incidentGraphData[item]))

        this.summaryData.push(this.sumObjectValues(this.incidentGraphData[item]));
        this.openData.push(this.incidentGraphData[item]?.open);
        this.resolvedData.push(this.incidentGraphData[item]?.resolved);
        this.undecidedData.push(this.incidentGraphData[item]?.undecided);
        this.withdrawnData.push(this.incidentGraphData[item]?.withdrawn);


        this.barChartLabels.push(item);
      }

      this.incidentGraphData.forEach(el => {
        console.log(el, this.sumObjectValues(el))

        /*let sum = element.open + element.resolved + element.undecided + element.withdrawn;
        this.summaryData.push(sum);
        this.openData.push(element.open);
        this.resolvedData.push(element.resolved);
        this.undecidedData.push(element.undecided);
        this.withdrawnData.push(element.withdrawn);

        var dateString = moment.unix(element.date_updated).format("MMM DD");
        this.barChartLabels.push(dateString)*/
      });

      //this.lineChartLabels = Array(7).fill(this.lineChartLabels[0]).map((el,i) => format(addDays(new Date(el), i), 'MMM dd'));
    }

    else{
      this.summaryData = [0,0,0,0,0,0,0];
      this.openData = [0,0,0,0,0,0,0];
      this.resolvedData = [0,0,0,0,0,0,0];
      this.undecidedData = [0,0,0,0,0,0,0];
      this.withdrawnData = [0,0,0,0,0,0,0];

      this.summaryData.forEach((element, i) => {
        let date = new Date()
        let dateString = moment.unix(convertTimestampUtc(addDays(date, i))).format("MMM DD");
        this.barChartLabels.push(dateString)
      });
    }
  }

  switchGraphPeriod(period){
    this.graphView = period;
  }

  // REFERRALS DATA
  public filteredReferrals: any[] = [];
  public openReferrals: any[] = [];  
  public approvedReferrals: any[] = [];
  public declinedReferrals: any[] = [];

  groupByDay(data) {
    const groups = {};
    data.forEach((item) => {
      // Get the date string in yyyy-mm-dd format from the timestamp
      const date = new Date(item.referral_date * 1000);
      const dateString = format(date, 'MMM dd');
      
      // Check if a group for the date already exists, else create a new group
      if (groups[dateString]) {
        groups[dateString].count++;
        groups[dateString].items.push(item);
      } else {
        groups[dateString] = {
          date: dateString,
          count: 1,
          items: [item]
        };
      }
    });
    return Object.values(groups);
  }
  generateReferralsGraph(){
    //Get the currentYear and the currentMonth
    let currentMonth = new Date().getMonth() + 1;
    let currentYear = JSON.stringify(new Date().getFullYear());

    //Then filter the dates
    let events = this.referralsData.filter(e => {
      let [year, month] = JSON.stringify(new Date(e?.referral_date * 1000))?.split('-');

      return (currentMonth === +month) && (currentYear == year.replace(/\"/gi, ''));
    });

    this.filteredReferrals = [...events];
    this.openReferrals = [...events?.filter(el => el?.status != 'Onboard Complete' && !el?.status?.match('Declined'))];
    this.approvedReferrals = [...events?.filter(el => el?.status == 'Onboard Complete')];
    this.declinedReferrals = [...events?.filter(el => el?.status?.match('Declined'))];

    let open_referral_date = this.openReferrals.map(el => { return { id: el?.id,  referral_date: el?.referral_date, status: el?.status }});
    let approve_referral_date = this.approvedReferrals.map(el => { return { id: el?.id, referral_date: el?.referral_date, status: el?.status }}); 
    let declined_referral_date = this.declinedReferrals.map(el => { return { id: el?.id, referral_date: el?.referral_date, status: el?.status }}); 

    // public lineChartLabels: string[] = ['Jan 1', 'Jan 4', 'Jan 8', 'Jan 12', 'Jan 16', 'Jan 20', 'Jan 24', 'Jan 28', 'Jan 31'];
    this.groupByDay(open_referral_date).forEach((el:any) => this.lineChartLabels.push(el?.date));
    this.groupByDay(approve_referral_date).forEach((el:any) => this.lineChartLabels.push(el?.date));
    this.groupByDay(declined_referral_date).forEach((el:any) => this.lineChartLabels.push(el?.date));

    this.lineChartLabels = [...new Set(this.lineChartLabels)].sort((a: any,b: any) => {
      let date_a: any = new Date(a);
      let date_b: any = new Date(b);

      return date_a - date_b;
    });

    if(this.lineChartLabels?.length < 2){
      this.lineChartLabels = Array(this.lineChartLabels?.length).fill(this.lineChartLabels[0]).map((el,i) => format(addDays(new Date(el), i), 'MMM dd'));
    } 

    this.groupByDay(open_referral_date).forEach((el: any, i) => {
      let index = this.lineChartLabels.findIndex(_el => _el === el?.date);
      this.lineChartData[0].data[index] = (el?.count);
      this.lineChartData[3].data[index] = this.lineChartData[3].data[index] + el?.count;
    });

    this.groupByDay(approve_referral_date).forEach((el: any, i) => {
      let index = this.lineChartLabels.findIndex(_el => _el === el?.date);
      this.lineChartData[1].data[index] = (el?.count);
      this.lineChartData[3].data[index] = this.lineChartData[3].data[index] + el?.count;
    });

    this.groupByDay(declined_referral_date).forEach((el: any, i) => {
      let index = this.lineChartLabels.findIndex(_el => _el === el?.date);
      this.lineChartData[2].data[index] = (el?.count);
      this.lineChartData[3].data[index] = this.lineChartData[3].data[index] + el?.count;
    });
  }

}
