import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionItemComponent } from './transaction-item.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MerchantType, TransactionType } from '../constants';

describe('TransactionItemComponent', () => {
  let component: TransactionItemComponent;
  let fixture: ComponentFixture<TransactionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionItemComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionItemComponent);
    component = fixture.componentInstance;

    component.transactionItem = {
      paidTo: 'Netflix',
      transactionDate: new Date('2024-05-01'),
      transactionType: TransactionType.Credit,
      amount: 120.5,
      recipientType: MerchantType.Entertainment
    };

    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should display date in correct format', () => {
    const date = fixture.debugElement.query(By.css('.transaction-date')).nativeElement;
    expect(date.textContent.trim()).toBe('1 May 2024');
  });

  it('should display merchant name and transaction message', () => {
    const merchant = fixture.debugElement.query(By.css('.merchant-name')).nativeElement;
    const msg = fixture.debugElement.query(By.css('.transaction-message')).nativeElement;
    expect(merchant.textContent).toBe('Netflix');
    expect(msg.textContent.trim()).toBe('Refund on debit card');
  });

  it('should display correct sign and add appropriate classes for a credit transaction', () => {
    const sign = fixture.debugElement.query(By.css('.transaction-type')).nativeElement;
    const amountSection = fixture.debugElement.query(By.css('.amount-section')).nativeElement;
    expect(sign.textContent).toBe('+');
    expect(amountSection.classList).toContain('credit');
  });

  it('should display correct sign and add appropriate classes for a debit transaction', () => {
    component.transactionItem = {
      paidTo: 'Amazon',
      transactionDate: new Date('2024-05-01'),
      transactionType: TransactionType.Debit,
      amount: 365,
      recipientType: MerchantType.Store
    };
    fixture.detectChanges();

    const sign = fixture.debugElement.query(By.css('.transaction-type')).nativeElement;
    const amountSection = fixture.debugElement.query(By.css('.amount-section')).nativeElement;
    expect(sign.textContent).toBe('-');
    expect(amountSection.classList).toContain('debit');
  });

  it('should apply correct background and image path based on the merchant icon', () => {
    const merchantIcon = fixture.debugElement.query(By.css('.merchant-type-icon')).nativeElement;
    expect(merchantIcon.classList).toContain('entertainment-bg');
    expect(component.iconSrc).toBe('assets/Entertainment.svg');
  });
});
