/* eslint-disable @typescript-eslint/type-annotation-spacing */
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
declare let mapboxgl: any;


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit,AfterViewInit {

  lat:number;
  log:number;
  lonlat:number[];


  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    let geo:any = this.route.snapshot.paramMap.get('geo');
    geo = geo.substr(4);
    geo = geo.split(',');
    this.log= +geo[1];
    this.lat = +geo[0];
    console.log(this.lat,this.log);

  }

  ngAfterViewInit() {
    this.lonlat =[this.log,this.lat];
    mapboxgl.accessToken = 'pk.eyJ1IjoiamVmcnkyMDAwIiwiYSI6ImNreWFtbTF5czA2dzAydnFoZm9ua3p6bzcifQ.0xB7DVGzX6f24nUbddxvXw';
    const map = new mapboxgl.Map({
      style: 'mapbox://styles/mapbox/light-v10',
      center: [this.log, this.lat],
      zoom: 15.5,
      pitch: 45,
      bearing: -17.6,
      container: 'map',
      antialias: true
    });
    map.on('load', () =>{
      map.resize();
      new mapboxgl.Marker()
          .setLngLat(this.lonlat)
          .addTo(map);
      // Insert the layer beneath any symbol layer.
      const layers = map.getStyle().layers;
      let labelLayerId;
      // eslint-disable-next-line @typescript-eslint/prefer-for-of
      for (let i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }

      map.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },

        labelLayerId
      );
    });

  }

}
