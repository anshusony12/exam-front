import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoriesComponent } from './pages/admin/view-categories/view-categories.component';
import { ViewQuestionsComponent } from './pages/admin/view-questions/view-questions.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import {SignupComponent} from './pages/signup/signup.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizzesComponent } from './pages/user/load-quizzes/load-quizzes.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';

const routes: Routes = [
    {
      path:'',
      component: HomeComponent
    },
    {
      path:'signup',
      component: SignupComponent,
      pathMatch: 'full'
    },
    {
      path:'login',
      component: LoginComponent,
      pathMatch: 'full'
    },
    {
      path:'admin',
      component: DashboardComponent,
      canActivate: [AdminGuard],
      children:[
        {
          path:'',
          component: WelcomeComponent,
        },
        {
          path:'profile',
          component: ProfileComponent,
        },
        {
          path:'categories',
          component:ViewCategoriesComponent
        },
        {
          path:'add-category',
          component:AddCategoryComponent
        },
        {
          path:'quizzes',
          component:ViewQuizzesComponent
        },
        {
          path:'add-quiz',
          component:AddQuizComponent
        },
        {
          path:'quiz/:qid',
          component:UpdateQuizComponent
        },
        {
          path:'view-questions/:qid/:title',
          component:ViewQuestionsComponent
        },
        {
          path:'add-question/:qid/:title',
          component:AddQuestionComponent
        },
        {
          path:'update-question/:quesId',
          component:UpdateQuestionComponent
        }
      ]
    },
    {
      path:'user-dashboard',
      component: UserDashboardComponent,
      canActivate: [NormalGuard],
      children:[
        {
          path:':catId',
          component:LoadQuizzesComponent
        },
        {
          path:'instructions/:qid',
          component:InstructionsComponent
        },        
      ]
    },
    {
      path:'start/:qid',
      component:StartComponent,
      canActivate: [NormalGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
