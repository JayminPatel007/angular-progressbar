import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FileUploadService} from '../file-upload.service';

@Component({
  selector: 'app-file-upload-form',
  templateUrl: './file-upload-form.component.html',
  styleUrls: ['./file-upload-form.component.css']
})
export class FileUploadFormComponent implements OnInit {
  form: FormGroup;
  dropZoneActive = false;

  constructor(private fb: FormBuilder, private fileUploadService: FileUploadService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      files: ['']
    });
  }
  onSelect(event): void {
    // console.log(event.target.files);
    this.fileUploadService.files = event.target.files;
    this.fileUploadService.upload();
  }
  onDrop(fileList: FileList) {
    // @ts-ignore
    this.fileUploadService.files = fileList;
    this.fileUploadService.upload();
  }
  dropZoneState($event: boolean) {
    console.log($event);
    this.dropZoneActive = $event;
  }
}
