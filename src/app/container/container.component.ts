import { Component, OnInit } from '@angular/core';
import { ContainerService } from './container.service';
import { Box } from './box';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  boxes: Box[];

  constructor( private containerService: ContainerService ) {
    this.boxes = [];
  }

  ngOnInit() {
    this.containerService
    .getBoxes()
    .subscribe(
      (data: Box[]) => this.boxes = data,
      (error: any) => console.log(error))
    ;
  }

  handleSave(counter) {
    const box: Box = {
      id: 0,
      quantity: counter
    };
    this.containerService
    .addBox(box)
    .subscribe((data: Box) => {
      if (data) {
        this.boxes = [...this.boxes, data];
      }
    });
  }

  handleRemove(id) {
    this.containerService
    .removeBox(id)
    .subscribe((data: Box) => {
      this.boxes = this.boxes.filter((box: Box) => {
        return box.id !== id;
      });
    });
  }
}
