import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiszkaComponent } from './fiszka.component';
import { createProvider } from 'src/app/test/helpers.spec';
import { FiszkaService } from './services/fiszka/fiszka.service';
import { MockComponent } from 'ng-mocks';
import { Button } from 'primeng/button';

describe('FiszkaComponent', () => {
  let component: FiszkaComponent;
  let fixture: ComponentFixture<FiszkaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        FiszkaComponent,
        MockComponent(Button)
      ],
      providers: [
        createProvider(FiszkaService)
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiszkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
