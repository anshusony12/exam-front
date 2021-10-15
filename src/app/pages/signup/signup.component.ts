import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService:UserService,private snackBar:MatSnackBar) { }

  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:''
  }

  ngOnInit(): void {}

  formSubmit(){
    if(!this.user.username || !this.user.password || !this.user.email || !this.user.firstName || !this.user.lastName){
      this.snackBar.open("Mandatory(*) fields are required..","",{
        duration: 2000
      })
      return;
    }
    this.userService.addUser(this.user).subscribe((data:any)=>{
      console.log(data);
      Swal.fire('Success done !!', 'user id: '+data.id, 'success');
    },
    (error)=>{
      console.log(error);
      this.snackBar.open("Something went wrong !!","",{
        duration:2000
      })
    })

  }

}
