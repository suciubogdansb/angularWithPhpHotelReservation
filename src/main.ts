import {platformBrowser} from '@angular/platform-browser';
import {AppRoutingModule} from "./app/app.module";

platformBrowser().bootstrapModule(AppRoutingModule)
  .catch((err) => console.error(err));
