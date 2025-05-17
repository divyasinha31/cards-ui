import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardsListComponent } from './cards-list.component';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { iCard } from '../model';
import { By } from '@angular/platform-browser';
import { CardBrand } from '../constants';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-card',
  template: ''
})
class MockCardComponent {
  @Input() card!: iCard;
  @Input() isCurrentCardNumberHidden!: boolean;
}

@Component({
  selector: 'app-card-control',
  template: ''
})
class MockCardControlComponent {
  @Input() card!: iCard;
  @Input() isCardFrozen!: boolean;
  @Output() freezeUnfreezeCard = new EventEmitter<boolean>();
}

describe('CardsListComponent', () => {
  let component: CardsListComponent;
  let fixture: ComponentFixture<CardsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardsListComponent,
        MockCardComponent,
        MockCardControlComponent
      ],
      imports: [BrowserAnimationsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CardsListComponent);
    component = fixture.componentInstance;
    component.cards = [
      {
        cardName: 'Test Card 1',
        cardNo: 1234567812345678,
        validity: { month: 12, year: 2026 },
        cvv: 123,
        freeze: false,
        brand: CardBrand.Visa,
        transactions: []
      },
      {
        cardName: 'Test Card 2',
        cardNo: 8765432187654321,
        validity: { month: 11, year: 2025 },
        cvv: 456,
        freeze: true,
        brand: CardBrand.Mastercard,
        transactions: []
      }
    ];
    component.cardIndex = 0;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle card number visibility when button clicked', () => {
    const button = fixture.debugElement.query(By.css('.show-card-number-button'));
    expect(component.isCurrentCardNumberHidden).toBeTrue();

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isCurrentCardNumberHidden).toBeFalse();

    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.isCurrentCardNumberHidden).toBeTrue();
  });

  it('should emit selectedCardIndex when updateSelectedCardIndex is called', () => {
    spyOn(component.selectedCardIndex, 'emit');
    component.updateSelectedCardIndex(1);
    expect(component.selectedCardIndex.emit).toHaveBeenCalledWith(1);
  });

  it('should emit freezeUnfreezeCard when updateCardFreezeUnfreezeStatus is called', () => {
    spyOn(component.freezeUnfreezeCard, 'emit');
    component.updateCardFreezeUnfreezeStatus(true);
    expect(component.freezeUnfreezeCard.emit).toHaveBeenCalledWith(true);
  });
});
