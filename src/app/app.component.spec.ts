import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { iCard } from './model';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';

@Component({ selector: 'app-main-menu', template: '' })
class MockMainMenuComponent {}

@Component({ selector: 'app-debit-cards', template: '' })
class MockDebitCardsComponent {
  @Input() cards: iCard[] = [];
}

const matDialogMock = {
  open: () => ({ afterClosed: () => of(true) }) // adjust as needed
};

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MockMainMenuComponent,
        MockDebitCardsComponent
      ],
      providers: [
        { provide: MatDialog, useValue: matDialogMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the balance amount', () => {
    component.balance = 5000;
    fixture.detectChanges();

    const balanceEl = fixture.debugElement.query(By.css('.balance-amount')).nativeElement;
    expect(balanceEl.textContent).toContain('5000');
  });

  it('should call addNewCard when New card button is clicked', () => {
    spyOn(component, 'addNewCard');

    const button = fixture.debugElement.query(By.css('.new-card-btn'));
    button.triggerEventHandler('click', null);
    expect(component.addNewCard).toHaveBeenCalled();
  });

  it('should render all content items', () => {
    component.contentItems = ['Item 1', 'Item 2', 'Item 3'];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.content-item'));
    expect(buttons.length).toBe(3);
    expect(buttons[0].nativeElement.textContent).toContain('Item 1');
  });

  it('should apply active class to selected content item', () => {
    component.contentItems = ['Item A', 'Item B'];
    component.selectedContentItem = 1;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('.content-item'));
    expect(buttons[1].nativeElement.classList).toContain('content-item-active');
    expect(buttons[0].nativeElement.classList).toContain('content-item-inactive');
  });
});
