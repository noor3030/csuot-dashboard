/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PermissionGroup } from './PermissionGroup';

export type Permissions = {
    users: PermissionGroup;
    roles: PermissionGroup;
    periods: PermissionGroup;
    job_titles: PermissionGroup;
    departments: PermissionGroup;
    branches: PermissionGroup;
    days: PermissionGroup;
    stages: PermissionGroup;
    buildings: PermissionGroup;
    rooms: PermissionGroup;
    floors: PermissionGroup;
    subjects: PermissionGroup;
    lessons: PermissionGroup;
    cards: PermissionGroup;
};