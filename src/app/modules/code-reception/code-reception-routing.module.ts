import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeReceptionComponent } from './components/code-reception.component';

const routes: Routes = [
  {
    path: '',
    component: CodeReceptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeReceptionRoutingModule { }
