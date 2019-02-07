import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ContainerService } from './container.service';
import { Box } from './box';

describe('ContainerService', () => {
  let injector;
  let service: ContainerService;
  let httpMock: HttpTestingController;
  let dummyBoxes: Box[];
  let dummyNewBox: Box;
  let emptyObject = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ContainerService]
    });

    injector = getTestBed();
    service = injector.get(ContainerService);
    httpMock = injector.get(HttpTestingController);
    dummyBoxes = [
      { id: 1, quantity: 10 },
      { id: 2, quantity: 15 }
    ];
    dummyNewBox = { id: 0, quantity: 25 };
    emptyObject = {};
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getBoxes', () => {
    it('should return an Observable<Box[]>', () => {
      service.getBoxes().subscribe(boxes => {
        expect(boxes.length).toBe(2);
        expect(boxes).toEqual(dummyBoxes);
      });

      const req = httpMock.expectOne(service.BOX_API);
      expect(req.request.method).toBe('GET');
      req.flush(dummyBoxes);
    });
  });

  describe('addBox', () => {
    it('should return an Observable<Box>', () => {
      service.addBox(dummyNewBox)
      .subscribe((data: Box) => {
        expect(data).toEqual(dummyNewBox);
      });

      const req = httpMock.expectOne(service.BOX_API);
      expect(req.request.method).toBe('POST');
      req.flush(dummyNewBox);
    });
  });

  describe('removeBox', () => {
    it('should return an Observable<any>', () => {
      service.removeBox(2)
      .subscribe((data: any) => {
        expect(data).toBe(emptyObject);
      });

      const req = httpMock.expectOne(`${service.BOX_API}/2`);
      expect(req.request.method).toBe('DELETE');
      req.flush(emptyObject);
    });
  });

});
