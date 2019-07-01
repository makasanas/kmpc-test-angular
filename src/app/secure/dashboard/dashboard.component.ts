import { Component, OnInit } from '@angular/core';
import { SecureService } from '../secure.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public data = [
    {
      short_title: 'B1',
      title: 'Bed Room 1',
      wifi: '123@pass',
      group_cost: 1000,
      sum_cost: 800,
      amount_sensors: 200,
      sensors: [{
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }]
    },
    {
      short_title: 'B1',
      title: 'Bed Room 1',
      wifi: '123@pass',
      group_cost: 1000,
      sum_cost: 800,
      amount_sensors: 200,
      sensors: [{
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }]
    },
    {
      short_title: 'B1',
      title: 'Bed Room 1',
      wifi: '123@pass',
      group_cost: 1000,
      sum_cost: 800,
      amount_sensors: 200,
      sensors: [{
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }]
    },
    {
      short_title: 'B1',
      title: 'Bed Room 1',
      wifi: '123@pass',
      group_cost: 1000,
      sum_cost: 800,
      amount_sensors: 200,
      sensors: [{
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }, {
        mac: '12rt12fg12',
        title: 's1',
        assignment: 'assignment 1',
        version: '1.0',
        shipped: '11-12-18',
        installed: '11-12-18',
        sensor_cost: 200,
        last_seen: '12-02-19'
      }]
    }
  ]

  public activeDetailedRow: any = [];
  public groupform: any;
  public popupActive = {
    "addGroup": true
  };

  constructor(private _secService: SecureService, private _fb: FormBuilder) {
    this.groupform = this._fb.group({
      'shortTitle': ['', [Validators.required]],
      'title': ['', [Validators.required]],
      'wifi': ['', [Validators.required]],
      'groupCost': ['', [Validators.required]],
      'sumCost': ['', [Validators.required]],
      'amountSensors': ['', Validators.required],
      'parentGroup': ''
    });
  }

  ngOnInit() {
    this.data.forEach((element, index) => {
      this.activeDetailedRow[index] = false;
    });

    this._secService.getAllGroups().subscribe((res) => {
      console.log(res);
    }, err => {
      console.log(err);
    });

  }

  changePopup(popup: string) {
    this.popupActive[popup] = !this.popupActive[popup];
  }

  activateRowDetails(index) {
    this.activeDetailedRow[index] = !this.activeDetailedRow[index];
  }

}
