import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
//import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  private clienteId: any = null;
  public cliente: any = {};
  private loading: any;
  private clienteSubscription: Subscription | undefined;

  constructor(
    private clienteService: DataService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
   // private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    this.clienteId = this.activatedRoute.snapshot.params['id'];

    if (this.clienteId) this.loadCliente();
  }

  ngOnInit() { }

   ngOnDestroy() {
     if (this.clienteSubscription) this.clienteSubscription.unsubscribe();
   }

  loadCliente() {
    this.clienteSubscription = this.clienteService.getClienteById(this.clienteId).subscribe(data => {
      this.cliente = data;
    });
  }

  async createCliente() {
    await this.presentLoading();

 //   this.product.userId = this.authService.getAuth().currentUser.uid;

    if (this.clienteId) {
      try {
        await this.clienteService.updateCliente(this.clienteId, this.cliente);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    } else {
      this.cliente.createdAt = new Date().getTime();

      try {
        await this.clienteService.createCliente(this.cliente);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (error) {
        this.presentToast('Erro ao tentar salvar');
        this.loading.dismiss();
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}