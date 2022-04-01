/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Permissions } from './Permissions';

export type Role = {
    name: string;
    enum?: string;
    permissions: Permissions;
    id: string;
};