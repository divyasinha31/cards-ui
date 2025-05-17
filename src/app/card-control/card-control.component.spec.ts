import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardControlComponent } from './card-control.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CardBrand, MerchantType, TransactionType } from '../constants';

describe('CardControlComponent', () => {
  let component: CardControlComponent;
  let fixture: ComponentFixture<CardControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardControlComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CardControlComponent);
    component = fixture.componentInstance;

    component.card = {
      cardNo: 1234567812345678,
      cvv: 311,
      cardName: 'John Wick',
      validity: { month: 8, year: 2030 },
      brand: CardBrand.Visa,
      freeze: false,
      transactions: [
        {
          paidTo: 'Amazon',
          transactionType: TransactionType.Debit,
          amount: 120,
          transactionDate: new Date('2024-11-14'),
          recipientType: MerchantType.Store
        },
        {
          paidTo: 'Cleartrip',
          transactionType: TransactionType.Credit,
          amount: 700,
          transactionDate: new Date('2024-08-11'),
          recipientType: MerchantType.Travel
        }
      ]
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render all control items with icons and labels', () => {
    const items = fixture.debugElement.queryAll(By.css('.control-item'));
    expect(items.length).toBe(5);
  });

  it('should call clickHandler with correct index on icon click', () => {
    spyOn(component, 'clickHandler');
    const icon = fixture.debugElement.queryAll(By.css('.control-icon'))[1];
    icon.triggerEventHandler('click', null);
    expect(component.clickHandler).toHaveBeenCalledWith(1);
  });
});
