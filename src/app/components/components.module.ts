import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    LoaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    LoaderComponent,
    NavbarComponent,
    FooterComponent
  ]
})
export class ComponentsModule { }
