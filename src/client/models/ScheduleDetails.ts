/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardScheduleDetails } from './CardScheduleDetails';
import type { DaySchedule } from './DaySchedule';
import type { PeriodSchedule } from './PeriodSchedule';
import type { ScheduleDetailsItem } from './ScheduleDetailsItem';

export type ScheduleDetails = {
    item: ScheduleDetailsItem;
    cards: Array<CardScheduleDetails>;
    days: Array<DaySchedule>;
    periods: Array<PeriodSchedule>;
};