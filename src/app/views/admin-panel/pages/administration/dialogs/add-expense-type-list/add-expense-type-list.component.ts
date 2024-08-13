import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AddFundingSourceComponent } from '../add-funding-source/add-funding-source.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { ExpenseTypeActionTypes } from '@main/views/admin-panel/store/actions/admin-expense-type.action';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-expense-type-list',
  templateUrl: './add-expense-type-list.component.html',
  styleUrls: ['./add-expense-type-list.component.scss']
})
export class AddExpenseTypeListComponent implements OnInit {

  public expenseTypeForm!: FormGroup;
  public categoryOptions: any[] = ["Travel", "Meals", "Entertainment"];
  expenseType$: any;
  private req: Subscription;
  loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddFundingSourceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminEmployeePosition: Store<AdminProfileState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.expenseType$ = this.adminEmployeePosition.pipe(select(state => state.expenseType));

    this.req =  this.expenseType$.subscribe((expenseType: any) => {
      this.loading = expenseType.pending;
      if(expenseType.success){
        this.snackBar.open("Successfully added new expense type", "", {
          duration: 4000,
          panelClass:'success-snackbar'
        });

        this.adminEmployeePosition.dispatch({
          type: ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_SUCCESS,
          payload: null
        }); 

        this.expenseTypeForm.reset()
      }

      if(expenseType.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.adminEmployeePosition.dispatch({
          type: ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE_FAIL,
          payload: null
        }); 
      }
    })

    this.expenseTypeForm = this.formBuilder.group({
      code: ['', [Validators.required]],
      category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.expenseTypeForm.valid){
      this.adminEmployeePosition.dispatch({
        type: ExpenseTypeActionTypes.SAVE_EXPENSE_TYPE,
        payload: this.expenseTypeForm.value
      });
    }
  }
}
