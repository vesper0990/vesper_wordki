import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiszkaSideComponent } from './fiszka-side.component';

describe('FiszkaSideComponent', () => {
  let component: FiszkaSideComponent;
  let fixture: ComponentFixture<FiszkaSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiszkaSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiszkaSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
