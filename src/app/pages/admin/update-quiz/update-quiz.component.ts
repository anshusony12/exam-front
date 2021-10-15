import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private _route:ActivatedRoute, private _quiz:QuizService, private _snack:MatSnackBar, private _category:CategoryService, private _router:Router) { }

  qid = 0;
  quiz:any;
  categories:any;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this._quiz.getQuiz(this.qid).subscribe((data:any)=>{
      this.quiz = data;
      console.log(this.quiz);
    },(error)=>{
      console.log(error);
    })
    this._category.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log(this.categories);
    },(error)=>{
      console.log(error);
      this._snack.open("Error in loading categories !!",'',{
        duration:3000
      })
    })
  }

  public updateQuizData(){
    this._quiz.updateQuiz(this.quiz).subscribe((data:any)=>{
      Swal.fire('Sucess !!', 'Quiz updated sucessfully', 'success').then((e)=>{
        this._router.navigate(['/admin/quizzes']);
      });
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!", 'Error in updating quiz', 'error');
    })
  }

}
