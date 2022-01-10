import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { ItemSearchResult } from 'tarki-definitions';
import { HomepageService } from './homepage.service';
import { ModalComponent } from './modal/modal.component';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  @ViewChild(MatTable) table: MatTable<ItemSearchResult>;
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

  tableItems: ItemSearchResult[] = [];

  constructor(
    private homepageService: HomepageService,
    public dialog: MatDialog
  ) { }

  async searchItems(): Promise<void> {
    const modalItems: ItemSearchResult[][] = [];
    const itemsToSearch: string[] = this.newItems.split('\n');

    itemsToSearch.forEach(async (item: string) => {
      const result: ItemSearchResult[] = await this.homepageService.searchItem(item);
      console.log(result[0]);

      if (result.length === 1) {
        this.tableItems.push(result[0]);
        this.table.renderRows();
      }

      else
        modalItems.push(result);
    });

    if (modalItems.length > 0) {
      this.dialog.open(ModalComponent, {
        data: modalItems,
        panelClass: "select-items-dialog-container"
      });
    }

    this.newItems = "";

  }
}
