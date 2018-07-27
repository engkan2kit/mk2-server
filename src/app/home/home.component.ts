import { Component, OnInit } from '@angular/core';
import { MonitoringDevice } from '../models/monitoringDevice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss', '../../../node_modules/material-design-icons/iconfont/material-icons.css']
})
export class HomeComponent implements OnInit {
  device: MonitoringDevice;
  constructor() { 
  }

  ngOnInit() {
  }

}
