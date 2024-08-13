# Lama Web Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4.


## Project Description

LAMA software is an efficient and intelligent simple to use operation system built from
the ground up by leaders in the field who are operating an existing NDIS support
company and with the vision to share with other NDIS providers in the community
who are providing disability services.

A tool is no good if it’s not intuitive or produces the right report to help you run your
business and most of all right price as you grow your business. LAMA simplifies the
processes of managing your participants, the rostering of employees, and the delivery
and funding of services to the participant.

LAMA takes the guesswork out of pricing, scheduling, and invoicing of services,
rostering staff and managing compliance, the calculation of correct staff entitlements,
controlling document access and tracking communication between client and staff.
We have built the software with business owners and users experience in mind, the
software allows the business to achieve a competitive advantage by leveraging data
that is collected on a daily basis, to thus provide insight into your operations.

## tsconfig.json Path reference

```
"paths": {
    "@main/*": ["src/app/*"],
    "@environments/*": ["src/environments/*"], // ENV file
    "@app-shared/*": ["src/app/shared/*"], // shared folder
    "@app-services/*": ["src/app/shared/services/*"], // shared services
    "@app-admin-guard/*": ["src/app/shared/guards/*"], // admin panel guard
    "@app-admin-store": ["src/app/views/admin-panel/store"], // admin ngrx store
    "@app-admin-store/*": ["src/app/views/admin-panel/store/*"], // admin ngrx store
    "@app-main-interceptor": ["src/app/shared/interceptor/set-auth-interceptor"], // http interceptor
    "@app-main-animation": ["src/app/shared/animations/main-animations.ts"], // main animation
}
```
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
