import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth/auth.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email: string = '';
  password!: string;

  constructor(
    public layoutService: LayoutService,
    private authService: AuthService,
    private router: Router
  ) { }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/select-project']);  // Redirige al usuario al layout principal
      },
      error: (err) => {
        console.error('Error de autenticación', err);
        alert('Credenciales incorrectas');
      }
    });
  }
}
