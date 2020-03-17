import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  files = [];
  fileWithProgressbar = [];
  apiUrl = 'http://localhost:4000/api/upload'
  subject = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  upload() {
    for (const file of this.files) {
      this.fileWithProgressbar.push({
        name: file.name,
        progress: null
      })
      console.log(file);
      const uploadData = new FormData()
      uploadData.append('name', file.name);
      uploadData.append('avatar', file);
      this.http.post(this.apiUrl, uploadData, {
        reportProgress: true,
        observe: 'events'
      })
        .subscribe(event => {
          // this.subject.next({name: file.name, event: event.type});
          if (event.type === 0) {
            this.subject.next({name: file.name, type: event.type, progress: 0});
          } else if (event.type === 1 ) {
            // @ts-ignore
            console.log( Math.round(100 * event.loaded / event.total));
            // @ts-ignore
            this.subject.next({name: file.name, type: event.type, progress: Math.round(100 * event.loaded / event.total)});
          } else  if (event.type === 4) {
            this.subject.next({name: file.name, type: event.type, progress: 100});
          }
          // this.fileWithProgressbar.map(obj => {
          //   if (obj.name === file.name) {
          //     if (event.type === 0) {
          //       obj.progress = 0;
          //       this.subject.next(this.fileWithProgressbar);
          //     } else if (event.type === 1) {
          //       // @ts-ignore
          //       console.log('*********************************', Math.round(100 * event.loaded / event.total));
          //       // @ts-ignore
          //       obj.progress = Math.round(100 * event.loaded / event.total);
          //       this.subject.next(this.fileWithProgressbar);
          //     }
          //   }
          // });
          console.log(event);
        });
    }
  }
}

