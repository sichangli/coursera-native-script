import { Component, Inject, OnInit } from "@angular/core";
import { LeaderService } from "~/services/leader.service";
import { Leader } from "~/shared/leader";

@Component({
  selector: "app-about",
  moduleId: module.id,
  templateUrl: "./about.component.html"
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  errMess: string;

  constructor(
    private leaderService: LeaderService,
    @Inject("baseURL") public baseURL: string
  ) {}

  ngOnInit(): void {
    this.leaderService.getLeaders().subscribe(
      leaders => (this.leaders = leaders),
      errmess => (this.errMess = <any>errmess)
    );
  }
}
