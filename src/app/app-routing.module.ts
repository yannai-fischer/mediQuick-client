import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import {EditUserComponent} from "./edit-user/edit-user.component";
import {AdminPageComponent} from "./admin/admin.component";
import {DrivesComponent} from "./drives/drives.component";
import {AllDogsComponent} from "./all-dogs/all-dogs.component";
import {AdoptionComponent} from "./adoption/adoption.component";
import {MatchmakeFormComponent} from "./matchmake-form/matchmake-form.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'drives', component: DrivesComponent},
  {path: 'edit-user', component: EditUserComponent},
  {path: 'all-dogs', component: AllDogsComponent},
  {path: 'adoption', component: AdoptionComponent},
  {path: 'matchmake-form', component: MatchmakeFormComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
