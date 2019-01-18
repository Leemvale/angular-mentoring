import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthorizationService } from 'src/app/core/services/authorization/authorization.service';
import { CompositeDisposable } from '../../../shared/helpers/CompositeDisposable';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  private anchor: CompositeDisposable;

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authorizationService: AuthorizationService,
  ) { }

  ngOnInit(): void {
    this.anchor = new CompositeDisposable();
  }

  ngOnDestroy(): void {
    this.anchor.unsubscribe();
  }

  public onLogin(): void {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;
    const login  = this.authorizationService.login(email, password).subscribe(
      () => {
        console.log('Logged in!');
        this.router.navigate(['']);
      },
    );
    this.anchor.add(login);
  }
}
