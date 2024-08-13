import { StepModel } from '@main/shared/components/stepper/model';
import { OrganizationConstants } from './organization-stepper-constants';

export const organizationSteps: StepModel[] = [
    {
        stepLabel: OrganizationConstants.ORGANIZATION_DETAILS,
        stepName: OrganizationConstants.organizationDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 1
    },

    {
        stepLabel: OrganizationConstants.CONTACT_DETAILS,
        stepName: OrganizationConstants.contactDetails,
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2
    },

    {
        stepLabel: OrganizationConstants.PLAN_MANAGEMENT_SETUP,
        stepName: OrganizationConstants.planManagementSetup,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 3
    }, 

    /*{
        stepLabel: OrganizationConstants.SUBSCRIPTION,
        stepName: OrganizationConstants.subscription,
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 4
    }, */
];