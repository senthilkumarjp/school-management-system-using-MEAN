import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Form } from '../school.model';
import { SchoolsService } from '../schools.service';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css'],
})
export class SchoolCreateComponent implements OnInit {
  enteredName = '';
  enteredDesc = '';
  enteredAge = '';
  post: Form;
  isLoading = false;
  imagePreview:string;
  form: FormGroup;
  private mode = 'create';
  private postId: string;

  constructor(
    public schoolsService: SchoolsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, {
        validators: [Validators.required, Validators.maxLength(25)],
      }),
      age: new FormControl(null, { validators: [Validators.required] }),
      description: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.schoolsService.getForm(this.postId).subscribe((postData) => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            name: postData.name,
            description: postData.description,
            age: postData.age,
            imagePath:postData.imagePath
          };
          this.form.setValue({
            name: this.post.name,
            age: this.post.age,
            description: this.post.description,
            image:this.post.imagePath
          });
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

onImagePicked(event:Event){
const file = (event.target as HTMLInputElement).files[0];
this.form.patchValue({image:file});
this.form.get('image').updateValueAndValidity();
const reader = new FileReader();
reader.onload= () =>{
  this.imagePreview = reader.result as string;
};
reader.readAsDataURL(file);
}

  onAdd() {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.schoolsService.addForms(
        this.form.value.name,
        this.form.value.description,
        this.form.value.age,
        this.form.value.image
      );
    } else {
      this.schoolsService.updateForms(
        this.postId,
        this.form.value.name,
        this.form.value.description,
        this.form.value.age,
        this.form.value.image
      );
    }
    this.form.reset();
  }
}
