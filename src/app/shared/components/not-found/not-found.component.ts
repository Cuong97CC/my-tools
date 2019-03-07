import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,} from '@angular/router';
import { hostName } from '../../../../environments/environment';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  ticks: number;
  domain: string;
  constructor (
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.ticks = 10;
    this.domain = hostName;
    setInterval(() => {
      this.ticks--;
    }, 1000)
    setTimeout(() => {
      window.location.href = hostName;
    }, 10000);
  }
}
