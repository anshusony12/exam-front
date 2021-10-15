import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  qid:any;
  questions:any;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;

  isSubmit = false;

  timer:any;

  constructor(private locationStrategy:LocationStrategy, private _route:ActivatedRoute, private _question:QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    this.loadQuestion();
  }

  loadQuestion(){
    this._question.getQuestionOfQuiz(this.qid).subscribe((data:any)=>{
      this.questions = data;
      this.timer = this.questions.length * 2 * 60;
      // this.questions.forEach((q:any)=>{
      //   q['givenAnswer'] = '';
      // })
      console.log(this.questions);
      this.startTimer();
      //console.log(this.questions)
    },(error)=>{
      Swal.fire('Error !!', 'Error in loading questions', 'error');
    })
  }

  preventBackButton(){
    history.pushState(null,null, location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null, null, location.href);
    })
  }

  submitQuiz(){
    Swal.fire({
      title:'Do you want to submit the quiz ?',
      showCancelButton:true,
      confirmButtonText: 'Start',
      icon:'info'
    }).then((result)=>{
      if(result.isConfirmed){
        this.evaluateQuiz();
      }
    })
  }

  evaluateQuiz(){

    this._question.evalQuiz(this.questions).subscribe((data:any)=>{
      //console.log(data);
      this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswer = data.correctAnswer;
      this.attempted = data.attempted;
      this.isSubmit = true;
    },(error)=>{
      console.log(error);
    })
    // this.isSubmit = true;
    //     this.correctAnswer = 0;
    //     this.marksGot = 0;
    //     this.attempted = 0;
    //     this.questions.forEach((q:any) => {
    //       if(q.givenAnswer == q.answer){
    //         this.correctAnswer++;
    //         let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
    //         this.marksGot += marksSingle;
    //       }
    //       if(q.givenAnswer.trim()!=''){
    //         this.attempted++;
    //       }
    //     });
  }

  startTimer(){
    let t = window.setInterval(()=>{
      if(this.timer <= 0){
        this.evaluateQuiz();
        clearInterval(t);
      }else{
        this.timer--;
      }
    },1000)
  }

  getFormattedTime(){
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${mm} : ${ss}`;
  }

  printPage(){
    window.print();
  }

}
