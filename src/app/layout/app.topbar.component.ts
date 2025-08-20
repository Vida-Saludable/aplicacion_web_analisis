import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem, ConfirmationService } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss'],
    providers: [ConfirmationService]
})
export class AppTopBarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    userName!: string | null;
    userEmail!: string | null;
    userRole!: string | null;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router,
        private confirmationService: ConfirmationService
    ) { }

    ngOnInit(): void {
        // Cargar la información del usuario desde el servicio de autenticación
        this.userName = this.authService.getUserName();
        this.userEmail = this.authService.getUserCorreo();
        this.userRole = this.authService.getUserRole();
    }

    // Método para confirmar antes de cerrar sesión
confirmLogout() {
  this.confirmationService.confirm({
    message: '¿Quieres salir del sistema?',
    accept: () => {
      this.logout();
    }
  });
}

// Método para cerrar sesión
logout() {
  // 1. Limpia todo el localStorage
  localStorage.clear();
  sessionStorage.clear();  

  // 2. (Opcional) Si usas sessionStorage también:
  // sessionStorage.clear();

  // 3. Redirige al login
  this.router.navigate(['/auth']);  
}

goToProjectSelection(): void {
  this.router.navigate(['/select-project']);
}


}
