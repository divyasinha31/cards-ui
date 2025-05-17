import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebitCardsComponent } from './debit-cards.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { iCard } from '../model';
import { CardBrand, TransactionType, MerchantType } from '../constants';

@Component({
  selector: 'app-cards-list',
  template: ''
})
class MockCardsListComponent {
  @Input() cards: iCard[] = [];
  @Input() cardIndex!: number;
  @Output() selectedCardIndex = new EventEmitter<number>();
  @Output() freezeUnfreezeCard = new EventEmitter<boolean>();
}

@Component({
  selector: 'app-card-details',
  template: ''
})
class MockCardDetailsComponent {}

@Component({
  selector: 'app-card-transaction',
  template: ''
})
class MockCardTransactionComponent {
  @Input() cards: iCard[] = [];
  @Input() cardIndex!: number;
}

describe('DebitCardsComponent', () => {
  let component: DebitCardsComponent;
  let fixture: ComponentFixture<DebitCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DebitCardsComponent,
        MockCardsListComponent,
        MockCardDetailsComponent,
        MockCardTransactionComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DebitCardsComponent);
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
    component.selectedCardIndex = 0;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update selectedCardIndex when updateSelectedCardIndex is called', () => {
    component.updateSelectedCardIndex(1);
    expect(component.selectedCardIndex).toBe(1);
  });

  it('should update card freeze status when updateCardFreezeUnfreezeStatus is called', () => {
    component.updateCardFreezeUnfreezeStatus(true);
    expect(component.cards[component.selectedCardIndex].freeze).toBeTrue();
  });
});
