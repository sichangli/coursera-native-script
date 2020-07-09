import { Component, Inject, OnInit, ViewContainerRef } from "@angular/core";
import { Dish } from "../shared/dish";
import { Comment } from "../shared/comment";
import { DishService } from "../services/dish.service";
import { ActivatedRoute, Params } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { FavoriteService } from "~/services/favorite.service";
import { TNSFontIconService } from "nativescript-ngx-fonticon";
import { Toasty } from "nativescript-toasty";
import * as dialogs from "tns-core-modules/ui/dialogs";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { CommentComponent } from "~/comment/comment.component";

@Component({
  selector: "app-dishdetail",
  moduleId: module.id,
  templateUrl: "./dishdetail.component.html"
  // styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    @Inject("baseURL") public baseURL,
    private favoriteservice: FavoriteService,
    private fonticon: TNSFontIconService,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => this.dishservice.getDish(params["id"]))
      )
      .subscribe(
        dish => {
          this.dish = dish;
          this.favorite = this.favoriteservice.isFavorite(this.dish.id);
          this.numcomments = this.dish.comments.length;

          let total = 0;
          this.dish.comments.forEach(comment => (total += comment.rating));
          this.avgstars = (total / this.numcomments).toFixed(2);
        },
        errmess => {
          this.dish = null;
          this.errMess = <any>errmess;
        }
      );
  }

  addToFavorites() {
    if (!this.favorite) {
      console.log("Adding to Favorites", this.dish.id);
      this.favorite = this.favoriteservice.addFavorite(this.dish.id);
      const toast = new Toasty("Added Dish " + this.dish.id, "short", "bottom");
      toast.show();
    }
  }

  goBack(): void {
    this.routerExtensions.back();
  }

  openDialogs() {
    dialogs
      .action({
        message: "Actions",
        cancelButtonText: "Cancel",
        actions: ["Add to Favorites", "Add Comment"]
      })
      .then(result => {
        console.log("Dialog result: " + result);
        if (result === "Add to Favorites") {
          this.addToFavorites();
        } else if (result == "Add Comment") {
          this.createModalView();
        }
      });
  }

  createModalView() {
    let options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      fullscreen: false
    };

    this.modalService
      .showModal(CommentComponent, options)
      .then((comment: Comment) => {
        if (comment) {
          this.dish.comments.push(comment);
        }
      });
  }
}
