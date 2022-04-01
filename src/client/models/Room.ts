/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomType } from './RoomType';

export type Room = {
    name: string;
    color: string;
    building_id?: string;
    floor_id?: string;
    type?: RoomType;
    id: string;
};