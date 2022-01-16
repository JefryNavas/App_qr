import { Component, OnInit } from '@angular/core';
import { DatalocalService } from '../services/datalocal.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  latitud: number;
  longitud: number;

  constructor(private datalocal: DatalocalService,private geolocation: Geolocation,private storage: Storage) { }

  async ngOnInit() {
    this.storage.create();
  }

  ionViewWillEnter(){
    this.obtenerGeo();
  }

  obtenerGeo(){
    this.geolocation.getCurrentPosition().then((resp)=>{
      this.latitud = resp.coords.latitude;
      this.longitud = resp.coords.longitude;
      const save = `geo:${this.latitud},${this.longitud}`;
      this.datalocal.saveRegistro('geo:',save);
    });
  }



}
