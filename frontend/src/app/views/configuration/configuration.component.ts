import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../shared/app.settings';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public availableAppLanguages;

  constructor() {
  }

  ngOnInit(): void {
    this.availableAppLanguages = AppSettings.APP_LOCALES;
  }
}
