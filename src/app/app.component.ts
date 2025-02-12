
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { ComponentsModule } from './components/components.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ComponentsModule],
  providers: [
    {
      provide: 'Window',
      useValue: window
    },
    provideAnimations()
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-19-crud';
}
