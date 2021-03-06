import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { UsersComponent } from "./users/users.component";
import { UserComponent } from "./users/user/user.component";
import { ServersComponent } from "./servers/servers.component";
import { ServerComponent } from "./servers/server/server.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/canDeactivateGuard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

//appRoutes is the property holding the routing declarations
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'users', component: UsersComponent, children: [
            { path: ':id/:name', component: UserComponent }
        ]
    },
    {
        path: 'servers',
        //canActivate: [AuthGuard], // only works for the specified route
        canActivateChild: [AuthGuard], // applies to all child routes. 
        component: ServersComponent, children: [
            { path: ':id', component: ServerComponent, resolve: { server: ServerResolver } },
            { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
        ]
    },
    { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!!!' } },
    { path: '**', redirectTo: '/not-found' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, { useHash: true }) // Here appRoutes must be specified to make angular know about the routing info.
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }