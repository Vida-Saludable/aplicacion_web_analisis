import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  remember = false;

  loading = false;
  authError = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(f: any) {
    if (f.invalid || this.loading) return;

    this.authError = '';
    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        // si quieres recordar, guarda el correo
        if (this.remember) localStorage.setItem('remember_email', this.email);
        else localStorage.removeItem('remember_email');

        this.router.navigate(['/select-project']);
      },
      error: (err) => {
        console.error(err);
        this.authError = 'Credenciales incorrectas. Inténtalo de nuevo.';
      },
      complete: () => (this.loading = false),
    });
  }

  ngOnInit() {
    // autocompleta el correo si el usuario marcó "recordarme"
    const saved = localStorage.getItem('remember_email');
    if (saved) {
      this.email = saved;
      this.remember = true;
    }
  }
}
