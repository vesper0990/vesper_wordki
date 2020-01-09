import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiszkaComponent } from './fiszka.component';

describe('FiszkaComponent', () => {
  let component: FiszkaComponent;
  let fixture: ComponentFixture<FiszkaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiszkaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiszkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
