import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {  FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {




  constructor(private authSrv: AuthService , private router: Router ) {
   }

  ngOnInit(): void {
  }

register(form:NgForm){
  try{
    this.authSrv.register(form.value).subscribe()
    console.log(form.value)
  } catch(error:any){
    alert(error)
    this.router.navigate(['/register'])
  }

}

// validateForm(data: {name:string , lastname:string , email:string , password:string }){
//   this.registrationForm = this.fb.group({
//      name: [
//       '' , [Validators.required , Validators.minLength(2) , Validators.pattern(/^[a-zA-Z]+$/),]
//     ],
//      lastname:[
//       '' , [Validators.required , Validators.minLength(2) , Validators.pattern(/^[a-zA-Z]+$/),]
//      ],
//      email:[
//       '' , [Validators.required , Validators.email]
//      ],
//      password:[
//       '' , [Validators.required , Validators.minLength(8) ]
//      ],

//   })

// }

}
