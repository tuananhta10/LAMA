import { Injectable } from '@angular/core';
import { MarkerClusterer } from 'marker-clusterer-plus';

@Injectable({
  providedIn: 'root'
})
export class MarkerClustererService {
  markerClusterer: MarkerClusterer;

  constructor() { }
}