import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Message } from 'primeng/api';

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

  // Mensajes para <p-messages>
  msgs: Message[] = [];

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(f: any) {
    // Bloquea si está enviando o si el form es inválido (email requerido + formato, password requerida)
    if (f.invalid || this.loading) return;

    this.msgs = [];           // limpia mensajes previos
    this.loading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: () => {
        if (this.remember) localStorage.setItem('remember_email', this.email);
        else localStorage.removeItem('remember_email');

        this.router.navigate(['/select-project']);
      },
      error: (err) => {
        const status = err?.status;
        let detail = 'Error inesperado. Inténtalo de nuevo.';

        // Para tu caso, quieres mismo mensaje para 401 y 404
        if (status === 401 || status === 404) {
          detail = 'Credenciales incorrectas. Verifique su correo y contraseña.';
        } else if (status === 0) {
          detail = 'No hay conexión con el servidor.';
        } else if (err?.error?.message) {
          detail = err.error.message;
        }

        // Mensaje embebido (NO toast)
        this.msgs = [{
          severity: (status === 401 || status === 404) ? 'warn' : 'error',
          summary: (status === 401 || status === 404) ? 'Credenciales inválidas' : 'No se pudo iniciar sesión',
          detail
        }];

        // Opcional: auto-ocultar
        setTimeout(() => (this.msgs = []), 5000);

        // MUY IMPORTANTE: liberar el loading aquí también
        this.loading = false;
      },
      // IMPORTANTE: liberar loading en complete (no lo pongas en true)
      complete: () => { this.loading = false; },
    });
  }

  ngOnInit() {
    // Autocompleta el correo si el usuario marcó "recordarme"
    const saved = localStorage.getItem('remember_email');
    if (saved) {
      this.email = saved;
      this.remember = true;
    }
  }
}
