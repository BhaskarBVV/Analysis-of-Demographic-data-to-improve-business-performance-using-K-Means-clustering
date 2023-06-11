import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { JsmapComponent } from './jsmap/jsmap.component';
import { NavbarComponent } from './navbar/navbar.component';
import { InputComponent } from './input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    JsmapComponent,
    NavbarComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
