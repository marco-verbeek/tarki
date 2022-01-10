import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemSearchResult } from 'tarki-definitions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() addedItem = new EventEmitter<any>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: ItemSearchResult) { }

  ngOnInit(): void {
  }

  loadItems(item: any): void {
    // TODO
  }

  selectItem(): void {
    // TODO  
  }

  addSelectedItem(): void {
    // TODO
  }

}
