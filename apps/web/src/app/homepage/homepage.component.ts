import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HomepageService } from './homepage.service';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  @ViewChild(ModalComponent) modal: ModalComponent | undefined;

  newItems: string = "";

  headers: string[] = [
    'icon',
    'name',
    'price',
    'quest',
    'hideout',
    'barter_crafting'
  ]

  items: { 'icon': string, 'name': string, 'vendor_price': string, 'market_price': string, 'quest': string, 'hideout': string, 'barter_crafting': string }[] = [{
    'icon': '../../assets/img/salewa.jpg',
    'name': 'Salewa first aid kit',
    'vendor_price': '7,427 @ Therapist',
    'market_price': '20,762 @ FleaMarket',
    'quest': 'Therapist - Shortage 3x',
    'hideout': 'no',
    'barter_crafting': 'no'
  }];

  constructor(
    private homepageService: HomepageService,
    public dialog: MatDialog
  ) { }

  searchItems(): void {
    this.dialog.open(ModalComponent, {
      panelClass: "select-items-dialog-container"
    });
  }
}
