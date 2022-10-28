import { Component, EventEmitter, OnInit, Input, Output, OnDestroy } from '@angular/core';
import { EmployeesService } from './employees.service';
import { Employee } from './employee.model';
import { Response } from './response.model';

@Component({
    selector: 'empleado-consulta',
    templateUrl: './Query.component.html',
    styleUrls: ['']
})

export class QueryComponent implements OnInit, OnDestroy{
    @Input() listEmployee:Employee[]=[];
    @Output() idEmployee: EventEmitter<number>=new EventEmitter<number>();


    constructor(private _employeesService:EmployeesService)
    {

    }

    ngOnInit(): void {   
                
        this._employeesService.getAll().subscribe(resp=> {
            this.listEmployee = (resp as Response).data;
        });
        console.log('Init Query Component' + this.listEmployee);
    }

    onGetAll():Employee[]
    {
        this._employeesService.getAll().subscribe(resp=> {
            this.listEmployee = (resp as Response).data;
        });
        return this.listEmployee;
    }
 
    onGetEmployee(idEmployee:number):void{             
        this.idEmployee.emit(idEmployee);     
        console.log(this.idEmployee);     
    } 

    onDeleteEmployee(idEmployee:number):void
    {
        let response:Response=new Response();
        this._employeesService.delete(idEmployee).subscribe(data=>{
            response = data as Response;

            if(response.isSuccess)
            {
                this._employeesService.getAll().subscribe(resp=> {
                    this.listEmployee = (resp as Response).data;
                });
            }
        });        
    }

    ngOnDestroy(): void {        
        this.idEmployee.unsubscribe();
    }
}


