import { Component, OnDestroy, OnInit, ViewChild, ElementRef, NgZone, HostListener } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { Router } from '@angular/router';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import MarkerClusterer from 'marker-clusterer-plus';
import { MatSnackBar } from '@angular/material/snack-bar';
declare const google: any;


@Component({
  selector: 'app-employee-main',
  animations: [mainAnimations],
  templateUrl: './employee-main.component.html',
  styleUrls: ['./employee-main.component.scss']
})
export class EmployeeMainComponent implements OnInit {
  @ViewChild('mapContainer', {static: false}) gmap: ElementRef;

  public loading: boolean = true;
  public employeeList: any[] = [];
  public liveFeeds: any[] = [];
  public hideBanner: boolean = true;
  
  private req: Subscription;
  private routeReq: Subscription;
  private employeesData$: any;
  
  public map: any;
  public locations = [];
  public geocoder = new google.maps.Geocoder();
  public markers = [];
  public markerClusterer: any;

  constructor(private employeeListStore: Store<EmployeeListState>,
    private router: Router,
    private ngZone: NgZone,
    public snackBar: MatSnackBar) {
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));

    // clear map
    this.routeReq = this.router.events.subscribe((event: any) => {
      this.clearMap();
    });
  }

  ngOnInit(): void {
    this.geocoder = new google.maps.Geocoder();
    this.getEmployeeData();
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
    if(this.routeReq) this.routeReq.unsubscribe();
    this.clearMap();
  }

  clearMap(){
    if(this.markerClusterer){
      this.markerClusterer['markers_'] = [];
      this.markerClusterer.removeMarkers(this.markers);
      this.markerClusterer.clearMarkers();
      this.markerClusterer = null;
      this.markers.forEach(function(marker) {
        marker.setMap(null);
      });
      console.log("clear map")
    }
    this.map = undefined;
    this.markers = [];
    this.hideBanner = true;
    this.geocoder = undefined;   
    this.locations = [];
    this.mapEvent = undefined;
  }

  generateMapCluster(){
    // generate map options
    const mapOptions = {
      center: { lat: -25.2744, lng: 133.7751 }, // Center of Australia
      zoom: 5,
      mapTypeId: google?.maps?.MapTypeId?.ROADMAP
    };
    
    // clear marker Cluster
    if(this.markerClusterer) {
      this.markerClusterer.clearMarkers();
      this.markerClusterer = null;
      this.markers.forEach(function(marker) {
        marker.setMap(null);
      });
      this.markers = [];
    }

    else {
      this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

      this.markerClusterer = new MarkerClusterer(this.map, [], {
        minimumClusterSize: 2,
        imagePath: 'https://res.cloudinary.com/branding-tool/image/upload/v1680519179/m',
      });
    }
  }

  initializeMapData(){
    this.generateMapCluster();
    let snackbar: boolean = false;
      
    for (let i = 0; i < this.locations.length; i++) {
      // pin addressess to map
      this.geocoder.geocode({ address: this.locations[i].address }, (results, status) => {
        if (status === 'OK') {
          // generate marker
          const marker = new google.maps.Marker({
            position: results[0].geometry.location,
            map: this.map,
            title: this.locations[i]?.title
          });

          this.markers.push(marker);
          this.windowMapEvent(marker, i, this.map);

          let existingMarker = this.markerClusterer?.markers_?.find(el => el?.title === marker?.title)

          if(!existingMarker){
            // generate marker clusterer
            this.markerClusterer.addMarker(marker);
          }   

          else {
            marker.setMap(null);
          }
          console.log('Geocode was successful: ' + status);
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }

  public mapEvent: any;

  windowMapEvent(marker, i, map){
    const infowindow = new google.maps.InfoWindow({
      content: `
      <div style="max-width: 195px; padding: 2px; text-align:center">
        <div style="margin-bottom: 4px">
          <img src="${this.locations[i]?.picture}" style="border-radius: 50%; width: 40px; height: 40px; object-fit:cover; object-position: center;">
        </div>
        <h5 style="margin-bottom: 3px">${this.locations[i]?.name}</h5>
        <p style="margin-bottom: 3px">${this.locations[i]?.position} | +${this.locations[i]?.phone_number}</p>
        ${this.locations[i]?.email}<hr>
        ${this.locations[i]?.address}
      </div>`
    });

    // click event listeners
    marker.addListener('click', () => {
      infowindow.open(map, marker);
    });

    // zoom event listener
    /*this.mapEvent = google.maps.event.addListener(map, 'zoom_changed', function() {
      let zoomLevel = map.getZoom();

      if (zoomLevel > 10 && infowindow.getMap() == null) {
        // open window
        infowindow.open(map, marker)

      } else {
        // open window
        infowindow.close();
      }
    });*/
  }

  // employee list data
  getEmployeeData(){
    this.employeeListStore.dispatch({ type:  EmployeeListActionTypes.GET_EMPLOYEE_LIVE_FEED })

    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      if(results){
        setTimeout(() => {
          //this.loading = false;
          // from ngrx store
          this.liveFeeds = results?.employees.employeeLiveFeed;
        }, 2000);
      }
    });

    // get employees
    this.req.add(
      this.employeesData$.subscribe((results: any) => {
        this.loading = results?.employees?.pending;
        console.log(results?.employees)
        if(results?.employees?.employeeList?.length > 0){
          results?.employees?.employeeList.forEach(el => {
            if(el?.status?.toLowerCase() === 'active'){
              let address = `${el?.address_a}, ${el?.suburb} ${el?.state} ${el?.post_code}`;
              this.locations.push({
                address: address, 
                name: el?.name, 
                position: el?.employee_position_display_name, 
                title: `${el?.name} - ${el?.employee_position_display_name}, \n${address}`,
                phone_number: `${(el?.mobile_phone_no || el?.work_phone_no || el?.home_phone_no) || ' '}`,
                email: `${el?.email_address}`,
                picture: el?.profile_pic_url || '/assets/images/placeholder/default-avatar.png'
              });
            }
          });
        }
      })
    )
  }

  public initializeMapZone: any;

  initMap(){
    if(!this.initializeMapZone){
      if(this.markerClusterer){
        this.markerClusterer['markers_'] = [];
        this.markerClusterer.removeMarkers(this.markers);
        this.markerClusterer.clearMarkers();
        this.markerClusterer = null;
        this.markers.forEach(function(marker) {
          marker.setMap(null);
        });
        console.log("clear map")
      }
      this.map = undefined;
      this.markers = [];

      this.initializeMapZone = true;
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => this.initializeMapData(), 1000)
      });
    }
  }
}
