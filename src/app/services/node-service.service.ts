import { Injectable } from '@angular/core';
import { MonitoringDevice } from '../models/monitoringDevice';
import { Observable, of} from 'rxjs';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://192.168.1.18:3000';

@Injectable({
  providedIn: 'root'
})
export class NodeServiceService {

  monitoringDevice: MonitoringDevice[];
  constructor(private http: HttpClient) { }
  private monitoringDeviceUrl = SERVER_URL+'/api/monitoringDevice';  // URL to web api
  getMonitoringDevices(): Observable<MonitoringDevice[]> {
    return this.http.get<MonitoringDevice[]>(this.monitoringDeviceUrl);
  }

  
  nodeCount() {
    return this.monitoringDevice.length;
  }


  private socket;

  public initSocket(): void {
      this.socket = socketIo(SERVER_URL);
  }

  public send(message: string): void {
      this.socket.emit('message', message);
  }

  public onMessage(): Observable<string> {
      return new Observable<string>(observer => {
          this.socket.on('message', (data: string) => observer.next(data));
      });
  }

  public onRealtime(): Observable<MonitoringDevice> {
    return new Observable<MonitoringDevice>(observer => {
        this.socket.on('realtime', (data) => {
            for(let node of data.nodes){
                observer.next(node);
            }
        });
    });
}

  public onConnect(): Observable<any> {
      return new Observable<Event>(observer => {
          this.socket.on("connect", () => observer.next());
      });
  }
}
