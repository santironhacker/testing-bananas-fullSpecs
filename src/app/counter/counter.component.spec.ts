import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';
import { BananaPipe } from '../banana/banana.pipe';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        CounterComponent,
        BananaPipe
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should increase correctly', () => {
    component.increase();
    expect(component.counter).toBe(1);
  });

  it('should decrease correctly', () => {
    component.increase();
    expect(component.counter).toBe(1);
    component.decrease();
    expect(component.counter).toBe(0);
  });

  it('should not decrease bellow the minimum value', () => {
    component.increase();
    expect(component.counter).toBe(1);
    component.decrease();
    expect(component.counter).toBe(0);
    component.decrease();
    expect(component.counter).toBe(0);
  });

  it('should not increase over the maximum value', () => {
    for (let i = 0; i < 30; i++) {
      component.increase();
    }
    expect(component.counter).toBe(20);
  });

  it('should properly emit a save event', () => {
    spyOn(component.save, 'emit').and.callThrough();
    component.increase();
    component.saveBox();
    expect(component.save.emit).toHaveBeenCalledWith(1);
  });

  it('should increase when the + button is clicked', () => {
    el.query(By.css('.btn-increase')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.counter).toBe(1);
    expect(el.query(By.css('.banana-counter')).nativeElement.textContent).toContain('1 banana');
  });

  it('should decrease when the - button is clicked', () => {
    component.counter = 1;
    el.query(By.css('.btn-decrease')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.counter).toBe(0);
    expect(el.query(By.css('.banana-counter')).nativeElement.textContent).toContain('0 bananas');
  });

  it('should reset counter when the Save Box button is clicked', () => {
    component.counter = 1;
    el.query(By.css('.save-counter')).triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.counter).toBe(0);
    expect(el.query(By.css('.banana-counter')).nativeElement.textContent).toContain('0 bananas');
  });

});
