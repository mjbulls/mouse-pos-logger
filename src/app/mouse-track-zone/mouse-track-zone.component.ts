import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MySpecialLoggerService } from '../my-special-logger.service';
import { LogLevel } from '../log-level.enum';
import { LOG_LEVEL_TOKEN } from '../app.token';

@Component({
  selector: 'mpl-mouse-track-zone',
  templateUrl: './mouse-track-zone.component.html',
  styleUrls: ['./mouse-track-zone.component.css'],
  providers: [MySpecialLoggerService, {provide: LOG_LEVEL_TOKEN, useValue: LogLevel.INFO}]
})
export class MouseTrackZoneComponent implements OnInit {

  constructor (private logger: MySpecialLoggerService) {

  }

  ngOnInit() {
  }

  captureMousePos($event: MouseEvent) {
    this.logger.debug('click event cccured');
    const pos = [
      $event.clientX, $event.clientY
    ];
    this.logger.info(`x:${pos[0]} y:${pos[1]}`);
  }

}
