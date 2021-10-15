import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories:any=[];
  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  }

  constructor(private _category:CategoryService, private _snack:MatSnackBar, private _quiz:QuizService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log(data);
    },(error)=>{
      Swal.fire("Erro !!", "Error in loading data", 'error');
    })
  }
  addQuiz(){
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this._snack.open("Title Required !!","",{
        duration:2000
      })
      return;
    }
    this._quiz.addQuiz(this.quiz).subscribe((data)=>{
      console.log(data);
      Swal.fire("Success", "Quiz is added", "success");
      this.quiz = {
        title:'',
        description:'',
        maxMarks:'',
        numberOfQuestions:'',
        active:true,
        category:{
          cid:''
    }
      }
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!", "Error while adding quiz", 'error');
    })
  }

}
