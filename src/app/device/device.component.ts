import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import { MonitoringDevice } from '../models/monitoringDevice';
import { NodeServiceService } from '../services/node-service.service';
import 'rxjs/add/operator/filter';
import { Chart } from 'chart.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss', '../../../node_modules/material-design-icons/iconfont/material-icons.css']
})
export class DeviceComponent implements OnInit {
  @Input() deviceData: MonitoringDevice;
  childIoConnection: any;
  address:number;
  location: string;
  status: string;
  v: string;
  a: string;
  w: string;
  va: string;
  vareact: string;
  pf: string;
  chart: any;
  maxLoad=2000;
  canvas: any;
  ctx: any;
  constructor(private nodeService: NodeServiceService,  public router: Router) { }

  ngOnInit() { 
      console.log("re-instantiated "+this.deviceData.address);
      this.address= this.deviceData.address;
      this.location= this.deviceData.location;
      this.v=this.formatSI(this.deviceData.v);
      this.a=this.formatSI(this.deviceData.a);
      this.w=this.formatSI(this.deviceData.w);
      this.va=this.formatSI(this.deviceData.va);
      this.vareact=this.formatSI(this.deviceData.var);
      this.pf=this.formatNumber(this.deviceData.pf);
      
  }

  ngAfterViewInit(){
    console.log("re-drawn chart "+this.deviceData.address);
    this.canvas = document.getElementById('canvas'+this.address);
    this.ctx = this.canvas.getContext('2d');
    this.chart= new Chart(this.ctx, {
      type: 'doughnut',
      data: {
          datasets:[{
            data:[this.deviceData.w, this.maxLoad-this.deviceData.w],
            backgroundColor:["#3F9F3F","#AFfFAF"]
          }]
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
        cutoutPercentage: 80,
        animation: {
          animateRotate: false,
          animateScale: true
        },
        elements: {
          center: {
              text: Math.round(this.deviceData.w*100/this.maxLoad)+"%"
          }
      },
      }
    });
    this.childIoConnection = this.nodeService.onRealtime()
      .filter(monitoringDevice => monitoringDevice.address==this.address)
      .subscribe(realtimeData => {
        this.location= realtimeData.location;
        this.v=this.formatSI(realtimeData.v);
        this.a=this.formatSI(realtimeData.a);
        this.w=this.formatSI(realtimeData.w);
        this.va=this.formatSI(realtimeData.va);
        this.vareact=this.formatSI(realtimeData.var);
        this.pf=this.formatNumber(realtimeData.pf);

        this.chart.data.datasets[0].data=[realtimeData.w, this.maxLoad-realtimeData.w];
        this.chart.options.elements.center.text=Math.round(realtimeData.w*100/this.maxLoad)+"%";
        this.chart.update();
        
      });
  }

  onDeviceClicked(){
    this.router.navigate(['./device-details/'+this.address])
  }

  formatSI(value: number): string{
    var resValue = 0;
    var result = "";
    var SI="";
    if (value<1000000) {
      if (value<1000){
        if (value<1){
          if (value<0.001){
            resValue=value*1000000;
            SI=" u";
          }
          else{
            resValue=value*1000;
            SI=" m";
          }
        }
        else{
          resValue=value;
          SI=" ";
        }
      }
      else{
        resValue=value/1000;
        SI=" K";
      }
    }
    else{
      resValue=value/1000000;
      SI=" M";
    }
    return Number(resValue).toFixed(3).toString() + SI;
  }

  formatNumber(value: number): string{
    return Number(value).toFixed(3) + " ";
  }

  
}
