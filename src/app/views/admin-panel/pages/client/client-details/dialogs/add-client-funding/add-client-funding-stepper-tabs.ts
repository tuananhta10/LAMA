
import { StepModel } from '@main/shared/components/stepper/model';
import { AddClientFundingStepperConstants } from './add-client-funding-stepper-constant';

export const addClientFundingSteps: StepModel[] = [
    {
        step: 'Step 1',
        stepLabel: AddClientFundingStepperConstants.CLIENT_FUNDING_DETAILS,
        stepName: AddClientFundingStepperConstants.clientFundingDetails,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1,
        isStepValid: false
    }, {
        step: 'Step 2',
        stepLabel: AddClientFundingStepperConstants.FUNDING_BUDGET,
        stepName: AddClientFundingStepperConstants.fundingBudget,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 2,
        isStepValid: false
    }
    /*, {
        step: 'Step 6',
        stepLabel: AddClientFundingStepperConstants.CLIENT_DETAIL,
        stepName: AddClientFundingStepperConstants.clientDetails,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 6
    }*/
];