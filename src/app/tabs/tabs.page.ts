import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isAdmin: boolean;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    this.authService.isAdmin().then(value => this.isAdmin = value);
  }
}
