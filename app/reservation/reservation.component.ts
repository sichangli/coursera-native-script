import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { TextField } from "ui/text-field";
import { Switch } from "ui/switch";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalDialogOptions, ModalDialogService } from "nativescript-angular";
import { ReservationModalComponent } from "~/reservationmodal/reservationmodal.component";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Page } from "ui/page";
import { View } from "ui/core/view";
import * as enums from "ui/enums";
import { CouchbaseService } from "~/services/couchbase.service";

@Component({
  selector: "app-reservation",
  moduleId: module.id,
  templateUrl: "./reservation.component.html"
  // styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  reservation: FormGroup;
  isSubmitted = false;
  formView: View;
  submittedView: View;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef,
    private page: Page,
    private couchbaseService: CouchbaseService
  ) {
    this.reservation = this.formBuilder.group({
      guests: 3,
      smoking: false,
      dateTime: ["", Validators.required]
    });
  }

  ngOnInit() {}

  onSmokingChecked(args) {
    let smokingSwitch = <Switch>args.object;
    if (smokingSwitch.checked) {
      this.reservation.patchValue({ smoking: true });
    } else {
      this.reservation.patchValue({ smoking: false });
    }
  }

  onGuestChange(args) {
    let textField = <TextField>args.object;

    this.reservation.patchValue({ guests: textField.text });
  }

  onDateTimeChange(args) {
    let textField = <TextField>args.object;

    this.reservation.patchValue({ dateTime: textField.text });
  }

  onSubmit() {
    console.log(JSON.stringify(this.reservation.value));
    this.animate();
    this.saveReservation();
  }

  animate() {
    this.formView = this.page.getViewById<View>("formView");
    this.submittedView = this.page.getViewById<View>("submittedView");
    this.formView
      .animate({
        scale: { x: 0, y: 0 },
        opacity: 0,
        duration: 500,
        curve: enums.AnimationCurve.easeIn
      })
      .then(() => {
        this.isSubmitted = true;
        this.submittedView
          .animate({
            translate: { x: 0, y: 0 },
            scale: { x: 1, y: 1 },
            opacity: 1,
            duration: 500,
            curve: enums.AnimationCurve.easeIn
          })
          .then(() => {
            console.log("animation done");
          });
      });
  }

  saveReservation() {
    const docId = "reservations";
    let doc = this.couchbaseService.getDocument(docId);
    if (doc == null) {
      doc = { reservations: [this.reservation.value] };
      this.couchbaseService.createDocument(doc, docId);
    } else {
      doc.reservations.push(this.reservation.value);
      this.couchbaseService.updateDocument(docId, doc);
    }
    console.log("doc: ", doc);
  }

  createModalView(args) {
    let options: ModalDialogOptions = {
      viewContainerRef: this.vcRef,
      context: args,
      fullscreen: false
    };

    this.modalService
      .showModal(ReservationModalComponent, options)
      .then((result: any) => {
        if (args === "guest") {
          this.reservation.patchValue({ guests: result });
        } else if (args === "date-time") {
          this.reservation.patchValue({ dateTime: result });
        }
      });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }
}
