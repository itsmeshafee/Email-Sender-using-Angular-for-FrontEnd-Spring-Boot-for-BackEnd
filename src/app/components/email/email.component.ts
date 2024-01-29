import { Component, OnInit } from '@angular/core';
import { EmailService } from '../../services/email.service';
import { response } from 'express';
import { error } from 'console';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrl: './email.component.css'
})
export class EmailComponent implements OnInit {
  
  constructor(private email:EmailService, private snack:MatSnackBar){}
  data={
    to:"",
    subject:"",
    message:""
  }
  flag:boolean=false;
  ngOnInit(): void {
    
  }

  doSubmitForm(){
    console.log("Debugging");
    console.log("DATA" + this.data);

    if (this.data.to=='' ||
        this.data.message=='' ||
        this.data.subject=='') {
          this.snack.open("Fields cannot be Empty !!", "Cancel");
    }    
    this.flag=true;
    this.email.sendEmail(this.data).subscribe(
      response=>{
        console.log(response);  
        this.flag=false;   
        this.snack.open("Send Success", "Ok")   ;
      },
      error=>{
        console.log(error);
        this.flag=false;
        this.snack.open("ERROR !!","Ok");
        
      }
    )
    
  }

}
