import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { BananaPipe } from './banana.pipe';


describe('BananaPipe', () => {

  describe('Shallow BananaPipe Tests', () => {

    @Component({
      template: `
        Banana {{ count | banana }}
      `
    })
    class TestComponent {
      count = 15;
    }

    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let el: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          BananaPipe,
          TestComponent
        ]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      el = fixture.nativeElement;
    });

    it('should add banana suffix to any number', () => {
      fixture.detectChanges();
      expect(el.textContent).toContain('Banana 15 bananas');
      component.count = 1;
      fixture.detectChanges();
      expect(el.textContent).toContain('Banana 1 banana');
    });
  });

  describe('Isolated BananaPipe Tests', () => {
    const banana = new BananaPipe();

    it('create an instance', () => {
      expect(banana).toBeTruthy();
    });

    it('should add banana suffix to any number', () => {
      expect(banana.transform(15)).toBe('15 bananas');
      expect(banana.transform(1)).toBe('1 banana');
      expect(banana.transform(-2)).toBe('-2 bananas');
      expect(banana.transform(-1)).toBe('-1 banana');
    });
  });
});
