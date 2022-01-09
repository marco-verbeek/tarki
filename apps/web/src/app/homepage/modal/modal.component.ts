import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() addedItem = new EventEmitter<any>();

  constructor() { }

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
