import { Component, OnInit } from '@angular/core';
import { NodeServiceService } from '../services/node-service.service';
import { MonitoringDevice } from '../models/monitoringDevice';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css', '../../../node_modules/material-design-icons/iconfont/material-icons.css']
})

export class DashboardComponent implements OnInit {

  monitoringDevices: MonitoringDevice[];
  constructor(private nodeService: NodeServiceService) { }

  ngOnInit() {
    this.getMonitoringDevices();
  }

  getMonitoringDevices(): void {
    this.nodeService.getMonitoringDevices()
        .subscribe(monitoringDevices => this.monitoringDevices = monitoringDevices);
  }
}
