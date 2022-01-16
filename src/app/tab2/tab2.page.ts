import { Component } from '@angular/core';
import { DatalocalService } from '../services/datalocal.service';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataLocal: DatalocalService,private storage: Storage) {
    this.dataLocal.cargarStorage();
  }

  abrirRegistro(dato){
    console.log('Registro: ',dato);
    this.dataLocal.openRegistro(dato);
  }
}
