import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppService } from './app.service';
import { AlertService } from './shared/services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  constructor(public alertService:AlertService,public appService:AppService) {
    
  }
  
  countries = ["South England","United States of America","England"];
  country_filter = "";
  title = 'institutions-search';
  universities : any;
  showEmpty : boolean = false;
  noSelection : boolean = true;
  gpaControl = new FormControl();
  greControl = new FormControl();
  courseControl = new FormControl();
  countryControl = new FormControl();
  
  ngOnInit() {
    
  }
  
  clearFilters() {
    this.gpaControl.setValue('');
    this.greControl.setValue('');
    // this.countryControl.setValue('');
    this.country_filter = "";
    this.courseControl.setValue('');
    this.universities = [];
    this.showEmpty = false;
    this.noSelection = true;
  }

  allowOnlyNumbersAndPoint(event) {
    var k;
    k=event.charCode;
    return ((k > 47 && k < 58) || (k == 8) || (k == 46));
  }

  allowOnlyNumbers(event) {
    var k;
    k=event.charCode;
    return ((k > 47 && k < 58) || (k == 8));
  }
  
  filterSearch() {
    if(!this.gpaControl.value || !this.greControl.value || !this.country_filter.length) {
      this.alertService.createAlert("Please fill all the required fields",0);
      return;
    }
    if(parseFloat(this.gpaControl.value) > 10 ) {
      this.alertService.createAlert("GPA value should be less that or exual to 10",0);
      return;
    }
    if(parseFloat(this.greControl.value) > 340 ) {
      this.alertService.createAlert("GRE value should be less that or exual to 340",0);
      return;
    }
    this.noSelection = false;
    let finalObj = {};
    finalObj['gpa'] = this.gpaControl.value.trim();
    finalObj['gre'] = this.greControl.value.trim();
    // finalObj['country'] = this.countryControl.value.trim();
    finalObj['country'] = this.country_filter;
    if(this.courseControl.value) {
      finalObj['course'] = this.courseControl.value.trim();
    }
    this.appService.getUniversities(finalObj).then(data => {
      if(data.success) {
        this.universities = data.results;
        if(data.results.length) {
          this.showEmpty = false;
          this.noSelection = false;
        }
        else {
          this.showEmpty = true;
          this.noSelection = false;
        }
      }
      else {
        this.alertService.createAlert(data.message,0);
        this.universities = [];
        this.showEmpty = false;
        this.noSelection = true;
      }
    })
  }
}
