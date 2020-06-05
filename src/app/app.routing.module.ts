import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo.detais.component';

const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },    
    {
        path: 'user/:userName',
        pathMatch: 'full',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        },
        data: {
            title: 'Timeline'
        }

    },
    { 
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard],
        data: {
            title: 'Add Photo'
        }
    },
    { 
        path: 'p/:photoId', 
        component: PhotoDetailsComponent,
        data: {
            title: 'Detail Photo'
        }
    },
    {
        path: 'not-found', 
        component: NotFoundComponent,
        data: {
            title: 'Not found'
        }
    },
    {
        path: '**',
        redirectTo: 'not-found'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: true})
    ],
    exports: [
        RouterModule
    ]

})

export class AppRoutingModule { 

}