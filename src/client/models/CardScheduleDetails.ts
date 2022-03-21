/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { LessonScheduleDetails } from './LessonScheduleDetails';

export type CardScheduleDetails = {
    period_id: string;
    day_id: string;
    lesson_id: string;
    lesson: LessonScheduleDetails;
};