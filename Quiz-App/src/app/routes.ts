import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import {AuthGuard} from './auth/auth.guard';
import { ResultComponent } from './user/result/result.component';
import { QuizComponent } from './user/quiz/quiz.component';
import { QuestionsComponent } from './admin/questions/questions.component';




export const appRoutes: Routes = [
  { path : 'home' , component : HomeComponent,canActivate:[AuthGuard]  },
  { path : 'signup' , component : UserComponent,
  children : [{ path : '', component: SignUpComponent}] 
  },
  { path : 'login' , component : UserComponent,
  children : [{ path : '', component: SignInComponent}] 
  },
  {path: 'quiz',component:QuizComponent },
  {path:'result',component:ResultComponent,canActivate:[AuthGuard] },
  { path: '', redirectTo:'/login', pathMatch : 'full'},
  {path: 'admin',component:QuestionsComponent }
];


