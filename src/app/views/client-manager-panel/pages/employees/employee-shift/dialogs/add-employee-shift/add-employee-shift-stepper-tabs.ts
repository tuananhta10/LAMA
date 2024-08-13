
import { StepModel } from '@main/shared/components/stepper/model';
import { AddEmployeeStepperConstants } from './add-employee-shift-stepper-constants';

export const addEmployeeSteps: StepModel[] = [
    {
        step: 'Step 1',
        stepLabel: AddEmployeeStepperConstants.SERVICE_SCHEDULE_DETAIL,
        stepName: AddEmployeeStepperConstants.serviceScheduleDetail,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1,
        isStepValid: false
    }, {
        step: 'Step 2',
        stepLabel: AddEmployeeStepperConstants.HOURS,
        stepName: AddEmployeeStepperConstants.hours,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2,
        isStepValid: false
    }, {
        step: 'Step 3',
        stepLabel: AddEmployeeStepperConstants.SHIFT_LOCATION,
        stepName: AddEmployeeStepperConstants.shiftLocation,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3,
        isStepValid: false
    }, {
        step: 'Step 4',
        stepLabel: AddEmployeeStepperConstants.CLIENT_TOTAL,
        stepName: AddEmployeeStepperConstants.clientTotals,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 4,
        isStepValid: false
    }, {
        step: 'Step 5',
        stepLabel: AddEmployeeStepperConstants.TASK,
        stepName: AddEmployeeStepperConstants.task,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 5,
        isStepValid: false
    }

    /*, {
        step: 'Step 6',
        stepLabel: AddEmployeeStepperConstants.CLIENT_DETAIL,
        stepName: AddEmployeeStepperConstants.clientDetails,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 6
    }*/
];