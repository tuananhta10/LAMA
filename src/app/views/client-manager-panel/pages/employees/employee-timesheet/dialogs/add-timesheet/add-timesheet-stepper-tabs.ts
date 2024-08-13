
import { StepModel } from '@main/shared/components/stepper/model';
import { AddTimesheetStepperConstant } from './add-timesheet-stepper-constant';

export const addEmployeeSteps: StepModel[] = [
    {
        step: 'Step 1',
        stepLabel: AddTimesheetStepperConstant.TIMESHEET_DETAILS,
        stepName: AddTimesheetStepperConstant.timesheetDetails,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1,
        isStepValid: false
    }, {
        step: 'Step 2',
        stepLabel: AddTimesheetStepperConstant.TIME_LOGGED,
        stepName: AddTimesheetStepperConstant.timeLogged,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 2,
        isStepValid: false
    }
];