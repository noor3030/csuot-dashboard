/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollageShifts } from './CollageShifts';

export type StageCreate = {
    name: string;
    shift?: CollageShifts;
    level?: number;
    branch_id?: string;
};