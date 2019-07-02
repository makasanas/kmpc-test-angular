import { Component, OnInit } from '@angular/core';
import { SecureService } from '../secure.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validationService.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public groups = [];

  public activeDetailedRow: any = [];
  public groupform: any;
  public sensorform: any;
  public tmpGroupId: string;
  public tmpSensorId: string;
  public tmpUpdateId: string;
  public popupActive = {
    "addGroup": false,
    "addSensor": false,
  };
  public popupType = 'add';

  constructor(private _secService: SecureService, private _fb: FormBuilder) {
    this.groupform = this._fb.group({
      'shortTitle': ['', [Validators.required]],
      'title': ['', [Validators.required]],
      'wifi': ['', [Validators.required]],
      'groupCost': ['', [Validators.required, ValidationService.numeric]],
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
      this.groups = res.groups;
      this.groups.forEach((element, index) => {
        this.activeDetailedRow[index] = false;
      });

    }, err => {
      console.log(err);
    });

  }

  getGroupData(data) {
    this._secService.getGroup(data._id).subscribe((res) => {
      this.groups = res.groups;
      this.groups = res.sensors;
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  changePopup(popup: string, data: any, type: string) {
    this.popupActive[popup] = !this.popupActive[popup];
    this.popupType = type;
    this.tmpUpdateId = '';
    if (type == 'add') {
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
    } else if (type == 'update') {

      this.groupform.reset();
      this.sensorform.reset();
      console.log(popup, data, type);
      this.tmpUpdateId = data._id;
      if (popup == 'addGroup') {
        this.groupform.patchValue(data);
      }
      if (popup == 'addSensor') {
        console.log(data);
        let newShippedDate = new Date(data.shipped);
        let newInstallDate = new Date(data.installed);

        this.sensorform.patchValue(data);
        this.sensorform.shipped.setValue(newShippedDate);
        this.sensorform.installed.setValue(newInstallDate);
      }
    } else if (type == 'close') {
      this.tmpGroupId = '';
      this.tmpSensorId = '';
      this.groupform.reset();
      this.sensorform.reset();
    }

  }

  activateRowDetails(index) {
    this.activeDetailedRow[index] = !this.activeDetailedRow[index];
  }

  addGroup() {
    if (this.popupType == 'add') {
      console.log(this.groupform.value);
      if (this.tmpGroupId == undefined) {
        delete this.groupform.value.parentGroup;
      } else {
        this.groupform.controls.parentGroup.setValue(this.tmpGroupId);
      }
      this._secService.addGroup(this.groupform.value).subscribe((res) => {
        console.log(res);
        this.changePopup('addGroup', null, 'close');
        this.getGroups();
      }, err => {
        console.log(err);
        this.changePopup('addGroup', null, 'close');
      });
    }
    if (this.popupType == 'update') {

      this._secService.updateGroup(this.tmpUpdateId, this.groupform.value).subscribe((res) => {
        console.log(res);
        this.changePopup('addGroup', null, 'close');
        this.getGroups();
      }, err => {
        console.log(err);
        this.changePopup('addGroup', null, 'close');
      });
    }
  }

  addSensor() {

    if (this.popupType == 'add') {
      console.log(this.sensorform.value);

      if (this.tmpSensorId == undefined) {
        // delete this.groupform.value.parentGroup;
      } else {
        this.sensorform.controls.parentGroup.setValue(this.tmpSensorId);
        this._secService.addSensor(this.sensorform.value).subscribe((res) => {
          console.log(res);
          this.changePopup('addSensor', null, 'close');
        }, err => {
          console.log(err);
          this.changePopup('addSensor', null, 'close');
        });
      }
    }
    if (this.popupType == 'update') {
      this.sensorform.controls.parentGroup.setValue(this.tmpSensorId);
      this._secService.updateSensor(this.tmpUpdateId, this.sensorform.value).subscribe((res) => {
        console.log(res);
        this.changePopup('addSensor', null, 'close');
      }, err => {
        console.log(err);
        this.changePopup('addSensor', null, 'close');
      });
    }

  }

  deleteGroup(id: string) {
    this._secService.deleteGroup(id).subscribe((res) => {
      console.log(res);
      this.getGroups();
    }, err => {
      console.log(err);
    });
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

    this.groups.sort(function (a, b) {
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
