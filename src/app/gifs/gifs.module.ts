import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsContainerComponent } from './components/gifs-container/gifs-container.component';
import { GifCardComponent } from './components/gif-card/gif-card.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { GifsRoutingModule } from './gifs-routing.module';
import { RouterModule } from '@angular/router';
import { TagsComponent } from './components/tags/tags.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginModalComponent } from './components/login-modal/login-modal.component';
import { RegisterModalComponent } from './components/register-modal/register-modal.component';

@NgModule({
  declarations: [
    GifsContainerComponent,
    GifCardComponent,
    HomeComponent,
    DetailsComponent,
    TagsComponent,
    LoginModalComponent,
    RegisterModalComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [HomeComponent, GifsRoutingModule],
})
export class GifsModule {}
