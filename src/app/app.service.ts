import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable({
    providedIn: 'root'
})

export class AppService {
    
    public headers : any;
    getuniversitiesurl = '/getuniversities';
    
    constructor( public http: Http ) { }
    
    getUniversities(item): Promise<any> {
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '
        });
        return this.http.post(this.getuniversitiesurl, JSON.stringify(item), { headers: this.headers, withCredentials: true }).toPromise()
        .then(this.extractData)
        .catch(this.handleErrorPromise);
    }
    
    private extractData(res :Response) { 
        let body = res.json();
        return body || {};
    }
    
    private handleErrorPromise(error : Response | any) {
        return Promise.reject(error.message ||error );
    }
}