import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ContainerComponent } from './container.component';
import { CounterComponent } from '../counter/counter.component';
import { ListComponent } from '../list/list.component';
import { BananaPipe } from '../banana/banana.pipe';
import { ContainerService } from './container.service';
import { Box } from './box';

const boxesList = [
  { id: 1, quantity: 10 },
  { id: 2, quantity: 15 }
];

const newBox = { id: 3, quantity: 5 };

class MockContainerService {
  getBoxes(): Observable<Box[]> {
    return Observable.of(boxesList);
  }

  addBox(box: Box): Observable<Box> {
    return Observable.of(newBox);
  }

  removeBox(id: number): Observable<any> {
    return Observable.of({});
  }
}

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let el: DebugElement;
  let service: ContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerComponent,
        CounterComponent,
        ListComponent,
        BananaPipe
      ],
      providers: [
        { provide: ContainerService, useClass: MockContainerService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
    service = el.injector.get(ContainerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get banana boxes on init', () => {
    spyOn(service, 'getBoxes').and.callThrough();
    component.ngOnInit();
    expect(service.getBoxes).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.boxes).toBe(boxesList);
  });

  it('should add a new banana box on handleSave', () => {
    spyOn(service, 'addBox').and.callThrough();
    component.handleSave(5);
    expect(service.addBox).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.boxes.length).toBe(3);
  });

  it('should remove a banana box on handleRemove', () => {
    spyOn(service, 'removeBox').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    component.handleRemove(2);
    expect(service.removeBox).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.boxes.length).toBe(1);
  });

  describe('ContainerComponent Integration Tests', () => {
    it('should add a new banana box on CounterComponent save event', () => {
      spyOn(service, 'addBox').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();
      el.query(By.css('.btn-increase')).triggerEventHandler('click', null);
      fixture.detectChanges();
      el.query(By.css('.save-counter')).triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(service.addBox).toHaveBeenCalled();
      expect(component.boxes.length).toBe(3);
    });

    it('should remove a banana box on ListComponent remove event', () => {
      spyOn(service, 'removeBox').and.callThrough();
      component.ngOnInit();
      fixture.detectChanges();
      el.query(By.css('#brm_2')).triggerEventHandler('click', null);
      fixture.detectChanges();
      expect(service.removeBox).toHaveBeenCalled();
      expect(component.boxes.length).toBe(1);
    });
  });

});
