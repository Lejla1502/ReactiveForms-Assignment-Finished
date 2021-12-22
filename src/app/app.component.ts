import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  signupForm:FormGroup;
  projectStatus=['Stable', 'Critical', 'Finished'];

  ngOnInit(){
    this.signupForm=new FormGroup({
      'projectname':new FormControl('Project 1', [Validators.required], this.forbiddenProjectNameAsync.bind(this)),
      'email':new FormControl(null, [ Validators.required, Validators.email]),
      'pstatus': new FormControl(null), 
    });

   
  }

  onSubmit()
  {
    console.log(this.signupForm);
  }

  forbiddenProjectNameSync(control:FormControl):{[s:string]:boolean}{     //Synchronous validator
    if(control.value==='Test')
      return {'projectnameIsForbidden':true};
    
      return null;
  }

  forbiddenProjectNameAsync(control:FormControl):Promise<any> | Observable<any>{     //Asynchronous validator
    const promise=new Promise<any>((resolve,reject)=>{
      setTimeout(() => {
        if(control.value==="Test")
          resolve({'projectnameIsForbidden':true});
        else
          resolve(null);
      }, 1500);
    });

    return promise;
  }
  

}
