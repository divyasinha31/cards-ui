## CardsUi

> A coding challenge to focus on [UI provided](https://xd.adobe.com/view/80c753f2-db2f-4dfc-b6c2-ce39a4c787f0-d594/screen/7d8639be-16a2-4dc6-9ddc-c3bcd8d8f1ee/) and have small interactions with the page where the user can add more cards, and also has an option to freeze or unfreeze an existing card.

To develop the UI and perform interactions, certain assumptions have been made, which are as follows:
- A user will log into the portal and will interact with this.
- This user has an account balance, name, along with other aspects of a physical user.
- The card type will always be of the debit type.
- The card will always be associated with the brand "VISA".
- When clicking on "Show card number", the CVV will also be displayed.
- When clicking on "Show card number", the text should change to "Hide card number", and instead of an eye icon, we should show a slashed eye icon.
- When a card is frozen, the opacity is reduced to 75% to indicate the updated status of the card and to distinguish it from unfrozen cards.
- To add a new card, Angular Material is used to open `AddNewCardComponent` in a modal with the help of `MatDialogModule`.
- Additionally, the inputs for adding a new card are also created using Angular Material with the help of `ReactiveFormsModule`, `MatFormFieldModule`, `MatInputModule`, and `MatSelectModule`.
    - The card will always be associated with the brand "VISA". Hence, the dropdown is disabled.
    - Since it is assumed that a user will log into the portal so the default value for the card name field is the user name.
    - Form validations `Validators.required` are applied to both fields.
    - The "Add Card" button is disabled if the `newCardForm` is invalid.
- When adding a new card, the year validity is calculated between the next 2 to 5 years from the current year.
    - For example, if the user tries to add a card in the year 2025, the card validity will be generated between 2027 and 2030.

### Cloning the application
To clone the repository, follow these steps:

1. Install [Git](https://git-scm.com/downloads) (if not already installed).
2. Copy the **HTTPS URL**, https://github.com/divyasinha31/cards-ui.git.
3. Open a terminal, navigate to the desired location, and run: `git clone https://github.com/divyasinha31/cards-ui.git`

### Running the application locally

1. Once cloned, run `npm install` to install the relevant Node packages.
2. Next, run `ng serve` for a dev server and navigate to [http://localhost:4200/](http://localhost:4200/).
3. The application will automatically reload if you change any of the source files.

### Running unit tests

1. Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

2. To run tests for only one specific spec file in Angular, use the ng test command with the `--include flag`. For example, if your file is at src/app/app.component.spec.ts, run: `ng test --include src/app/app.component.spec.ts`.