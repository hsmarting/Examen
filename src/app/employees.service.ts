import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from './response.model';

@Injectable()
export class EmployeesService{
    urlService:string = "https://localhost:7168/api/Employee/";
    header:HttpHeaders = new HttpHeaders().set('Type-content', 'application/json');    

    constructor(private http:HttpClient)
    {

    }


    save(employee: Employee):Observable<Response>
    {
        return this.http.post<Response>(this.urlService + "Add", employee  ,{ 
            headers:this.header           
        });     
    }


    getAll():Observable<Response>
    {                
        return this.http.get<Response>(this.urlService+ 'All', {
            headers:this.header
        });                    
    }

    get(idEmployee:number): Observable<Response>{ 
        console.log('Consulta empleado por id')
        
        return this.http.get<Response>(this.urlService + "ById/" + idEmployee,{
            headers:this.header
        });      
    }   

    delete(idEmployee:number):Observable<Response>{
        console.log('Se elimino empleado');
        return this.http.post<Response>(this.urlService + "Delete/" + idEmployee, 
        {
            headers:this.header
        });        
    }    

}