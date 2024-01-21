import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { TestpageComponent } from './testpage/testpage.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { LoginComponent } from './pages/auth-page/login/login.component';
import { RegisterComponent } from './pages/auth-page/register/register.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PendingComponent } from './pages/components/pending/pending.component';
import { OnlineComponent } from './pages/components/online/online.component';
import { AllComponent } from './pages/components/all/all.component';
import { AddFriendComponent } from './pages/components/add-friend/add-friend.component';

export const routes: Routes = [
    {
        path: "", component: MainPageComponent, canActivate: [AuthGuard], children: [
            { path: "", component: OnlineComponent },
            { path: "pending", component: PendingComponent },
            { path: "all", component: AllComponent },
            { path: "add-friend", component: AddFriendComponent }
        ]
    },
    {
        path: "auth", component: AuthPageComponent, children: [
            { path: "login", component: LoginComponent },
            { path: "register", component: RegisterComponent }
        ]
    }
];
