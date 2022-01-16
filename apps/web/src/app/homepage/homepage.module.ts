import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { ModalComponent } from './modal/modal.component';


const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }
]

@NgModule({
  declarations: [
    HomepageComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatGridListModule,
    RouterModule.forChild(routes)
  ]
})
export class HomepageModule { }
