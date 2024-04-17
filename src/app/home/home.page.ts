import { Component, OnInit } from '@angular/core';
import { LoadingController, RefresherCustomEvent, ToastController } from '@ionic/angular';

import { DataService, Message } from '../services/data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  clientes: any[] = [];
  novoCliente: any = {};
  clienteSubscription: Subscription;

  constructor(
    private clienteService: DataService,
   // private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {
    this.clienteSubscription = this.clienteService.getClientes().subscribe(data => {
      this.clientes = data;
    });
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.clienteSubscription.unsubscribe();
  }
  getMessages(): Message[] {
    return this.clienteService.getMessages();
  }

  loadClientes() {
    this.clienteService.getClientes().subscribe((data: any) => {
      this.clientes = data;
      console.log(data);
    });
  }


  async deletarCliente(clienteId: string) {
    try {
      await this.clienteService.deleteCliente(clienteId);
    } catch (error) {
      this.presentToast('Erro ao tentar deletar');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }
}