import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { NativeScriptHttpModule } from "nativescript-angular/http";
import { HttpClientModule } from "@angular/common/http";
import { MenuComponent } from "./menu/menu.component";
import { baseURL } from "./shared/baseurl";
import { DishService } from "./services/dish.service";
import { ProcessHTTPMsgService } from "./services/process-httpmsg.service";
import { DishdetailComponent } from "~/dishdetail/dishdetail.component";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { HomeComponent } from "~/home/home.component";
import { PromotionService } from "~/services/promotion.service";
import { LeaderService } from "~/services/leader.service";
import { ContactComponent } from "~/contact/contact.component";
import { AboutComponent } from "~/about/about.component";
import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { FavoriteService } from "~/services/favorite.service";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";
import { FavoritesComponent } from "~/favorites/favorites.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ReservationComponent } from "~/reservation/reservation.component";
import { ReservationModalComponent } from "~/reservationmodal/reservationmodal.component";
import { CommentComponent } from "~/comment/comment.component";
import { CouchbaseService } from "~/services/couchbase.service";
import { UserAuthComponent } from "~/userauth/userauth.component";
import { PlatformService } from "~/services/platform.service";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpModule,
    HttpClientModule,
    NativeScriptUISideDrawerModule,
    NativeScriptUIListViewModule,
    TNSFontIconModule.forRoot({
      fa: "./fonts/font-awesome.min.css"
    }),
    NativeScriptFormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    FavoritesComponent,
    ReservationComponent,
    ReservationModalComponent,
    CommentComponent,
    UserAuthComponent
  ],
  entryComponents: [ReservationModalComponent, CommentComponent],
  providers: [
    { provide: "baseURL", useValue: baseURL },
    DishService,
    ProcessHTTPMsgService,
    PromotionService,
    LeaderService,
    FavoriteService,
    CouchbaseService,
    PlatformService
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
