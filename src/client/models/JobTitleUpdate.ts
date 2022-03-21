/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UserType } from './UserType';

export type JobTitleUpdate = {
    name: string;
    en_name?: string;
    type?: UserType;
};