export interface MonitoringDevice {
    _id: string;
    location: string;
    address: number;
    phases: number;
    unitId: number;
    unitPhase: number;
    v: number;
    a: number;
    w: number;
    va: number;
    var: number;
    pf: number;
}