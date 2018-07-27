import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonitoringDevice } from '../models/monitoringDevice';
import { NodeServiceService } from '../services/node-service.service';
import 'rxjs/add/operator/filter';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-device-details',
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent implements OnInit {
  childIoConnection: any;
  ioConnection: any;
  id: number;
  address:number;
  location: string;
  status: string;
  v: number;
  a: number;
  w: number;
  va: number;
  vareact: number;
  pf: number;
  chart: any;
  maxLoad=2000;
  values= [{x: new Date(),y:0},{x: new Date(),y:0},{x: new Date(),y:0},{x: new Date(),y:0},{x: new Date(),y:0},{x: new Date(),y:0}];
  canvas: any;
  ctx: any;

  constructor(private nodeService: NodeServiceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.initIoConnection();
  }

  ngAfterViewInit(){
    console.log("re-drawn chart "+this.id);
    this.canvas = document.getElementById('canvas'+this.id);
    this.ctx = this.canvas.getContext('2d');
    this.chart= new Chart(this.ctx, {
      type: 'line',
      data: {
          datasets:[{
            data:this.values,
            backgroundColor:'rgb(10, 99, 132, 0.1)',
            borderColor: 'rgb(10, 99, 132)',
            borderWidth: 2,
            lineTension: 0.25,
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
          }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 250 * 1.5,
          easing: 'linear'
        },
        legend: false,
        scales: {
          xAxes: [{
            type: "time",
            time: {
              displayFormats: {
                  second: 'h:mm:ss a'
              }
            },
            display: true
          }]
        }
      },
      config: {
        plugins: {
            p1: false   // disable plugin 'p1' for this instance
        }
      }
    });
    this.childIoConnection = this.nodeService.onRealtime()
      .filter(monitoringDevice => monitoringDevice.address==this.id)
      .subscribe(realtimeData => {
        this.location= realtimeData.location;
        this.v=realtimeData.v;
        this.a=realtimeData.a;
        this.w=realtimeData.w;
        this.va=realtimeData.va;
        this.vareact=realtimeData.var;
        this.pf=realtimeData.pf;
        this.chart.data.datasets[0].data.push({
          x: new Date(),
          y:this.w
        });
        this.chart.data.datasets[0].data.shift();
        this.chart.update();
        
      });
  }

  private initIoConnection(): void {
    this.nodeService.initSocket();

    this.nodeService.onConnect()
      .subscribe(() => {
        console.log('connected');
      });
      
}

}
