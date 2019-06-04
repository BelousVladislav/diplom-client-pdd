import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppMaterialModule } from './material.module';
import { MenuComponent } from './components/menu/menu.component';
import { AutorizationComponent } from './components/autorization/autorization.component';

import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { AdminMenuComponent } from './components/admin/admin-menu/admin-menu.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminThemesComponent } from './components/admin/admin-themes/admin-themes.component';
import { AdminTasksComponent } from './components/admin/admin-tasks/admin-tasks.component';
import { AdminQuestionsComponent } from './components/admin/admin-questions/admin-questions.component';
import { AdminHistoryComponent } from './components/admin/admin-history/admin-history.component';
import { AdminEditUserComponent } from './components/admin/admin-edit-user/admin-edit-user.component';
import { UserService } from './services/user/user.service';
import { ThemeService } from './services/theme/theme.service';
import { AdminAddThemeComponent } from './components/admin/admin-add-theme/admin-add-theme.component';
import { AdminEditThemeComponent } from './components/admin/admin-edit-theme/admin-edit-theme.component';
import { AdminImagesComponent } from './components/admin/admin-images/admin-images.component';
import { AdminToolComponent } from './components/admin/admin-tool/admin-tool.component';
import { AdminImageListComponent } from './components/admin/admin-image-list/admin-image-list.component';
import { AdminTasksListComponent } from './components/admin/admin-tasks-list/admin-tasks-list.component';
import { AdminAddTasksComponent } from './components/admin/admin-add-tasks/admin-add-tasks.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AdminEditTaskComponent } from './components/admin/admin-edit-task/admin-edit-task.component';
import { AdminAddQuestionComponent } from './components/admin/admin-add-question/admin-add-question.component';
import { AdminEditQuestionComponent } from './components/admin/admin-edit-question/admin-edit-question.component';
import { AdminAnswerComponent } from './components/admin/admin-answer/admin-answer.component';
import { AdminAddAnswerComponent } from './components/admin/admin-add-answer/admin-add-answer.component';
import { AdminEditAnswerComponent } from './components/admin/admin-edit-answer/admin-edit-answer.component';
import { AdminListAnswerComponent } from './components/admin/admin-list-answer/admin-list-answer.component';
import { AdminListQuestionComponent } from './components/admin/admin-list-question/admin-list-question.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { OurPageComponent } from './components/our-page/our-page.component';
import { StudyPageComponent } from './components/study-page/study-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AutorizationComponent,
    AdminPanelComponent,
    UserPanelComponent,
    AdminMenuComponent,
    AdminUsersComponent,
    AdminThemesComponent,
    AdminTasksComponent,
    AdminQuestionsComponent,
    AdminHistoryComponent,
    AdminEditUserComponent,
    AdminAddThemeComponent,
    AdminEditThemeComponent,
    AdminImagesComponent,
    AdminToolComponent,
    AdminImageListComponent,
    AdminTasksListComponent,
    AdminAddTasksComponent,
    AdminEditTaskComponent,
    AdminAddQuestionComponent,
    AdminEditQuestionComponent,
    AdminAnswerComponent,
    AdminAddAnswerComponent,
    AdminEditAnswerComponent,
    AdminListAnswerComponent,
    AdminListQuestionComponent,
    FooterComponent,
    MainComponentComponent,
    OurPageComponent,
    StudyPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    CKEditorModule,
  ],
  providers: [CookieService, UserService, ThemeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
