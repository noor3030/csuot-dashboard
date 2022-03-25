/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScheduleType } from './ScheduleType';

export type TelegramUser = {
    id: string;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_blocked?: boolean;
    nickname?: string;
    my_schedule?: string;
    schedule_type?: ScheduleType;
};