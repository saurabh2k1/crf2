import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  frmLogin: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const card = document.getElementsByClassName('card')[0];
    setTimeout(function() {
      card.classList.remove('card-hidden');
    }, 700);
    this.frmLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onLogin() {
    return 0;
  }
}
