import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Box } from '../container/box';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input()
  boxes: Box[];

  @Output()
  remove: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.boxes = [];
  }

  ngOnInit() {
  }

  getTotal() {
    let sum = 0;
    for (let i = 0; i < this.boxes.length; i++) {
      sum += this.boxes[i].quantity;
    }
    return sum;
  }

  handleRemove(id) {
    this.remove.emit(id);
  }
}
