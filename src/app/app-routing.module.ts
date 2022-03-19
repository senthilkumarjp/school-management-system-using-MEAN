import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertComponent } from './alert/alert.component';
// import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Class5Component } from './components/student/class5/class5.component';
import { Teacher1Component } from './components/teacher/teacher1/teacher1.component';
import { SchoolCreateComponent } from './school/school-create/school-create.component';
import { SchoolListComponent } from './school/school-list/school-list.component';
import { SchoolComponent } from './school/school.component';

const routes: Routes = [
  {path:'',component:SchoolComponent},
  { path: 'list', component: SchoolListComponent },
  { path: 'create', component: SchoolCreateComponent },
  // { path: 'edit/:postId', component: SchoolCreateComponent },
  {path: 'alert', component:AlertComponent},
  {path:'class5',component:Class5Component},
  {path:'teacher1', component:Teacher1Component},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
