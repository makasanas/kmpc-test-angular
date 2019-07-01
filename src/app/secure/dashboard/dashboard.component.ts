import { Component, OnInit } from '@angular/core';
import { SecureService } from '../secure.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data = [];

  public activeDetailedRow: any = [];
  public groupform: any;
  public sensorform: any;
  public tmpGroupId: string;
  public tmpSensorId: string;
  public popupActive = {
    "addGroup": false,
    "addSensor": false,
  };

  constructor(private _secService: SecureService, private _fb: FormBuilder) {
    this.groupform = this._fb.group({
      'shortTitle': ['', [Validators.required]],
      'title': ['', [Validators.required]],
      'wifi': ['', [Validators.required]],
      'groupCost': ['', [Validators.required]],
      'parentGroup': ''
    });
    this.sensorform = this._fb.group({
      'mac': ['', [Validators.required]],
      'title': ['', [Validators.required]],
      'assignment': ['', [Validators.required]],
      'version': ['', [Validators.required]],
      'sensorCost': ['', [Validators.required]],
      'shipped': [Date, [Validators.required]],
      'installed': [Date, [Validators.required]],
      'parentGroup': ''
    });
  }

  ngOnInit() {
    this.getGroups();
  }


  getGroups() {
    this._secService.getAllGroups().subscribe((res) => {
      console.log(res);
      this.data = res.data;
      this.data.forEach((element, index) => {
        this.activeDetailedRow[index] = false;
      });

    }, err => {
      console.log(err);
    });

  }

  changePopup(popup: string, data: any) {
    console.log(popup, data);

    this.popupActive[popup] = !this.popupActive[popup];
    if (popup == 'addGroup') {
      if (data != null) {
        console.log('child group');
        this.tmpGroupId = data;
      } else {
        console.log('direct add group');
        this.tmpGroupId = undefined;
      }
    }
    if (popup == 'addSensor') {
      if (data != null) {
        console.log('child group');
        this.tmpSensorId = data;
      } else {
        console.log('direct add group');
        this.tmpSensorId = undefined;
      }
    }
  }

  activateRowDetails(index) {
    this.activeDetailedRow[index] = !this.activeDetailedRow[index];
  }

  addGroup() {
    console.log(this.groupform.value);
    if (this.tmpGroupId == undefined) {
      delete this.groupform.value.parentGroup;
    } else {
      this.groupform.controls.parentGroup.setValue(this.tmpGroupId);
    }
    this._secService.addGroup(this.groupform.value).subscribe((res) => {
      console.log(res);
      this.changePopup('addGroup', null);
    }, err => {
      console.log(err);
      this.changePopup('addGroup', null);
    });
  }


  addSensor() {
    console.log(this.sensorform.value);
    if (this.tmpSensorId == undefined) {
      // delete this.groupform.value.parentGroup;
    } else {
      this.sensorform.controls.parentGroup.setValue(this.tmpSensorId);
      this._secService.addSensor(this.sensorform.value).subscribe((res) => {
        console.log(res);
        this.changePopup('addSensor', null);
      }, err => {
        console.log(err);
        this.changePopup('addSensor', null);
      });
    }

  }


  public sortTable: any = {};
  public isDesc: any;
  public column: any;
  // public keyUp = new Subject<string>();
  sort(property) {
    if (this.sortTable[property]) {
      this.sortTable[property] = false;
    } else {
      this.sortTable[property] = true;
    }
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    let direction = this.sortTable[property] ? 1 : -1;

    this.data.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
  }

  // searchInTable() {
  // 	this.keyUp
  // 		.map((event) => {
  // 			return { 'value': event['target'].value, 'id': event['target'].id }
  // 		})
  // 		// .debounceTime(300)
  // 		.subscribe(value => {
  // 			this.filter[value.id] = value.value;
  // 			this.resultData = this.copyResultData.filter((obj) => {
  // 				let array = [];
  // 				for (var prop in this.filter) {
  // 					array.push(obj[prop].toLowerCase().includes(this.filter[prop]));
  // 				}
  // 				return array.every(x => x === true);
  // 			});
  // 		});
  // }

}
