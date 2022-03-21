/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClassroomSchedule } from './ClassroomSchedule';
import type { Stage } from './Stage';
import type { SubjectSchedule } from './SubjectSchedule';
import type { TeacherSchedule } from './TeacherSchedule';

export type LessonScheduleDetails = {
    subject_id?: string;
    teacher_id?: string;
    room_id?: string;
    id: string;
    stages: Array<Stage>;
    teacher?: TeacherSchedule;
    subject: SubjectSchedule;
    room?: ClassroomSchedule;
};