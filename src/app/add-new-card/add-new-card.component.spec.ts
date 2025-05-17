import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddNewCardComponent } from './add-new-card.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CardBrand } from '../constants';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

const matDialogRefMock = {
  close: jasmine.createSpy('close')
};

describe('AddNewCardComponent', () => {
  let component: AddNewCardComponent;
  let fixture: ComponentFixture<AddNewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewCardComponent],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatOptionModule,
        BrowserAnimationsModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: {
          userName: 'John Wick',
          cardBrands: [
            { value: CardBrand.Visa, brandName: 'Visa' },
            { value: CardBrand.Visa, brandName: 'MasterCard' }
        ]}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddNewCardComponent);
    component = fixture.componentInstance;

    component.data = {
      userName: 'John Wick',
      cardBrands: [
        { value: CardBrand.Visa, brandName: 'Visa' },
        { value: CardBrand.Visa, brandName: 'MasterCard' }
      ]
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable Add Card button when form is invalid', () => {
    component.newCardForm.controls['userName'].setValue('');
    component.newCardForm.controls['cardBrand'].setValue('');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.add-card-button')).nativeElement;
    expect(button.disabled).toBeTrue();
  });

  it('should enable Add Card button call addCard() when button is clicked if form is valid', () => {
    spyOn(component, 'addCard');
    component.newCardForm.controls['userName'].setValue('John Wick');
    component.newCardForm.controls['cardBrand'].setValue('Visa');
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.add-card-button'));
    const buttonElement = button.nativeElement;
    expect(buttonElement.disabled).toBeFalse();
    button.triggerEventHandler('click', null);
    expect(component.addCard).toHaveBeenCalled();
  });

  it('should call closeModal() when close icon is clicked', () => {
    spyOn(component, 'closeModal');
    const closeIcon = fixture.debugElement.query(By.css('.cross-icon'));
    closeIcon.triggerEventHandler('click', null);
    expect(component.closeModal).toHaveBeenCalled();
  });
});
