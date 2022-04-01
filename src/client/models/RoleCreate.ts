/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Permissions } from './Permissions';

export type RoleCreate = {
    name: string;
    enum?: string;
    permissions: Permissions;
};