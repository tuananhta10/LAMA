import { StepModel } from '@app-shared/components/stepper/model';

export const steps: StepModel[] = [
    {
        step: "Step 1",
        stepLabel: "Partner Details",
        stepName: "partner-details",
        isStepperIcon: false,
        isStepperBullets: true,
        stepIndex: 1
    }, {
        step: "Step 2",
        stepLabel: "Tasks",
        stepName: "tasks",
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 2
    }, {
        step: "Step 3",
        stepLabel: "Travel",
        stepName: "travel",
        isStepperIcon: true,
        isStepperBullets: true,
        stepIndex: 3
    }, {
        step: "Step 4",
        stepLabel: "Next Review",
        stepName: "next-review",
        isStepperIcon: true,
        isStepperBullets: false,
        stepIndex: 4
    }
];