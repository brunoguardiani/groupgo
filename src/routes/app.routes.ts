/* eslint-disable prettier/prettier */
import { Routes } from "@nestjs/core";
import { AuthModule } from "src/modules/auth/auth.module";
import { UserModule } from "src/modules/user/user.module";

export const routes: Routes = [
    {
        path: 'users',
        module: UserModule,
    },
    {
        path: 'auth',
        module: AuthModule
    }
]