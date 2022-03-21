/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { BuildingSchedule } from './BuildingSchedule';
import type { CardSchedule } from './CardSchedule';
import type { ClassroomSchedule } from './ClassroomSchedule';
import type { DaySchedule } from './DaySchedule';
import type { FloorSchedule } from './FloorSchedule';
import type { LessonScheduleSchemas } from './LessonScheduleSchemas';
import type { PeriodSchedule } from './PeriodSchedule';
import type { Stage } from './Stage';
import type { SubjectSchedule } from './SubjectSchedule';
import type { TeacherSchedule } from './TeacherSchedule';

export type ScheduleSchemas = {
    days: Array<DaySchedule>;
    periods: Array<PeriodSchedule>;
    cards: Array<CardSchedule>;
    buildings: Array<BuildingSchedule>;
    floors: Array<FloorSchedule>;
    classrooms: Array<ClassroomSchedule>;
    subjects: Array<SubjectSchedule>;
    teachers: Array<TeacherSchedule>;
    stages: Array<Stage>;
    lessons: Array<LessonScheduleSchemas>;
};