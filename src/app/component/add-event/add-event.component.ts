import { Component } from '@angular/core';
import {
  AbstractControl, Form,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {RoleService} from "../../service/Role/role.service";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";
import {KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {TypeDay} from "../../Models/TypeDay";
import {TypeDayService} from "../../service/typeDay/type-day.service";

@Component({
  selector: 'app-add-event',
  standalone: true,
  imports: [
    FormsModule,
    KeyValuePipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './add-event.component.html',
  styleUrl: './add-event.component.scss'
})
export class AddEventComponent {

  addEventForm! : FormGroup
  dateOne :string |null = null;
  dateTwo : string |null = null;
  typeDay! : TypeDay[] ;
  constructor(private fs : FormBuilder,private Td : TypeDayService,private authS : AuthService, private router : Router) {

    this.Td.getAll().subscribe({
      next: data => {

        this.typeDay = data;
      },
      error: (error) => {
          console.error(error)
      }
    })
    const strongPasswordRegex = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/
    this.addEventForm = this.fs.group({

      name: [null,[Validators.required]],
      startDate: [0,[Validators.required]],
      endDate :[ 0,[Validators.required]],
      location: [null,[Validators.required]],
      adress: [null,Validators.required],
      days : this.fs.array([]),
      status: [1, []],

    } , {
      validators : [this.checkDate()]
    })


    console.log(this.addEventForm.get("startDate")?.value)
  }
  calculateDiff(sentDate1 : string, sentDate2 : string) {
    var date1:any = new Date(sentDate1);
    var date2:any = new Date(sentDate2);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));
    if(this.dateOne !== sentDate1 || this.dateTwo!== sentDate2 ) {
      console.log("test")
      this.dateTwo = sentDate2;
      this.dateOne = sentDate1
      this.getdays().clear()
      if(diffDays > 0 ){
        for(let i=1 ; i<= diffDays ;i++){
          this.addDays(i)
        }
      }

    }

   return diffDays;
  }
  checkDate(): ValidatorFn {
  // @ts-ignore
    return (form: FormGroup): ValidationErrors | null => {

    return  (new Date(form?.get("endDate")?.value)  < new Date(form?.get("startDate")?.value))   ? {endDateGreaterThanStartedDate : true}  : null

  }
}
  getdays(){

    return this.addEventForm.get("days") as FormArray
  }
  addDays(id : number){

    this.getdays().push(this.fs.group({
      day : ["test",[]],
      typeDay : [2,[]]
    }))

  }


  onSubmit(){
    // @ts-ignore
    this.submitted = true;
    if(this.addEventForm.valid){
      console.log(this.addEventForm.get("startDate"))
      console.log(this.addEventForm.get("endDate"))
      console.log(this.addEventForm.get("endDate")?.errors)

    }else{
      // @ts-ignore

      console.log(this.addEventForm?.errors['endDateGreaterThanStartedDate'])
    }
  }

  protected readonly Number = Number;
  protected readonly Array = Array;
}
