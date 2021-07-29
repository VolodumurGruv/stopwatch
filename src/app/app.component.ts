import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { stopwatch } from './helpers/stopwatch';
import { msToHms } from './helpers/msToHms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'stopwatch';

  pause = new BehaviorSubject<boolean>(false);
  start = new BehaviorSubject<boolean>(false);
  stopWatch = new BehaviorSubject<string>('00:00:00');
  laps = [];

  ngOnInit() {
    stopwatch(this.start, this.pause, 100).subscribe({
      next: (val) => this.stopWatch.next(msToHms(val)),
    });
  }

  startTimer() {
    if (this.start.value) {
      if (this.pause.value) {
        this.pause.next(false);
      } else {
        this.pause.next(true);
      }
    }

    this.start.next(true);
  }

  reset() {
    if (this.start.value) {
      if (this.pause.value) {
        this.start.next(false);
        this.pause.next(false);
        this.laps = [];
        this.stopWatch.next('00:00:00');
      } else {
        this.laps = [...this.laps, this.stopWatch.value];
      }
    }
  }

  stop() {
    this.start.complete();
    this.pause.complete();
  }

  wait($event) {}
}
