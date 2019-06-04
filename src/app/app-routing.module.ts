import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutorizationComponent } from './components/autorization/autorization.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';

import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminThemesComponent } from './components/admin/admin-themes/admin-themes.component';
import { AdminTasksComponent } from './components/admin/admin-tasks/admin-tasks.component';
import { AdminQuestionsComponent } from './components/admin/admin-questions/admin-questions.component';
import { AdminHistoryComponent } from './components/admin/admin-history/admin-history.component';
import { AdminImagesComponent } from './components/admin/admin-images/admin-images.component'

const adminMenuRoutes: Routes = [
  {path:'users', component: AdminUsersComponent},
  {path:'themes', component: AdminThemesComponent},
  {path:'tasks', component: AdminTasksComponent},
  {path:'tasks/:theme_id', component: AdminTasksComponent},
  {path:'questions', component: AdminQuestionsComponent},
  {path:'history', component: AdminHistoryComponent},
  {path:'images', component: AdminImagesComponent},
];

const routes: Routes = [
  // {path:'', component: HomeComponent},
   {path:'autorization', component: AutorizationComponent},
   {path:'thisuser', component: UserPanelComponent},
   {path:'thisadmin', component: AdminPanelComponent},
   {path:'thisadmin', component: AdminPanelComponent, children: adminMenuRoutes}, 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
