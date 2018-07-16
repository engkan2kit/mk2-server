import { Component, OnInit, Input,ViewChild,ElementRef } from '@angular/core';
import { MonitoringDevice } from '../models/monitoringDevice';
import { NodeServiceService } from '../services/node-service.service';
import { Chart } from 'chart.js';

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
  constructor(private nodeService: NodeServiceService) { }

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
      .subscribe(realtimeData => {
        for (var index in realtimeData){
            if (realtimeData[index].address==this.address){
              this.location= realtimeData[index].location;
              this.v=this.formatSI(realtimeData[index].v);
              this.a=this.formatSI(realtimeData[index].a);
              this.w=this.formatSI(realtimeData[index].w);
              this.va=this.formatSI(realtimeData[index].va);
              this.vareact=this.formatSI(realtimeData[index].var);
              this.pf=this.formatNumber(realtimeData[index].pf);
      
              this.chart.data.datasets[0].data=[realtimeData[index].w, this.maxLoad-realtimeData[index].w];
              this.chart.options.elements.center.text=Math.round(realtimeData[index].w*100/this.maxLoad)+"%";
              this.chart.update();
            }
        }
        
      });
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
