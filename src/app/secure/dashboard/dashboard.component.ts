import { Component, OnInit } from '@angular/core';
import { SecureService } from '../secure.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from './../../services/validation/validationService.service';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/it';
registerLocaleData(localeFr, 'it');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {

  public groups = [];
  public copyGroups = [];
  public sensors = [];
  public searchText: string;
  public unforseenError = false;
  public activeDetailedRow: any = [];
  public groupform: any;
  public isLoading: boolean = true;
  public sensorform: any;
  public tmpGroupId: any = null;
  public tmpGroup: any;
  public tmpSensorId: string;
  public tmpUpdateId: string;
  public isGroupData: boolean = false;
  public popupActive = {
    "addGroup": false,
    "addSensor": false,
  };
  public popupType = 'add';
  public navigation = [
    {
      "title": "Group List",
      "mainGroup": true,
    }
  ];
  public keyUp = new Subject<string>();
  public sortTable: any = {};
  public isDesc: any;
  public column: any;
  public filter: any = {};

  constructor(private datePipe: DatePipe, private _secService: SecureService, private _fb: FormBuilder) {
    this.groupform = this._fb.group({
      'shortTitle': ['', [Validators.required]],
      'title': ['', [Validators.required]],
      'wifi': ['', [Validators.required]],
      'groupCost': [Number, [Validators.required, ValidationService.numeric]],
      'parentGroup': ''
    });
    this.sensorform = this._fb.group({
      'mac': ['', [Validators.required]],
      'title': ['', [Validators.required]],
      'assignment': ['', [Validators.required]],
      'version': ['', [Validators.required]],
      'sensorCost': [Number, [Validators.required, ValidationService.numeric]],
      'shipped': [Date, [Validators.required]],
      'installed': [Date, [Validators.required]],
      'parentGroup': ''
    });
  }

  ngOnInit() {
    this.getGroups();
    setTimeout(() => { this.unforseenError = true; }, 5000);
    this.copyGroups = JSON.parse(JSON.stringify(this.groups));
    this.sort('shortTitle');
  }


  getGroups() {
    this._secService.getAllGroups().subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      this.groups = res.groups;
      this.sensors = [];

      this.groups.forEach((element, index) => {
        this.activeDetailedRow[index] = false;
      });
    }, err => {
      console.log(err);
    });

  }

  getGroupData(data, menuClick) {
    if (!menuClick) {
      this.navigation.push(data);
    }
    this.tmpGroupId = data._id;
    this.tmpGroup = data;
    this._secService.getGroup(data._id).subscribe((res) => {
      this.groups = res.groups;
      this.sensors = res.sensors;
      this.sensors.forEach(element => {
        console.log(element.shipped);
        console.log(element.installed);
        // element.shipped = this.datePipe.transform(data.shipped, 'yyyy-MM-dd');
        // element.installed = this.datePipe.transform(data.installed, 'yyyy-MM-dd');
      });
      console.log(res);
    }, err => {
      console.log(err);
    });
  }


  changeGroup(item, i) {
    console.log(i);
    this.tmpGroupId = item._id;
    this.navigation = this.navigation.slice(0, i + 1);
    console.log(this.navigation);

    if (item.mainGroup) {
      this.tmpGroupId = null;
      this.tmpGroup = null;
      this.getGroups();
    } else {
      this.getGroupData(item, true);
    }
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
        this.sensorform.controls.shipped.setValue(this.datePipe.transform(data.shipped, 'yyyy-MM-dd'));
        this.sensorform.controls.installed.setValue(this.datePipe.transform(data.installed, 'yyyy-MM-dd'));
      }
    } else if (type == 'close') {
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
        if (!this.tmpGroupId) {
          this.getGroups();
        } else {
          this.getGroupData(this.tmpGroup, true)
        }
      }, err => {
        console.log(err);
        this.changePopup('addGroup', null, 'close');
      });
    }
    if (this.popupType == 'update') {

      this._secService.updateGroup(this.tmpUpdateId, this.groupform.value).subscribe((res) => {
        console.log(res);
        this.changePopup('addGroup', null, 'close');
        if (!this.tmpGroupId) {
          this.getGroups();
        } else {
          this.getGroupData(this.tmpGroup, true)
        }
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
          this.getGroupData(this.tmpGroup, true)
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
        this.getGroupData(this.tmpGroup, true)
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

  deleteSensor(id: string) {
    this._secService.deleteSensor(id).subscribe((res) => {
      console.log(res);
      this.getGroups();
    }, err => {
      console.log(err);
    });
  }
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



  searchInTable() {
    console.log('search called');
    this.keyUp
      .pipe(map((event) => {
        return { 'value': event['target'].value, 'id': event['target'].id }
      }))
      // .debounceTime(300)
      .subscribe(value => {
        this.filter[value.id] = value.value;
        this.groups = this.copyGroups.filter((obj) => {
          let array = [];
          for (var prop in this.filter) {
            array.push(obj[prop].toLowerCase().includes(this.filter[prop]));
          }
          return array.every(x => x === true);
        });
      });
  }

}
