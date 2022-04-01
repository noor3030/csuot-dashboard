/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserGender } from './UserGender';
import type { UserScrapeFrom } from './UserScrapeFrom';

export type UserCreateDB = {
    name: string;
    color: string;
    email?: string;
    uot_url?: string;
    image_url?: string;
    is_active?: boolean;
    gender?: UserGender;
    asc_job_title?: string;
    asc_name?: string;
    scrape_from?: UserScrapeFrom;
    role_id: string;
    password?: string;
};