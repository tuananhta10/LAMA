import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
} from 'rxjs/operators';

import { 
  Actions, 
  ofType, 
  Effect, 
  createEffect 
} from '@ngrx/effects';

// import enum action types
import { GoalTemplateActionTypes } from '../actions/admin-goal-template.action';
import { GoalTemplateService } from '@main/shared/services/admin-panel/admin-goal-template.service';

@Injectable()
export class GoalTemplateEffect {
  constructor(
    private employeePositionService: GoalTemplateService,
    private actions$: Actions
  ) {}

  public getGoalTemplateList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.employeePositionService.getGoalTemplateListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: GoalTemplateActionTypes.GET_GOAL_TEMPLATE_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveGoalTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.saveGoalTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: GoalTemplateActionTypes.SAVE_GOAL_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editGoalTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.editGoalTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: GoalTemplateActionTypes.EDIT_GOAL_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteGoalTemplate = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.employeePositionService.deleteGoalTemplate(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: GoalTemplateActionTypes.DELETE_GOAL_TEMPLATE_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )
}
