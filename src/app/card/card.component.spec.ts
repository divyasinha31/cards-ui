import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { CardBrand } from '../constants';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;

    component.card = {
      cardName: 'John Wick',
      cardNo: 1234567812345678,
      validity: { month: 9, year: 2025 },
      cvv: 123,
      freeze: false,
      brand: CardBrand.Visa,
      transactions: []
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mask card number when isCurrentCardNumberHidden is true', () => {
    component.isCurrentCardNumberHidden = true;
    fixture.detectChanges();

    console.log('component.isCurrentCardNumberHidden', component.isCurrentCardNumberHidden);

    const masked = fixture.debugElement.query(By.css('.masked-number'));
    const cvv = fixture.debugElement.query(By.css('.card-cvv div:last-child')).nativeElement;
    expect(masked).toBeTruthy();
    expect(cvv.textContent.trim()).toBe('***');
  });

  it('should show unmasked card number when isCurrentCardNumberHidden is false', () => {
    component.isCurrentCardNumberHidden = false;
    fixture.detectChanges();

    const unmasked = fixture.debugElement.query(By.css('.unmasked-number'));
    expect(unmasked.nativeElement.textContent).toContain('1234');
  });

  it('should render card name and expiry date', () => {
    const owner = fixture.debugElement.query(By.css('.card-owner')).nativeElement;
    const expiry = fixture.debugElement.query(By.css('.card-validity .card-info-text')).nativeElement;
    expect(owner.textContent).toContain('John Wick');
    expect(expiry.textContent).toContain('09/25');
  });
});
