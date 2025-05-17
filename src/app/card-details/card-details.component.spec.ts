import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardDetailsComponent } from './card-details.component';
import { By } from '@angular/platform-browser';

describe('CardDetailsComponent', () => {
  let component: CardDetailsComponent;
  let fixture: ComponentFixture<CardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardDetailsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDetailsComponent);
    component = fixture.componentInstance;

    component.isExpanded = false;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show down arrow when not expanded', () => {
    const icon = fixture.debugElement.query(By.css('.open-close-icon')).nativeElement;
    expect(icon.getAttribute('src')).toContain('Down_Arrow.svg');
  });

  it('should show up arrow when expanded', () => {
    component.isExpanded = true;
    fixture.detectChanges();

    const icon = fixture.debugElement.query(By.css('.open-close-icon')).nativeElement;
    expect(icon.getAttribute('src')).toContain('Up_Arrow.svg');
  });
});
