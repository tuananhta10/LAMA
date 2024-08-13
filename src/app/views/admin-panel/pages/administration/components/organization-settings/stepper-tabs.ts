import { StepModel } from '@app-shared/components/stepper/model';
import { StepperConstants } from './stepper-constants';

export const steps: StepModel[] = [
    {
        step: StepperConstants.PART_A,
        stepLabel: StepperConstants.OVERVIEW,
        stepName: StepperConstants.overview,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        step: StepperConstants.PART_B,
        stepLabel: StepperConstants.UNDERSTANDING_YOUR_NEEDS,
        stepName: StepperConstants.understandingYourNeeds,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2
    }, {
        step: StepperConstants.PART_C,
        stepLabel: StepperConstants.SAFETY_INFORMATION,
        stepName: StepperConstants.safetyInformation,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3
    }, {
        step: StepperConstants.PART_D,
        stepLabel: StepperConstants.FINANCE_AND_LEGAL,
        stepName: StepperConstants.financeAndLegal,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 4
    },
];