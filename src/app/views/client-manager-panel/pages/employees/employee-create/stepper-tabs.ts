import { StepModel } from '../../../../../shared/components/stepper/model';
import { EmployeeConstants } from '../constants';

export const steps: StepModel[] = [
    {
        step: EmployeeConstants.STEP_1,
        stepLabel: EmployeeConstants.EMPLOYEE_DETAILS,
        stepName: EmployeeConstants.employeeDetails,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        step: EmployeeConstants.STEP_2,
        stepLabel: EmployeeConstants.PROFILE_DETAILS,
        stepName: EmployeeConstants.profileDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2
    }, {
        step: EmployeeConstants.STEP_3,
        stepLabel: EmployeeConstants.SERVICE_DETAILS,
        stepName: EmployeeConstants.serviceDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3
    }, {
        step: EmployeeConstants.STEP_4,
        stepLabel: EmployeeConstants.WORKDAYS,
        stepName: EmployeeConstants.workdays,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 4
    }, {
        step: EmployeeConstants.STEP_5,
        stepLabel: EmployeeConstants.CONTACT_DETAILS,
        stepName: EmployeeConstants.contactDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 5
    }, {
        step: EmployeeConstants.STEP_6,
        stepLabel: EmployeeConstants.RELATED_DOCUMENTS,
        stepName: EmployeeConstants.relatedDocuments,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 6
    }
];