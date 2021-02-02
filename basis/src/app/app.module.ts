import { BrowserModule } from '@angular/platform-browser';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { OrdercomponentComponent } from './Components/ordercomponent/ordercomponent.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './Components/login/login.component';
import { ExistingPageComponent } from './Components/existing-page/existing-page.component';
import { ExistingcostomerComponent } from './Components/existingcostomer/existingcostomer.component';
import { RouterModule, Routes, ChildrenOutletContexts } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { ViewComputerComponent } from './Components/view-computer/view-computer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './Components/header/header.component';
import { MenuComponent } from './Components/menu/menu.component';
import { FooterComponent } from './Components/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSortModule } from '@angular/material/sort';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MustMatchComponent } from './Components/Helpers/must-match/must-match.component';
import { ReverseStrPipe } from './pipes/reverse-str.pipe';
import { TryPipe } from './pipes/try.pipe';
import { TryingComponent } from './Components/trying/trying.component';
import { HelloComponent } from './Components/hello/hello.component';
import { ManagerComponent } from './Components/manager/manager.component';
import { ViewChartComponent } from './Components/view-chart/view-chart.component';
import { DatachangeComponent } from './Components/datachange/datachange.component';
import { MatDialogModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewShoppingBagComponent } from './Components/view-shopping-bag/view-shopping-bag.component';
import { ExsistingCustomerDetailsComponent } from './Components/exsisting-customer-details/exsisting-customer-details.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuestionsComponent } from './Components/questions/questions.component';
import { MatTreeModule } from '@angular/material/tree';
import { ContactComponent } from './Components/contact/contact.component';
// import { AngularSignaturePadModule } from 'angular-signature-pad';
import { SignaturePadModule } from 'angular2-signaturepad';
import { MgxCircularProgressModule } from 'mgx-circular-progress-bar';
// import { HelipopperModule } from '@ngneat/helipopper';
import { NgPaymentCardModule } from 'ng-payment-card';
import { PopupDateComponent } from './Components/popup-date/popup-date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { } from '@angular/material'
import { MatNativeDateModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { CreateComanyComponent } from './Components/create-company/create-company.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ContentDialogComponent } from './content-dialog/content-dialog.component';
import { CardModule } from 'ngx-card/ngx-card';
import { DateAndTimePopupComponent } from './Components/date-and-time-popup/date-and-time-popup.component';
import { ReportComponent } from './Components/report/report.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { AddComplainComponent } from './Components/add-complain/add-complain.component';
import { BorureComponent } from './Components/borure/borure.component';
import { ReturnComponent } from './Components/return/return.component';
import { SecretaryComponent } from './Components/Secretary/Secretary.component';
import { AddReportComponent } from './Components/add-report/add-report.component';
import { HeaderHideComponent } from './Components/header-hide/header-hide.component';
import { RuleComponent } from './Components/rule/rule.component';
import { MainRuleComponent } from './Components/main-rule/main-rule.component';
import { ProgramChangeComponent } from './Components/program-change/program-change.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DateandtimepopuppComponent } from './dateandtimepopupp/dateandtimepopupp.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: '', redirectTo: "existing", pathMatch: "full" },
  { path: "viewComp", component: ViewComputerComponent },
  { path: "homePage", component: HomeComponent },
  { path: "toexsist", component: ExistingPageComponent },
  {
    path: "existing", component: ExistingcostomerComponent,
    children: [
      { path: "existingCustomerDetails", component: ExsistingCustomerDetailsComponent },
      { path: "existing", component: ExistingcostomerComponent },
    ]
  },
  { path: "register", component: RegisterComponent },
  { path: "goback", component: ViewComputerComponent },
  { path: "try", component: TryingComponent },
  { path: "existingCustomerDetails", component: ExsistingCustomerDetailsComponent },
  { path: "viewBag", component: ViewShoppingBagComponent },
  { path: "question", component: QuestionsComponent },
  { path: "report/:id", component: ReportComponent },
  { path: "complain", component: AddComplainComponent },
  { path: "bourer", component: BorureComponent },
  { path: "return", component: ReturnComponent },
  { path: "Secretary", component: SecretaryComponent },
  { path: "addReport", component: AddReportComponent },
  { path: "Rule", component: RuleComponent },
  { path: "MainRule", component: MainRuleComponent },
  { path: "contact", component: ContactComponent },
  { path: "programChange", component: ProgramChangeComponent },
  {
    path: "manager", component: ManagerComponent,
    children: [
      {
        path: "edit", component: ViewComputerComponent
      },
    ]
  },
  { path: "chart", component: ViewChartComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OrdercomponentComponent,
    LoginComponent,
    ExistingPageComponent,
    ExistingcostomerComponent,
    RegisterComponent,
    ViewComputerComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    MustMatchComponent,
    ReverseStrPipe,
    TryPipe,
    TryingComponent,
    HelloComponent,
    ManagerComponent,
    ViewChartComponent,
    DatachangeComponent,
    ViewShoppingBagComponent,
    ExsistingCustomerDetailsComponent,
    QuestionsComponent,
    ContactComponent,
    PopupDateComponent,
    CreateComanyComponent,
    ContentDialogComponent,
    DateAndTimePopupComponent,
    ReportComponent,
    AddComplainComponent,
    BorureComponent,
    ReturnComponent,
    SecretaryComponent,
    AddReportComponent,
    HeaderHideComponent,
    RuleComponent,
    MainRuleComponent,
    ProgramChangeComponent,
    DateandtimepopuppComponent,
    HomeComponent],
  imports: [
    ToastrModule.forRoot(),
    BrowserModule, HttpClientModule, FormsModule, RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatSelectModule, MatInputModule, MatChipsModule, MatStepperModule, MatSortModule,
    TextFieldModule, ReactiveFormsModule, MatDialogModule, MatPaginatorModule, MatCheckboxModule,
    MatRadioModule, MatTabsModule, MatToolbarModule, MatTreeModule, SignaturePadModule,
    MgxCircularProgressModule, NgPaymentCardModule, MatDatepickerModule, MatNativeDateModule,
    MatCardModule, MatButtonToggleModule, MatTableModule, MatExpansionModule, CardModule, ChartsModule,
    MatSliderModule, MatProgressSpinnerModule, MatSidenavModule
    // AngularSignaturePadModule.forRoot()
  ],


  // NbChatModule.forRoot({ messageGoogleMapKey: 'MAP_KEY' }),
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher }, ThemeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [DatachangeComponent, HelloComponent, DateAndTimePopupComponent, CreateComanyComponent, ContentDialogComponent],
})
export class AppModule { }


