import {bootstrapApplication, platformBrowser} from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {AppRoutingModule} from "./app/app.module";

platformBrowser().bootstrapModule(AppRoutingModule)
  .catch((err) => console.error(err));
