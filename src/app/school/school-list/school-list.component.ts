import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form } from '../school.model';
import { SchoolsService } from '../schools.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-school-list',
  templateUrl: './school-list.component.html',
  styleUrls: ['./school-list.component.css'],
})
export class SchoolListComponent implements OnInit,OnDestroy {
  forms: Form[] = [];
  isLoading=false;
  private formsSub: Subscription;

  constructor(public schoolsService: SchoolsService) {}

  ngOnInit(): void {
    this.isLoading=true
    this.schoolsService.getForms();
    this.formsSub=this.schoolsService.getFormUpdateListener().subscribe((forms: Form[]) => {
      this.isLoading=false;
      this.forms = forms;
    });
  }

onDelete(postId:string){
this.schoolsService.deleteForms(postId);
}

  ngOnDestroy(): void {
      this.formsSub.unsubscribe();
  }
}
