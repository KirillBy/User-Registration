import { Component, OnInit, ViewChild, TemplateRef, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';


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
selectedAll: any;
@ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;

  constructor(private router:Router, private service:UserService, private toastr: ToastrService) { }
  

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
      this.userArray.push(  {id:this.users[num].id, username:this.users[num].username,
         email:this.users[num].email,regdate:this.users[num].regdate,
          logdate:this.users[num].logdate, status:this.users[num].status, selected:false })     
   }

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

  onBlock(){
    for (var i = 0; i < this.userArray.length; i++) {
      if(this.userArray[i].selected == true)
      {
        this.userArray[i].status = !this.userArray[i].status;
        console.log(this.userArray[i].username);
        this.service.testing(this.userArray[i].username).subscribe(
          (res:any) =>{
            if(res.succeeded){
              this.toastr.success( this.userArray[i].username + 'is blocked');
            }
            });
      }
    }
  }

  selectAll() {
    for (var i = 0; i < this.userArray.length; i++) {
      this.userArray[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    this.selectedAll = this.userArray.every(function(item:any) {
        return item.selected == true;
      })   
  }
  checkIfAnySelected() {
    for (var i = 0; i < this.userArray.length; i++) {
      if(this.userArray[i].selected == true)
      return true;
    }
    return false;
  }
}

