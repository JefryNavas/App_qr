export class Registro{
    public format: string;
    public text: string;
    public type: string;
    public icon: string;
    public create: Date;

    constructor(format: string,text: string){
        this.format = format;
        this.text = text;
        this.create=new Date();
        this.determinarTipo();
    }

    private determinarTipo(){
        const inicioTexto=this.text.substring(0,4); //http://wwww
        console.log('Tipos: ',inicioTexto);
        switch (inicioTexto) {
            case 'http':
                this.type='http';
                this.icon='globe-outline';
                break;
            case 'geo':
                this.type='geo';
                this.icon='map-outline';
            break;
            case 'avac':
                this.type='avac';
                this.icon='school-outline';
                break;
            default:
                this.type='No identificado';
                this.icon='alert';
                break;
        }
    }
}
