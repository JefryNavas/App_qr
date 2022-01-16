import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { DatalocalService } from '../services/datalocal.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  constructor(private barcodeScanner: BarcodeScanner,private datalocal: DatalocalService,private storage: Storage) {}

  ionViewWillEnter(){
    this.scan();
    //console.log("ion ViewWillEnter");
  }

  async ngOnInit() {
    this.storage.create();
  }

scan(){
  this.barcodeScanner.scan().then(barcodeData => {
    console.log('Barcode data', barcodeData.text);
    if (!barcodeData.cancelled) {
      this.datalocal.saveRegistro(barcodeData.format,barcodeData.text);
    }
   }).catch(err => {
       console.log('Error', err);
       this.datalocal.saveRegistro('http','https://www.ups.edu.ec/');
       console.log('Dato no registrado');
   });
}

}
