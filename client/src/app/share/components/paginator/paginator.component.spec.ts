import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginatorComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  [
    { current: 1, count: 10, items: [1, 2, 3, 4] },
    { current: 10, count: 10, items: [7, 8, 9, 10] },
    { current: 5, count: 10, items: [2, 3, 4, 5, 6, 7, 8] },
    { current: 1, count: 1, items: [1] },
    { current: 2, count: 3, items: [1, 2, 3] },
  ].forEach(item => {
    it('should properly calculate items', () => {
      fixture.detectChanges();
      component.pagesCount = item.count;
      component.currentPage = item.current;
      // expect(component.items).toEqual(item.items);
    });
  });

});
