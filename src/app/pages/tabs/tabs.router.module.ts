import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsPage } from './tabs.page';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';


const redirectUnauthorizedToLanding = redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'library',
       loadChildren: '../library/library.module#LibraryPageModule'
     },

     { path: 'users',
       children: [
         {
         path: '',
         loadChildren: '../users/users.module#UsersPageModule',
         ...canActivate(redirectUnauthorizedToLanding)
          },
         { path: ':id',
          loadChildren: '../user-details/user-details.module#UserDetailsPageModule',
          ...canActivate(redirectUnauthorizedToLanding)
         },
       ]
     },
     { path: 'maps',
      loadChildren: '../maps/maps.module#MapsPageModule'
     },
      {
       path: 'books',
       children: [
         {
           path: '',
           loadChildren: '../books/books.module#BooksPageModule'
         },
          { path: ':id',
           loadChildren: '../book-detail/book-detail.module#BookDetailPageModule',
           ...canActivate(redirectUnauthorizedToLanding)
         }
       ]
      },
      { path: 'signup',
       loadChildren: '../signup/signup.module#SignupPageModule'
     },

     { path: 'temsandconditions',
     loadChildren: '../temsandconditions/temsandconditions.module#TemsandconditionsPageModule' },

     { path: 'requests',
      loadChildren: '../requests/requests.module#RequestsPageModule',
      ...canActivate(redirectUnauthorizedToLanding)
     },
      { path: 'login',
       loadChildren: '../login/login.module#LoginPageModule'
     },

     { path: 'settings',
      loadChildren: '../settings/settings.module#SettingsPageModule'
     },

     { path: 'home',
      loadChildren: '../home/home.module#HomePageModule'
     },

     { path: 'newuser',
      loadChildren: '../newuser/newuser.module#NewuserPageModule',
      ...canActivate(redirectUnauthorizedToLanding)
     },

     { path: 'borrow-req',
      loadChildren: '../borrow-req/borrow-req.module#BorrowReqPageModule',
      ...canActivate(redirectUnauthorizedToLanding)
     },

     { path: 'user-req',
      loadChildren: '../user-req/user-req.module#UserReqPageModule',
      ...canActivate(redirectUnauthorizedToLanding)
     },

     { path: 'borrowedbooks',
       children:[
         {
         path: '',
         loadChildren: '../borrowedbooks/borrowedbooks.module#BorrowedbooksPageModule',
         ...canActivate(redirectUnauthorizedToLanding)
          },
         { path: ':id',
           loadChildren: '../borbks-detail/borbks-detail.module#BorbksDetailPageModule',
          ...canActivate(redirectUnauthorizedToLanding)
         },
       ]
     },
     { path: 'returnrequest',
      loadChildren: '../returnrequest/returnrequest.module#ReturnrequestPageModule',
      ...canActivate(redirectUnauthorizedToLanding)
    },

    { path: 'about',
     loadChildren: '../about/about.module#AboutPageModule' },

     { path: 'book-create',
      loadChildren: '../book-create/book-create.module#BookCreatePageModule',
      ...canActivate(redirectUnauthorizedToLanding)
     },
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
