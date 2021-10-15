import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  quesId:any;
  question:any;

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.quesId = this._route.snapshot.params.quesId;
    this._question.getQuestion(this.quesId).subscribe((data:any)=>{
      this.question = data;
    },(error)=>{
      console.log(error);
      this._snack.open("Error in loading question !!");
    })
  }

  updateQuestion(){
    this._question.updateQuestion(this.question).subscribe((data:any)=>{
      Swal.fire("Success !!", "Question is updated successfuly", 'success');
    },(error)=>{
      console.log(error);
      Swal.fire("Error !!", "Error in updating question", 'error');
    })
  }

}
