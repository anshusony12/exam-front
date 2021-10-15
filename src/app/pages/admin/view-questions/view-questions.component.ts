import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-questions',
  templateUrl: './view-questions.component.html',
  styleUrls: ['./view-questions.component.css']
})
export class ViewQuestionsComponent implements OnInit {

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }

  qid:any;
  qTitle:any;
  questions:any;

  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    this.qTitle = this._route.snapshot.params.title;
    this._question.getAllQuestionsOfQuiz(this.qid).subscribe((data)=>{
      this.questions = data;
      console.log(this.questions);
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!", "Error loading in question of quiz",'error');
    })
    console.log(this.qid);
    console.log(this.qTitle);
  }
  deleteQuestion(quesId:any){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure want to delete ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        this._question.deleteQuestion(quesId).subscribe((data:any)=>{
          this.questions = this.questions.filter((question:any)=> question.quesId != quesId);
          Swal.fire('Success','Question delete successfully', 'success');
        },(error)=>{
          console.log(error);
          this._snack.open("Error in deleting questin",'',{
            duration:3000
          })
        })
      }
    })
  }

}
