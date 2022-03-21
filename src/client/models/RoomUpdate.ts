/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RoomType } from './RoomType';

export type RoomUpdate = {
    name?: string;
    color?: string;
    color_light?: string;
    color_dark?: string;
    building_id?: string;
    floor_id?: string;
    type?: RoomType;
};