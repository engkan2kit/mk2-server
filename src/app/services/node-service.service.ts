import { Injectable } from '@angular/core';
import { MonitoringDevice } from '../models/monitoringDevice';
import { Observable, of} from 'rxjs';
import 'rxjs/add/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NodeServiceService {

  monitoringDevice: MonitoringDevice[] = [
    { _id: "qweoipqoiwe",
      location: "Aloran Post 1",
      address: 0x01,
      phases: 3,
      unitId: 0x01,
      unitPhase:0 },
    { _id: "qweoipqoiwe",
      location: "Aloran Post 1",
      address: 0x02,
      phases: 3,
      unitId: 0x01,
      unitPhase:1 },
    { _id: "eeqweqeee",
      location: "Aloran Post 1",
      address: 0x03,
      phases: 3,
      unitId: 0x01,
      unitPhase:2 },
    { _id: "qweoeqweiwe",
      location: "Aloran Post 3",
      address: 0x04,
      phases: 1,
      unitId: 0x02,
      unitPhase:1 },
    { _id: "qweoeqweiwe",
      location: "Aloran Post 3",
      address: 0x05,
      phases: 1,
      unitId: 0x02,
      unitPhase:1 },
    { _id: "qweoeqweiwe",
      location: "Aloran Post 3",
      address: 0x06,
      phases: 1,
      unitId: 0x02,
      unitPhase:1 },
    { _id: "qweoeqweiwe",
      location: "Aloran Post 3",
      address: 0x07,
      phases: 1,
      unitId: 0x02,
      unitPhase:1 }


  ];
  constructor(private http: HttpClient) { }
  private monitoringDeviceUrl = 'http://localhost:3000/api/monitoringDevice';  // URL to web api
  getMonitoringDevices(): Observable<MonitoringDevice[]> {
    return this.http.get<MonitoringDevice[]>(this.monitoringDeviceUrl);
  }

  nodeCount() {
    return this.monitoringDevice.length;
  }
}
