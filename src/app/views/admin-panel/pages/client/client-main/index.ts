import { ClientListBannerComponent } from './components/client-list-banner/client-list-banner.component';
import { ClientListTableComponent } from './components/client-list-table/client-list-table.component';
import { ClientListFeedComponent } from './components/client-list-feed/client-list-feed.component';
import { ClientMainComponent } from './client-main.component';
import { EditColumnDialogComponent } from './dialogs/edit-column-dialog/edit-column-dialog.component';
import { DeleteRowDialogComponent } from './dialogs/delete-row-dialog/delete-row-dialog.component';
import { ModifyBannerImageDialog } from './dialogs/modify-banner-image-dialog/modify-banner-image-dialog.component';
import { ClientListSimpleDetailDialogComponent } from './dialogs/client-list-simple-detail-dialog/client-list-simple-detail-dialog.component';

export const components: any[] = [
    ClientListBannerComponent,
    ClientListTableComponent,
    ClientListFeedComponent,
    ClientMainComponent,
    EditColumnDialogComponent,
    DeleteRowDialogComponent,
    ModifyBannerImageDialog,
    ClientListSimpleDetailDialogComponent
];

export * from './components/client-list-banner/client-list-banner.component';
export * from './components/client-list-table/client-list-table.component';
export * from './components/client-list-feed/client-list-feed.component';
export * from './client-main.component';