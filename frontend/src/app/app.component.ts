import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _primengConfig: PrimeNGConfig) {}

  ngOnInit() {
      this._primengConfig.ripple = true;
  }
}
