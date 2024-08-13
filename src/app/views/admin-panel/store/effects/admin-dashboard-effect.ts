import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, ofType, Effect, createEffect } from '@ngrx/effects';

// import enum action types
import { DashboardActionTypes } from '../actions/admin-dashboard.action';
import { DashBoardService } from '@main/shared/services/admin-panel/admin-dashboard.services';

@Injectable()
export class DashboardEffect {
  constructor(
    private dashboardService: DashBoardService,
    private actions$: Actions
  ) {}

  public getStatisticList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(DashboardActionTypes.GET_DASHBOARD_STATISTIC),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.dashboardService.getStatistic(data.payload).pipe(
          // return payload
          map((result: any) => {
            return {
              type: DashboardActionTypes.GET_DASHBOARD_STATISTIC_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: DashboardActionTypes.GET_DASHBOARD_STATISTIC_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getLeavePeriodList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.dashboardService.GetLeavePeriod().pipe(
          // return payload
          map((result: any) => {
            return {
              type: DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: DashboardActionTypes.GET_DASHBOARD_LEAVE_PERIOD_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getIncidentList = createEffect(() =>
    this.actions$.pipe(
      // set type
      ofType(DashboardActionTypes.GET_DASHBOARD_INCIDENT),
      // switch to a new observable and cancel previous subscription
      switchMap((data: any) => {
        return this.dashboardService.GetIncident().pipe(
          // return payload
          map((result: any) => {
            return {
              type: DashboardActionTypes.GET_DASHBOARD_INCIDENT_SUCCESS,
              payload: result,
            };
          }),
          catchError((error: any) =>
            // error handler
            of({
              type: DashboardActionTypes.GET_DASHBOARD_INCIDENT_FAIL,
              payload: error,
            })
          )
        );
      })
    )
  );

  public getIntakeList = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_INTAKE),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.GetIntake().pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_INTAKE_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_INTAKE_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);

public getTaskList = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_TASK),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.GetTask(data.payload).pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_TASK_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_TASK_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);

public getEmployeeShiftList = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.GetEmployeeShift().pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_SHIFT_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);

public getReferralsList = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_REFERRALS),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.GetReferrals(data?.payload).pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_REFERRALS_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_REFERRALS_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);

public getClientSummary = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.getClientSummary().pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_CLIENT_SUMMARY_STATUS_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);

public getEmployeeLeaveStatusList = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.GetEmployeeLeaveStatus().pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_EMPLOYEE_LEAVE_STATUS_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);


public getIncidentMetrics = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.getIncidentMetrics().pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_INCIDENT_METRICS_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);

public getSWMetrics = createEffect(() =>
  this.actions$.pipe(
    // set type
    ofType(DashboardActionTypes.GET_DASHBOARD_SW_METRICS),
    // switch to a new observable and cancel previous subscription
    switchMap((data: any) => {
      return this.dashboardService.getSupportWorkerMetrics().pipe(
        // return payload
        map((result: any) => {
          return {
            type: DashboardActionTypes.GET_DASHBOARD_SW_METRICS_SUCCESS,
            payload: result,
          };
        }),
        catchError((error: any) =>
          // error handler
          of({
            type: DashboardActionTypes.GET_DASHBOARD_SW_METRICS_FAIL,
            payload: error,
          })
        )
      );
    })
  )
);

}
