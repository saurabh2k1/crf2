import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyService {
  private studyChange = new BehaviorSubject({id: '', name: ''});
  public study = this.studyChange.asObservable();

  constructor() { }

  setStudy(id: string, name: string) {
    this.studyChange.next({id: id, name: name});
    localStorage.setItem('study', JSON.stringify({id: id, name: name}));

  }
}
