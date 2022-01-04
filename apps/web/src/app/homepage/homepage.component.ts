import { Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  headers: string[] = [
    'icon',
    'name',
    'price',
    'quest',
    'hideout',
    'barter_crafting'
  ]

  items: { 'icon': string, 'name': string, 'price': string, 'quest': string, 'hideout': string, 'barter_crafting': string }[] = [{
    'icon': '../../assets/img/salewa.jpg',
    'name': 'Salewa first aid kit',
    'price': '7,427 @ Therapist\n20,762 @ FleaMarket',
    'quest': 'Therapist - Shortage 3x',
    'hideout': 'no',
    'barter_crafting': 'no'
  }];

  constructor() { }
}
