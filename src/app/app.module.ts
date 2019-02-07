import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { ListComponent } from './list/list.component';
import { ContainerComponent } from './container/container.component';
import { BananaPipe } from './banana/banana.pipe';
import { ContainerService } from './container/container.service';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    ListComponent,
    ContainerComponent,
    BananaPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [ContainerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
