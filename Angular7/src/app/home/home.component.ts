import { Component, OnInit, ViewChild, TemplateRef, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { debug } from 'console';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})




export class HomeComponent implements OnInit {
details;
users;
userArray =  new Array();

@ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;

  constructor(private router:Router, private service:UserService) { }
  

  ngOnInit() {
this.service.getUserProfile().subscribe(
 res=>{
   this.details = res;
 },
 err => {
   console.log(err)
 }
);
this.service.getAllUser().subscribe(
  res=>{
    this.users = res;

    for(var num=0;num<this.users.length ;num++) {

      this.userArray.push(  {nickname:this.users[num].username, isSelected:false })
      
   }
   console.log("this.userArray[0].nickname");
  },
  err => {
    console.log(err)
  }
  );

  }

  loadTemplate(users) {
    return this.readOnlyTemplate;
}
  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }


}

