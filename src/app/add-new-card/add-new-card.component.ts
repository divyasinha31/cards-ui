import { Component, Inject } from '@angular/core';
import { iNewCardAdd, iNewCardAddData } from '../model';
import { CardBrand } from '../constants';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrls: ['./add-new-card.component.scss']
})
export class AddNewCardComponent {
  newCardForm: FormGroup;

  readonly cardBrand = CardBrand;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddNewCardComponent>,
              @Inject(MAT_DIALOG_DATA) public data: iNewCardAddData) {
    this.newCardForm = this.formBuilder.group({});
  }

  ngOnInit() {
    this.newCardForm = this.formBuilder.group({
      userName: new FormControl(this.data.userName, Validators.required),
      cardBrand: new FormControl({value: CardBrand.Visa, disabled: true}, Validators.required)
    });
  }

  /**
   * Closes the modal.
   *
   * @param data Indicates whether the user has chosen to close the modal or add new card.
   */
  closeModal(data?: iNewCardAdd) {
    data ? this.dialogRef.close(data) : this.dialogRef.close();
  }

  /**
   * Function implementation for "Add Card" button.
   */
  addCard() {
    const data: iNewCardAdd = {
      userName: this.newCardForm.get('userName')?.value,
      brand: this.newCardForm.get('cardBrand')?.value
    };
    this.closeModal(data);
  }
}
