/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CardScheduleDetails } from './CardScheduleDetails';
import type { DaySchedule } from './DaySchedule';
import type { PeriodSchedule } from './PeriodSchedule';
import type { Rights } from './Rights';
import type { ScheduleInformation } from './ScheduleInformation';
import type { Stage } from './Stage';

export type ScheduleDetails = {
    stage?: Stage;
    information: ScheduleInformation;
    rights?: Rights;
    cards: Array<CardScheduleDetails>;
    days: Array<DaySchedule>;
    periods: Array<PeriodSchedule>;
};