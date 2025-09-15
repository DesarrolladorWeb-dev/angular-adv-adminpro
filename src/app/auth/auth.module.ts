import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, RegisterComponent, LoginComponent],
  exports: [RegisterComponent, LoginComponent],
})
export class AuthModule {}
