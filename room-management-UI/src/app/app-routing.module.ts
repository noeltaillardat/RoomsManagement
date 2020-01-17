import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DebugComponent } from './debug/debug.component';
import { AboutComponent } from './about/about.component';
import { ReadmeComponent } from './readme/readme.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'debug', component: DebugComponent },
  { path: 'readme', component: ReadmeComponent },
  { path: 'about' , component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
