/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Permissions } from './Permissions';

export type RoleCreate = {
    ar_name: string;
    en_name: string;
    permissions: Permissions;
};