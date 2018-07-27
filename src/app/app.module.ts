import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MaterialAppModule } from './ngmaterial.module'
import { AppComponent } from './app.component';
import  {FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { AppRoutingModule } from './app-routing.module';
import { NodeServiceService } from './services/node-service.service';
import { HttpClientModule }    from '@angular/common/http';
import { DeviceComponent } from './device/device.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SettingsComponent,
    DeviceComponent,
    DeviceDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialAppModule,
    FlexLayoutModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [NodeServiceService],
  bootstrap: [AppComponent, DashboardComponent, DeviceComponent]
})
export class AppModule { }
