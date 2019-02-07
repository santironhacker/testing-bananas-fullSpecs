import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  counter: number;
  max: number;
  min: number;

  @Output()
  save: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.counter = 0;
    this.max = 20;
    this.min = 0;
  }

  ngOnInit() {
  }

  increase() {
    this.counter++;
    if (this.counter > this.max) {
      this.counter = this.max;
    }
  }
  decrease() {
    this.counter--;
    if (this.counter < this.min) {
      this.counter = this.min;
    }
  }

  saveBox() {
    this.save.emit(this.counter);
    this.counter = 0;
  }
}
