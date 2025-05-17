import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardTransactionComponent } from './card-transaction.component';
import { Component, Input } from '@angular/core';
import { iCard } from '../model';
import { By } from '@angular/platform-browser';
import { CardBrand, MerchantType, TransactionType } from '../constants';

@Component({
  selector: 'app-transaction-item',
  template: ''
})
class MockTransactionItemComponent {
  @Input() transactionItem!: any;
  @Input() isLastItem: boolean = false;
}

describe('CardTransactionComponent', () => {
  let component: CardTransactionComponent;
  let fixture: ComponentFixture<CardTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardTransactionComponent, MockTransactionItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardTransactionComponent);
    component = fixture.componentInstance;

    component.cards = [
      {
        cardName: 'Card 1',
        cardNo: 1111222233334444,
        validity: { month: 5, year: 2026 },
        cvv: 123,
        freeze: false,
        brand: CardBrand.Visa,
        transactions: [
          { paidTo: 'A', transactionDate: new Date('2020-11-06'), transactionType: TransactionType.Credit, amount: 100, recipientType: MerchantType.Store },
          { paidTo: 'B', transactionDate: new Date('2018-10-31'), transactionType: TransactionType.Debit, amount: 1115, recipientType: MerchantType.Entertainment }
        ]
      },
      {
        cardName: 'Card 2',
        cardNo: 5555666677778888,
        validity: { month: 10, year: 2027 },
        cvv: 456,
        freeze: false,
        brand: CardBrand.Mastercard,
        transactions: [
          { paidTo: 'A', transactionDate: new Date('2024-11-14'), transactionType: TransactionType.Credit, amount: 10, recipientType: MerchantType.Entertainment },
          { paidTo: 'B', transactionDate: new Date('2023-11-14'), transactionType: TransactionType.Debit, amount: 20, recipientType: MerchantType.Store },
          { paidTo: 'C', transactionDate: new Date('2022-11-14'), transactionType: TransactionType.Credit, amount: 30, recipientType: MerchantType.Travel },
          { paidTo: 'D', transactionDate: new Date('2021-11-14'), transactionType: TransactionType.Debit, amount: 40, recipientType: MerchantType.Entertainment },
          { paidTo: 'E', transactionDate: new Date('2020-11-14'), transactionType: TransactionType.Credit, amount: 50, recipientType: MerchantType.Store }
        ]
      }
    ];
    component.cardIndex = 0;
    component.isExpanded = true;
    component.transactionList = component.cards[0].transactions;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render transaction items when expanded', () => {
    const items = fixture.debugElement.queryAll(By.css('app-transaction-item'));
    expect(items.length).toBe(component.transactionList.length);
  });

  it('should toggle content on open-close arrow click', () => {
    spyOn(component, 'toggleContent');
    const arrow = fixture.debugElement.query(By.css('.open-close-arrow'));
    arrow.triggerEventHandler('click', null);
    expect(component.toggleContent).toHaveBeenCalled();
  });

  it('should show view all message if transactions length is greater than 4', () => {
    component.cardIndex = 1;
    component.transactionList = component.cards[component.cardIndex].transactions;
    component.isExpanded = true;
    fixture.detectChanges();

    const viewAllMsg = fixture.debugElement.query(By.css('.view-all-message'));
    expect(viewAllMsg).toBeTruthy();
  });
});
