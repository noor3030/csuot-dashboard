/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserType } from './UserType';

export type JobTitleCreate = {
    name: string;
    en_name?: string;
    type?: UserType;
};