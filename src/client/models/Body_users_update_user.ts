/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { UserGender } from "./UserGender";

export type Body_users_update_user = {
    image?: Blob;
    job_titles?: Array<string>;
    name: string;
    color: string;
    email?: string;
    password?: string;
    uot_url?: string;
    gender?: UserGender;
    role_id: string;
};