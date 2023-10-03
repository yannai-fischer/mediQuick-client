import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from "./signup/signup.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {CommonModule} from "@angular/common";
import { FormsModule } from '@angular/forms';
import { AdminPageComponent } from './admin/admin.component';
import {AllDogsComponent} from "./all-dogs/all-dogs.component";
import {DrivesComponent} from "./drives/drives.component";
import {AdoptionComponent} from "./adoption/adoption.component";
import { MatchmakeFormComponent } from './matchmake-form/matchmake-form.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EditUserComponent,
    AllDogsComponent,
    AdoptionComponent,
    AdminPageComponent,
    DrivesComponent,
    MatchmakeFormComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
