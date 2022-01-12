import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemSearchResult } from 'tarki-definitions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  selectedItems: ItemSearchResult[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { searchQuery: string; items: ItemSearchResult[]; }[],
    private dialogRef: MatDialogRef<ModalComponent>
  ) { }

  selectItem(item: ItemSearchResult): void {
    const itemIndex = this.selectedItems.indexOf(item);

    if (itemIndex > -1) {
      this.selectedItems.splice(itemIndex, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  addSelectedItems(): void {
    this.dialogRef.close({ data: this.selectedItems });
  }
}
