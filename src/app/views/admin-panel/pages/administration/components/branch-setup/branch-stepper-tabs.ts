
import { StepModel } from '@main/shared/components/stepper/model';
import { BranchStepperConstants } from './branch-stepper-constants';

export const branchSteps: StepModel[] = [
    {
        stepLabel: BranchStepperConstants.BRANCHES_DETAILS,
        stepName: BranchStepperConstants.branchesDetails,
        isStepperIcon: false,
        isStepperBullets: true,
        isStepValid: false,
        stepIndex: 1
    }, {
        stepLabel: BranchStepperConstants.TRAVEL_AND_INVOICE_SETUP,
        stepName: BranchStepperConstants.travelAndInvoiceSetup,
        isStepperIcon: true,
        isStepperBullets: true,
        isStepValid: false,
        stepIndex: 2
    }, 

    /*{
        stepLabel: BranchStepperConstants.SUPPORT_WORKER_APP,
        stepName: BranchStepperConstants.supportWorkerApp,
        isStepperIcon: true,
        isStepperBullets: true,
        isStepValid: false,
        stepIndex: 3
    }, {
        stepLabel: BranchStepperConstants.PORTAL_AND_CLIENT_APP,
        stepName: BranchStepperConstants.portalAndClientApp,
        isStepperIcon: true,
        isStepperBullets: true,
        isStepValid: false,
        stepIndex: 4
    },*/

    {
        stepLabel: BranchStepperConstants.ADDRESS,
        stepName: BranchStepperConstants.address,
        isStepperIcon: true,
        isStepperBullets: true,
        isStepValid: false,
        stepIndex: 3
    }, {
        stepLabel: BranchStepperConstants.CONTACT_AND_LETTER_HEAD,
        stepName: BranchStepperConstants.contactAndLetterHead,
        isStepperIcon: true,
        isStepperBullets: false,
        isStepValid: false,
        stepIndex: 4
    }
];