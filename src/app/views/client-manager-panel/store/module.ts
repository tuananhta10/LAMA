import { NgModule, ModuleWithProviders } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// import services or api files here as well
import { ClientManagerEffect } from './effects/client-manager.effects';
import { ClientManagerReducer } from './reducers/client-manager.reducers';


@NgModule({
    imports: [
        StoreModule.forFeature('clientManager', ClientManagerReducer), // clients
        EffectsModule.forFeature([
            ClientManagerEffect,
        ])
    ],
    providers: [
        // services/injectables
    ]
})

export class ClientManagerPublicModule {
    public static forRoot(): ModuleWithProviders<ClientManagerPublicModule> {
        return {
            ngModule: ClientManagerPublicModule,
            providers: [
                //services/injectables
            ]
        }
    }
}