import { Component, OnInit, OnDestroy } from '@angular/core';

import { ProgressBarService } from '../../services/progress-bar.service';

@Component({
  selector: 'progress-bar',
  templateUrl: 'progress-bar.component.html',
  styleUrls: ['progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  show = false;

  constructor (
    private progressBarService: ProgressBarService
  ) {}

  ngOnInit() {
    this.progressBarService.watchStorage()
      .subscribe((state) => {
        this.show = state;
      });
  }
}
