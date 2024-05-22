import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "./app.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {CommonModule} from "@angular/common";
import {ReservationPageComponent} from "./pages/reservation-page/reservation-page.component";
import {AuthGuard} from "./auth.guard";
import {AddPageComponent} from "./pages/add-page/add-page.component";

export const routes: Routes = [
  { path: '', redirectTo: 'show', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'show', component : MainPageComponent, canActivate: [AuthGuard]},
  { path: 'reservation', component : ReservationPageComponent, canActivate: [AuthGuard]},
  { path: 'add', component : AddPageComponent, canActivate: [AuthGuard]}
];

@NgModule(
  {
    declarations: [
      AppComponent,
      LoginPageComponent,
      MainPageComponent,
      ReservationPageComponent,
      AddPageComponent
    ],
    imports: [
      BrowserModule,
      RouterModule.forRoot(routes),
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule
    ],
    providers: [],
    bootstrap: [
      AppComponent
    ]
  }
)

export class AppRoutingModule {
}
