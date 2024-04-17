import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MessageComponent } from './message.component';

const routes: Routes = [
  {
    path: '',
    component: MessageComponent
  }
];

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [MessageComponent],
  exports: [MessageComponent]
})
export class MessageComponentModule {}
