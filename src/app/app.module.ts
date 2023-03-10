import { NgModule, isDevMode, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { KbarAngularModule } from 'kbar-angular'

import { AppComponent } from './app.component'
import { MainLayoutComponent } from './main-layout/main-layout.component'
import { NavbarComponent } from './navbar/navbar.component'
import { HomeComponent } from './pages/home/home.component'
import { AboutComponent } from './pages/about/about.component'

import { AppRoutingModule } from './app-routing.module'
import { ReactiveFormsModule } from '@angular/forms'
import { ServiceWorkerModule } from '@angular/service-worker'
import { ModalComponent } from './modal/modal.component'
import { CalendarComponent } from './calendar/calendar.component'
import { HeaderComponent } from './calendar/header/header.component'
import { HabitTitleComponent } from './calendar/habit-title/habit-title.component'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    ModalComponent,
    CalendarComponent,
    HeaderComponent,
    HabitTitleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    KbarAngularModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
