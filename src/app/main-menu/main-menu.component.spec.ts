import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainMenuComponent } from './main-menu.component';
import { By } from '@angular/platform-browser';
import { iMenuItem } from '../model';

describe('MainMenuComponent', () => {
  let component: MainMenuComponent;
  let fixture: ComponentFixture<MainMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainMenuComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(MainMenuComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all menu items', () => {
    component.menuItems = [
      { icon: 'assets/dashboard.svg', text: 'Dashboard' },
      { icon: 'assets/settings.svg', text: 'Settings' }
    ];
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.menu-item'));
    expect(items.length).toBe(2);
    expect(items[0].nativeElement.textContent).toContain('Dashboard');
  });

  it('should apply active class to selected menu item', () => {
    component.selectedMenuItem = 0;
    fixture.detectChanges();

    const menuTexts = fixture.debugElement.queryAll(By.css('.menu-item-text'));
    expect(menuTexts[0].nativeElement.classList).toContain('menu-active-text');
    expect(menuTexts[1].nativeElement.classList).toContain('menu-inactive-text');
  });
});
