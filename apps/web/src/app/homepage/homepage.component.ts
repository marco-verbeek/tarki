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
    let modalItems: { searchQuery: string; items: ItemSearchResult[]; }[] = [];
    const itemsToSearch: string[] = this.newItems.split('\n').filter(Boolean);

    for (const item of itemsToSearch) {
      const result: ItemSearchResult[] = await this.homepageService.searchItem(item);

      if (result.length === 1) {
        this.tableItems.push(result[0]);
        this.table.renderRows();
      } else {
        modalItems.push({
          'searchQuery': item,
          'items': result.filter((item: ItemSearchResult) => item.imageLink !== null)
        });
      }
    }

    if (modalItems.length > 0) {
      const openedDialog = this.dialog.open(ModalComponent, {
        data: modalItems,
        panelClass: "select-items-dialog-container",
        width: "50%",
        minWidth: "600px"
      });

      openedDialog.afterClosed().subscribe(res => {
        this.tableItems = this.tableItems.concat(res.data);
        this.table.renderRows();
      });

    }
    this.newItems = "";
  }
}
