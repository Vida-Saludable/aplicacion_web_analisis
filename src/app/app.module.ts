import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AuthInterceptor } from './core/auth.interceptor';
import { PrimeNGConfig } from 'primeng/api';
import { localeES } from './helpers/objectsCorrelations.ts/calendary';


@NgModule({
    declarations: [
        AppComponent, 
    ],
    imports: [
        AppRoutingModule, 
        AppLayoutModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(private primengConfig: PrimeNGConfig) {
        // Configuración global del idioma
        this.primengConfig.setTranslation(localeES);
    }
}
