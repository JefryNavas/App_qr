import { Injectable } from '@angular/core';
import { Registro } from '../modelos/registro';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Injectable({
  providedIn: 'root'
})
export class DatalocalService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  datos_guardados: Registro[]=[];
  constructor(private storage: Storage,private navCtrl: NavController,private inAppB: InAppBrowser) {
    this.cargarStorage();
  }

  async cargarStorage(){
    this.datos_guardados = await this.storage.get('registros')||[];
  }

  saveRegistro(format: string,text: string){
    const newRegistro = new Registro(format,text);// generamos un nuevo registro
    this.datos_guardados.unshift(newRegistro); // añadimos al final del arreglo el nuevo registro
    this.storage.set('registros',this.datos_guardados);
    this.openRegistro(newRegistro);
  }

  openRegistro(registro: Registro){
    this.navCtrl.navigateForward('/tabs/tab2');
    switch (registro.type) {
      case 'http':
          // abrir un navegador
              this.inAppB.create(registro.text,'__system');
                break;
            case 'geo:':
              this.navCtrl.navigateForward(`/tabs/tab2/mapa/${registro.text}`);

            break;
            case 'avac':

                break;
            default:

                break;
    }
  }
}
