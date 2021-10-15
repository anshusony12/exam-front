import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css']
})
export class ViewQuizzesComponent implements OnInit {

  quizzes:any=[];

  constructor(private _quiz:QuizService) { }

  ngOnInit(): void {
    this._quiz.quizzes().subscribe((data:any)=>{
      console.log(data);
      this.quizzes = data;
    },(error)=>{
      console.log(error);
      Swal.fire('Error !!', "Error in loadin data", 'error');
    })
  }

  deleteQuiz(qid:any){
    Swal.fire({
      icon: 'info',
      title: 'Are you sure want to delete ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result)=>{
      if(result.isConfirmed){
        this._quiz.deleteQuiz(qid).subscribe((data)=>{
          this.quizzes = this.quizzes.filter((quiz:any)=> quiz.qid!=qid);
          Swal.fire('Sucess', 'Quiz Deleted', 'success');
        },(error)=>{
          console.log(error);
          Swal.fire("Error !!","Error in deleting quiz", 'error');
        })
      }
    })
  }

}
