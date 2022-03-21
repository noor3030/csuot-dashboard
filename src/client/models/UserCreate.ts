/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserGender } from './UserGender';
import type { UserScrapeFrom } from './UserScrapeFrom';

export type UserCreate = {
    name?: string;
    color?: string;
    color_light?: string;
    color_dark?: string;
    en_name?: string;
    email?: string;
    uot_url?: string;
    image?: string;
    is_active?: boolean;
    gender?: UserGender;
    asc_job_title?: string;
    asc_name?: string;
    scrape_from?: UserScrapeFrom;
    role_id?: string;
    password?: string;
};