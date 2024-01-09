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
import {AddEventForm} from "../../Models/AddEventForm";
import {EventsService} from "../../service/event/events.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Status} from "../../Models/Status";
import {StatusService} from "../../service/status/status.service";

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
  message : string = "";
  addEventForm! : FormGroup
  dateOne :string |null = null;
  dateTwo : string |null = null;
  typeDay! : TypeDay[] ;
  status! : Status[];
  constructor(private fs : FormBuilder,private Td : TypeDayService,private authS : AuthService, private router : Router,private EventService : EventsService,private sS : StatusService) {

    this.Td.getAll().subscribe({
      next: data => {

        this.typeDay = data;
      },
      error: (error) => {
          console.error(error)
      }
    })
    this.sS.getAll().subscribe({
      next: data => {

        this.status = data;
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
      description : [null,Validators.required],
      location: [null,[Validators.required]],
      adress: [null,Validators.required],
      days : this.fs.array([]),
      status: [1, [Validators.required]],

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
      ["jour " + id] : [id,[]],
      typeDay : [1,[Validators.min(1)]]
    }))

  }


  onSubmit(){
    // @ts-ignore
    this.submitted = true;
    if(this.addEventForm.valid){
      let datas = this.addEventForm.value
      const dataEvent : AddEventForm = {
        name : datas.name,
        description : datas.description,
        adress : datas.adress,
        startDate : datas.startDate,
        endDate : datas.endDate,
        location : datas.location,
        status : this.status.find(m => m.id === datas.status) as Status
      }
      this.EventService.AddEvent(dataEvent).subscribe( {
        next : data => {

          for (let i = 0; i < datas.days.length ; i++) {
            let date : Date = new Date(datas.startDate)
            date = new Date(date.setDate(date.getDate() +i))
            this.EventService.addDays(data,date,datas.days[i].typeDay).subscribe({
              next : data => {},
              error : error => {
                this.message = error.message
                console.log(error)
              }
            } )
            this.message = "l'evenement a bien été créé"
            // this.router.navigate([""])
          }


        },
        error : error => {
          console.log(error)
        }

      })

    }else{
      // @ts-ignore


    }
  }

  protected readonly Number = Number;
  protected readonly Array = Array;
  protected readonly Object = Object;
}
