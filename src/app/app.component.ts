import { Component, OnInit, Output} from "@angular/core";
import { EmployeesService } from "./employees.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from './response.model';
import { Employee } from "./employee.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
})
export class AppComponent implements OnInit
{
    frmEmployee!: FormGroup;
    @Output() listEmployee:Employee[] = [];
    constructor(private _employeesService:EmployeesService)
    {

    }

   ngOnInit(): void {
    this.frmEmployee = new FormGroup({
        idEmployee: new FormControl(0),
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        address: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required),
        phoneNumber: new FormControl(null, Validators.required),
      });
      
   }

   onSave()
   {
        const employee = this.frmEmployee.value;
        if(this.frmEmployee.valid)
        {
          let response:Response = new Response();
          this._employeesService.save(employee).subscribe(data=>{
              response = data as Response;
              if(response.isSuccess)
              {
                this.frmEmployee.reset();
                
                this._employeesService.getAll().subscribe(data=> {
                  this.listEmployee = data.data
                });

              }
          });         
        }
        
        console.log('Metodo OnSave');
   }

   onEditEmployee(idEmployee:any)
   {
       let response:Response= new Response();
       this._employeesService.get(idEmployee).subscribe(data=> {
           response = data as Response;
           if(response.isSuccess)
           {
            this.frmEmployee.patchValue(response.data);
           }
       });              
   }
   

}