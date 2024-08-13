import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StripeService } from '@main/shared/services/stripe-api/stripe.service';

@Component({
  selector: 'app-add-stripe-payment-method',
  templateUrl: './add-stripe-payment-method.component.html',
  styleUrls: ['./add-stripe-payment-method.component.scss']
})
export class AddStripePaymentMethodComponent implements OnInit {
  private req: Subscription;
  public stripeDataForm!: FormGroup;
  public cardNumber: string;
  public expiryMonth: string;
  public expiryYear: string;
  public cvc: string;

  constructor(private stripeService: StripeService,
    public dialogRef: MatDialogRef<AddStripePaymentMethodComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.stripeDataForm = this.formBuilder.group({
      number: ['', [Validators.required]],
      exp_month: ['', [Validators.required]],
      exp_year: ['', [Validators.required]],
      cvc: ['', [Validators.required]],

      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  submitPaymentForm() {
    const paymentMethodData = {
      type: 'card',
      card: {
        number: this.stripeDataForm.controls['number'].value,
        exp_month: this.stripeDataForm.controls['exp_month'].value,
        exp_year: this.stripeDataForm.controls['exp_year'].value,
        cvc: this.stripeDataForm.controls['cvc'].value,
      },
      billing_details:{
        name: `${this.stripeDataForm.controls['first_name'].value} ${this.stripeDataForm.controls['last_name'].value}`,
        email: this.stripeDataForm.controls['email'].value,
        phone: this.stripeDataForm.controls['phone'].value,
      }
    };

    console.log(paymentMethodData)
    this.dialogRef.close(paymentMethodData)
  }
}
