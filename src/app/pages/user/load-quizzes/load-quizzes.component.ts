import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quizzes',
  templateUrl: './load-quizzes.component.html',
  styleUrls: ['./load-quizzes.component.css']
})
export class LoadQuizzesComponent implements OnInit {

  catId:any;
  quizzes:any;


constructor(private _route:ActivatedRoute,private _quiz:QuizService) { }

  ngOnInit(): void {
    
    this._route.params.subscribe((params:any)=>{
      this.catId = params.catId;
      if(this.catId == 0){
        this._quiz.activeQuizzes().subscribe((data:any)=>{
          this.quizzes = data;
        },(error)=>{
          alert('Error in loading all quizzes');
        })
      }
      else{
        this.quizzes = [];
        this._quiz.activeQuizzesOfCategory(this.catId).subscribe((data:any)=>{
          this.quizzes = data;
        },(error)=>{
          Swal.fire('Error !!', 'Error in loading quiz data by category id','error');
        })
      }
    })
  }

}
