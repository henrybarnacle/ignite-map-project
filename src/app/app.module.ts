import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './features/home/home.component';
import { DetailsComponent } from './features/home/details/details.component';
import { SidebarComponent } from './features/sidebar/sidebar.component';
import { AccordionModule } from 'primeng/accordion';
import { RampInfoComponent } from './features/home/ramp-info/ramp-info.component';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { HttpClientModule } from '@angular/common/http';
import { CapaciyTableComponent } from './features/capaciy-table/capaciy-table.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    SidebarComponent,
    RampInfoComponent,
    CapaciyTableComponent ],
  entryComponents: [
    RampInfoComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartModule,
    CardModule,
    ToolbarModule,
    SidebarModule,
    PanelModule,
    AccordionModule,
    ButtonModule,
    ScrollPanelModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
