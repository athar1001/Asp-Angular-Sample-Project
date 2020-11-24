import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';


import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NavbarComponent } from './user/navbar/navbar.component';
import { QuizComponent } from './user/quiz/quiz.component';
import { ResultComponent } from './user/result/result.component';
import { QuestionsComponent } from './admin/questions/questions.component';
import { QuestionComponent } from './admin/questions/question/question.component';
import { QuestionListComponent } from './admin/questions/question-list/question-list.component';
import { QuestionService } from './admin/shared/question.service';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    NavbarComponent,
    QuizComponent,
    ResultComponent,
    QuestionsComponent,
    QuestionComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService,AuthGuard,
  ,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  },
  QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
