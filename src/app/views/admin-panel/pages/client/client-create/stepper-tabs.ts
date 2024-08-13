import { StepModel } from '../../../../../shared/components/stepper/model';
import { ClientConstants } from '../constants';

export const steps: StepModel[] = [
    {
        step: ClientConstants.STEP_1,
        stepLabel: ClientConstants.CLIENT_DETAILS,
        stepName: ClientConstants.clientDetails,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1,
        isStepValid: false
    },

    {
        step: ClientConstants.STEP_1A,
        stepLabel: ClientConstants.DEMOGRAPHICS,
        stepName: ClientConstants.demographics,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2,
        isStepValid: false
    }, 

    /*{
        step: ClientConstants.STEP_1B,
        stepLabel: ClientConstants.INTAKE,
        stepName: ClientConstants.intake,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3,
        isStepValid: false
    }, */

    {
        step: ClientConstants.STEP_2A,
        stepLabel: ClientConstants.ONBOARDING_NOTES,
        stepName: ClientConstants.onboardingNotes,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3,
        isStepValid: true
    }, 

    /*{
        step: ClientConstants.STEP_2B,
        stepLabel: ClientConstants.CAREWORKERS,
        stepName: ClientConstants.careWorkers,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 5,
        isStepValid: true
    },*/

    {
        step: ClientConstants.STEP_2C,
        stepLabel: ClientConstants.MEDICATION_AND_CLIENT_NOTES,
        stepName: ClientConstants.medicationClientNotes,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 4,
        isStepValid: true
    },

    {
        step: ClientConstants.STEP_3,
        stepLabel: ClientConstants.SERVICE_DETAILS,
        stepName: ClientConstants.serviceDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 5
    }, 

    {
        step: ClientConstants.STEP_4,
        stepLabel: ClientConstants.CONTACT_DETAILS,
        stepName: ClientConstants.contactDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 6,
        isStepValid: false
    }, 

    {
        step: ClientConstants.STEP_5,
        stepLabel: ClientConstants.RELATED_DOCUMENTS,
        stepName: ClientConstants.relatedDocuments,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 7,
        isStepValid: true
    }
];