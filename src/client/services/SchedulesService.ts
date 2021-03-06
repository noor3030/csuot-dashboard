/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ColorThemeType } from '../models/ColorThemeType';
import type { Directionality } from '../models/Directionality';
import type { ImageUrl } from '../models/ImageUrl';
import type { Language } from '../models/Language';
import type { ScheduleDetails } from '../models/ScheduleDetails';
import type { ScheduleSchemas } from '../models/ScheduleSchemas';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SchedulesService {

    /**
     * Read All Schedule
     * Retrieve all schedules data.
     * @returns ScheduleSchemas Successful Response
     * @throws ApiError
     */
    public static readAllSchedule(): CancelablePromise<ScheduleSchemas> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/schedule/all',
        });
    }

    /**
     * Read Schedule
     * Retrieve Single schedule.
     * @param stageId 
     * @param teacherId 
     * @param classroomId 
     * @param subjectId 
     * @returns ScheduleDetails Successful Response
     * @throws ApiError
     */
    public static readSchedule(
stageId?: string,
teacherId?: string,
classroomId?: string,
subjectId?: string,
): CancelablePromise<ScheduleDetails> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/schedule/',
            query: {
                'stage_id': stageId,
                'teacher_id': teacherId,
                'classroom_id': classroomId,
                'subject_id': subjectId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get Schedule Image Url
     * Download schedule Image.
     * @param stageId 
     * @param teacherId 
     * @param classroomId 
     * @param subjectId 
     * @param theme 
     * @param language 
     * @param directionality 
     * @returns ImageUrl Successful Response
     * @throws ApiError
     */
    public static getScheduleImageUrl(
stageId?: string,
teacherId?: string,
classroomId?: string,
subjectId?: string,
theme?: ColorThemeType,
language?: Language,
directionality?: Directionality,
): CancelablePromise<ImageUrl> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/schedule/image',
            query: {
                'stage_id': stageId,
                'teacher_id': teacherId,
                'classroom_id': classroomId,
                'subject_id': subjectId,
                'theme': theme,
                'language': language,
                'directionality': directionality,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}