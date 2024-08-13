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
import { SkillsActionTypes } from '../actions/admin-skills.action';
import { AdminSkillsService } from '@main/shared/services/admin-panel/admin-skills.service';

@Injectable()
export class SkillsEffect {
  constructor(
    private skillsService: AdminSkillsService,
    private actions$: Actions
  ) {}

  public getSkillsList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(SkillsActionTypes.GET_SKILLS_LIST),
      // switch to a new observable and cancel previous subscription
      switchMap((data:any) => {
        return this.skillsService.getSkillsListData()
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: SkillsActionTypes.GET_SKILLS_LIST_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: SkillsActionTypes.GET_SKILLS_LIST_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public saveSkills = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(SkillsActionTypes.SAVE_SKILLS),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.skillsService.saveSkills(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: SkillsActionTypes.SAVE_SKILLS_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: SkillsActionTypes.SAVE_SKILLS_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public editSkills = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(SkillsActionTypes.EDIT_SKILLS),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.skillsService.editSkills(data?.payload)
          .pipe(
            // return payload
            map((result: any) => {
              return {
                type: SkillsActionTypes.EDIT_SKILLS_SUCCESS,
                payload: result
              };
            }),
            catchError((error: any) =>
              // error handler
              of({
                type: SkillsActionTypes.EDIT_SKILLS_FAIL,
                payload: error,
              }),
            ),
          );
      }),
    ),
  )

  public deleteSkills = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(SkillsActionTypes.DELETE_SKILLS),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.skillsService.deleteSkills(data?.payload)
        .pipe(
          // return payload
          map((result: any) => {
            return {
              type: SkillsActionTypes.DELETE_SKILLS_SUCCESS,
              payload: result
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: SkillsActionTypes.DELETE_SKILLS_FAIL,
              payload: error,
            }),
          ),
        );
    }),
  ),
)
}
