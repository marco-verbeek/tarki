import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage.component';

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  }
]

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ]
})
export class HomepageModule { }
