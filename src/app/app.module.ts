// Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Application modules
import { AppRoutingModule } from './app-routing.module';

// Application components
import { AppComponent } from './app.component';
import { DebitCardsComponent } from './debit-cards/debit-cards.component';
import { CardControlComponent } from './card-control/card-control.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardTransactionComponent } from './card-transaction/card-transaction.component';
import { CardsListComponent } from './cards-list/cards-list.component';
import { CardComponent } from './card/card.component';
import { TransactionItemComponent } from './transaction-item/transaction-item.component';
import { AddNewCardComponent } from './add-new-card/add-new-card.component';
import { MainMenuComponent } from './main-menu/main-menu.component';

// Angular material modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    DebitCardsComponent,
    CardControlComponent,
    CardDetailsComponent,
    CardTransactionComponent,
    CardsListComponent,
    CardComponent,
    TransactionItemComponent,
    AddNewCardComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
