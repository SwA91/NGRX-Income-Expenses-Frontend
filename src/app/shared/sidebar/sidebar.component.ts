import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  logout() {
    this.authService.logout()
    .then(resp => {
      this.router.navigate(['/login']);
    });
  }
}
