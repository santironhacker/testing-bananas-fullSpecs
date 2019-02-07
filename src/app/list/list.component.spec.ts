import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { BananaPipe } from '../banana/banana.pipe';
import { Box } from '../container/box';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListComponent,
        BananaPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    component.boxes = [
      { id: 1, quantity: 10 },
      { id: 2, quantity: 15 }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show correct total', () => {
    expect(component.getTotal()).toBe(25);
  });

  it('should properly receive a list of boxes', () => {
    const newList: Box[] = [
      { id: 1, quantity: 5 },
      { id: 2, quantity: 5 },
      { id: 3, quantity: 5 }
    ];
    component.boxes = newList;
    expect(component.getTotal()).toBe(15);
  });

  it('should properly emit a remove event', () => {
    spyOn(component.remove, 'emit').and.callThrough();
    component.handleRemove(2);
    expect(component.remove.emit).toHaveBeenCalledWith(2);
  });

  it('should reset counter when the Save Box button is clicked', () => {
    spyOn(component.remove, 'emit').and.callThrough();
    el.query(By.css('#brm_2')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.remove.emit).toHaveBeenCalledWith(2);
  });

});
