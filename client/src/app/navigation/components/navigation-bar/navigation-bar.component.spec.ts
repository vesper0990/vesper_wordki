import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationBarComponent } from './navigation-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('NavigationBarComponent', () => {
  let component: NavigationBarComponent;
  let fixture: ComponentFixture<NavigationBarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationBarComponent],
      imports: [
        RouterTestingModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(NavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should logout', () => {
    const spy = spyOn(router, 'navigate');
    component.logout();
    expect(spy.calls.first().args[0]).toContain('/user/logout');
  });

  it('should toggleMenu', () => {
    component.isOpen = false;
    component.toggleMenu();
    expect(component.isOpen).toBeTrue();
  });

  it('should hideMenu', () => {
    component.isOpen = true;
    component.hideMenu();
    expect(component.isOpen).toBeFalse();
  });
});
