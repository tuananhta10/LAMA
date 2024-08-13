import { EmployeeMainComponent } from './employee-main.component';
import { EmployeeListBannerComponent } from './components/employee-list-banner/employee-list-banner.component';
import { EmployeeListFeedComponent } from './components/employee-list-feed/employee-list-feed.component';
import { EmployeeListTableComponent } from './components/employee-list-table/employee-list-table.component';
import { EmployeeListSimpleDetailDialogComponent } from './dialogs/employee-list-simple-detail-dialog/employee-list-simple-detail-dialog.component';
import { DeleteRowDialogComponent } from './dialogs/delete-row-dialog/delete-row-dialog.component';
import { EditColumnDialogComponent } from './dialogs/edit-column-dialog/edit-column-dialog.component';
import { ModifyBannerImageDialog } from './dialogs/modify-banner-image-dialog/modify-banner-image-dialog.component';

export const components: any[] = [
    EmployeeMainComponent,
    EmployeeListBannerComponent,
    EmployeeListFeedComponent,
    EmployeeListTableComponent,
    EmployeeListSimpleDetailDialogComponent,
    DeleteRowDialogComponent,
    EditColumnDialogComponent,
    ModifyBannerImageDialog,
];

export * from './components/employee-list-banner/employee-list-banner.component';
export * from './components/employee-list-table/employee-list-table.component';
export * from './components/employee-list-feed/employee-list-feed.component';
export * from './employee-main.component';