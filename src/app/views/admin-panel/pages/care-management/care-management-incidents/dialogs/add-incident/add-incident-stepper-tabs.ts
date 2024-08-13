
import { StepModel } from '@main/shared/components/stepper/model';
import { AddIncidentStepperConstants } from './add-incident-stepper-constant';

export const addIncidentSteps: StepModel[] = [
    {
        step: AddIncidentStepperConstants.STEP_1,
        stepLabel: AddIncidentStepperConstants.GENERAL,
        stepName: AddIncidentStepperConstants.generalDetails,
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        step: AddIncidentStepperConstants.STEP_2,
        stepLabel: AddIncidentStepperConstants.DETAILS_OF_INCIDENTS,
        stepName: AddIncidentStepperConstants.detailsOfIncident,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2
    }, 
    {
        step: AddIncidentStepperConstants.STEP_3,
        stepLabel: AddIncidentStepperConstants.NOTIFICATIONS,
        stepName: AddIncidentStepperConstants.notifications,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3
    }, 
    {
        step: AddIncidentStepperConstants.STEP_4,
        stepLabel: AddIncidentStepperConstants.ACTIONS_TAKEN,
        stepName: AddIncidentStepperConstants.actionsTaken,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 4
    }, 
];