import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemSearchResult } from 'tarki-definitions';
import { HomepageService } from './homepage.service';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
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

  items: ItemSearchResult[] = [];

  constructor(
    private homepageService: HomepageService,
    public dialog: MatDialog
  ) { }

  async ngOnInit(): Promise<void> {
    this.items = await this.homepageService.getItemsSearched('salewa');
    console.log('items: ', this.items);

  }

  searchItems(): void {
    this.dialog.open(ModalComponent, {
      panelClass: "select-items-dialog-container"
    });
  }
}
