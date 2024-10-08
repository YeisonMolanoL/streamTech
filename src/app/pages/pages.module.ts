import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NbActionsModule, NbAlertModule, NbDatepickerModule, NbAutocompleteModule, NbBadgeModule, NbButtonModule, NbContextMenuModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSearchModule, NbSelectModule, NbSidebarModule, NbSpinnerModule, NbTagModule, NbThemeModule, NbTooltipModule, NbUserModule } from '@nebular/theme';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { PlattformsComponent } from './plattforms/plattforms.component';
import { CardInfoComponent } from '../components/card-info/card-info.component';
import { AccountComponent } from './account/account.component';
import { SellByProfileComponent } from './sales/sell-by-profile/sell-by-profile.component';
import { SellByAccountComponent } from './sales/sell-by-account/sell-by-account.component';
import { AccountListComponent } from '../components/account-list/account-list.component';
import { YesNoPipelinePipe } from '../core/yes-no-pipeline.pipe';
import { SellByComboComponent } from './sales/sell-by-combo/sell-by-combo.component';
import { AccountSaleListComponent } from './sales/sell-by-account/account-sale-list/account-sale-list.component';
import { SellProfileListComponent } from './sales/sell-by-profile/sell-profile-list/sell-profile-list.component';
import { DialogConfirmationComponent } from '../components/dialog-confirmation/dialog-confirmation.component';
import { CreateClientComponent } from '../components/create-client/create-client.component';
import { EditAccountDataModalComponent } from '../components/edit-account-data-modal/edit-account-data-modal.component';
import { ConnectionComponent } from './connection/connection.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [PagesComponent, HeaderComponent, PlattformsComponent,
    CardInfoComponent,AccountComponent, SellByProfileComponent,
    SellByAccountComponent, YesNoPipelinePipe, AccountListComponent,
    SellByComboComponent, AccountSaleListComponent, SellProfileListComponent,
    DialogConfirmationComponent, CreateClientComponent, HeaderComponent, EditAccountDataModalComponent, ConnectionComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbMenuModule,
    NbThemeModule,
    NbAlertModule,
    NbLayoutModule,
    NbActionsModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbLayoutModule,
    NbMenuModule,
    NbUserModule,
    NbActionsModule,
    NbSearchModule,
    NbSidebarModule,
    NbContextMenuModule,
    NbButtonModule,
    NbIconModule,
    NbEvaIconsModule,
    NbInputModule,
    NbTooltipModule,
    NbAutocompleteModule,
    NbBadgeModule,
    NbTagModule,
    NbSpinnerModule,
    NbAlertModule,
    FormsModule,
    NbDatepickerModule,
    ComponentsModule
  ],
  exports: [YesNoPipelinePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule {}
