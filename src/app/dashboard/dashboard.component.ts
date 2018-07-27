import { Component, OnInit } from '@angular/core';
import { NodeServiceService } from '../services/node-service.service';
import { MonitoringDevice } from '../models/monitoringDevice';
import { Chart } from 'chart.js';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  monitoringDevices: Object[];
  monitoringDevicesRealtime: Observable<MonitoringDevice[]>;
  ioConnection: any;
  value: string;
  constructor(private nodeService: NodeServiceService) { }

  ngOnInit() {
    this.getMonitoringDevices();
    this.initIoConnection();

    Chart.pluginService.register({
      id: 'p1',
      beforeDraw: function (chart) {
          var width = chart.chart.width,
              height = chart.chart.height,
              ctx = chart.chart.ctx;
          ctx.restore();
          var fontSize = (height / 100).toFixed(2);
          ctx.font = fontSize + "em sans-serif";
          ctx.textBaseline = "middle";
          var text = chart.config.options.elements.center.text,
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
      }
  });
  }

  getMonitoringDevices(): void {
    this.nodeService.getMonitoringDevices()
        .subscribe(res => this.monitoringDevices=res);
          
  }

  private initIoConnection(): void {
    this.nodeService.initSocket();

    this.ioConnection = this.nodeService.onMessage()
      .subscribe((message: string) => {
        this.value=message;
      });
    
    

    this.nodeService.onConnect()
      .subscribe(() => {
        console.log('connected');
      });
      
}
}
