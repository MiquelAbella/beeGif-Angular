import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [NavComponent],
})
export class SharedModule {}
