import { Component, OnDestroy, OnInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
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
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import MarkerClusterer from 'marker-clusterer-plus';
import { MatSnackBar } from '@angular/material/snack-bar';
declare const google: any;

@Component({
  selector: 'app-client-main',
  animations: [mainAnimations],
  templateUrl: './client-main.component.html',
  styleUrls: ['./client-main.component.scss']
})
export class ClientMainComponent implements OnInit, OnDestroy {
  @ViewChild('mapContainerParticipant', {static: false}) gmap: ElementRef;

  public loading: boolean = true;
  public liveFeeds: any[] = [];

  private req: Subscription;
  private routeReq: Subscription;
  private clientsData$: any;
  private liveFeedData$: any;
  public hideBanner: boolean = true;
  
  public map: any;
  public locations = [];
  public geocoder = new google.maps.Geocoder();
  public markers = [];
  public markerClusterer: any;

  constructor(private clientListStore: Store<ClientListState>,
    private router: Router,
    private ngZone: NgZone,
    public snackBar: MatSnackBar) {
    this.liveFeedData$ = this.clientListStore.pipe(select(state => state));
    this.clientsData$ = this.clientListStore.pipe(select(state => state));

    // clear map
    this.routeReq = this.router.events.subscribe((event: any) => {
      this.clearMap();
    });
  }

  ngOnInit(): void {
    this.geocoder = new google.maps.Geocoder();
    this.getClientData();
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

    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

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

    console.log(this.markers, this.markerClusterer)
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

      if (zoomLevel >= 8 && infowindow.getMap() == null) {
        // open window
        infowindow.open(map, marker)

      } else {
        // open window
        infowindow.close();
      }
    });*/
  }

  // client list data
  getClientData(){
    // Loop to all action types
    this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIVE_FEED });
    // Subscribe to storage
    this.req = this.liveFeedData$.subscribe((results: any) => {
      if(results){
        setTimeout(() => {
          //this.loading = false;
          // from ngrx store
          this.liveFeeds = results?.clients.clientLiveFeed;
        }, 2000);
      }
    });

    // get clients
    this.req.add(
      this.clientsData$.subscribe((results: any) => {
        console.log(results)
        this.loading = results?.clients?.pending;
        if(results?.clients?.clientList?.length > 0){
          results?.clients?.clientList.forEach(el => {
            if(el?.status?.toLowerCase() === 'active'){
              let address = `${el?.address_a}, ${el?.suburb} ${el?.state} ${el?.post_code}`
              this.locations.push({
                address: address, 
                name: el?.name, 
                disability_type: el?.disability_type, 
                title: `${el?.name} - ${el?.disability_type}, \n${address}`,   
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
