import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/modal-dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Comment } from "~/shared/comment";
import { TextField } from "ui/text-field";
import { Slider } from "ui/slider";

@Component({
  moduleId: module.id,
  templateUrl: "./comment.component.html"
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;

  constructor(
    private params: ModalDialogParams,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      author: ["", Validators.required],
      rating: 5,
      comment: ["", Validators.required]
    });
  }

  onAuthorChange(args) {
    let textField = <TextField>args.object;
    this.commentForm.patchValue({ author: textField.text });
  }

  onRatingChange(args) {
    let slider = <Slider>args.object;
    this.commentForm.patchValue({ rating: slider.value });
  }

  onCommentChange(args) {
    let textField = <TextField>args.object;
    this.commentForm.patchValue({ comment: textField.text });
  }

  onSubmit() {
    const comment: Comment = this.commentForm.value;
    comment.date = new Date().toISOString();
    console.log("Adding new comment: ", comment);
    this.params.closeCallback(comment);
  }
}
