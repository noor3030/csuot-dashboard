/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Lesson } from '../models/Lesson';
import type { LessonCreate } from '../models/LessonCreate';
import type { LessonUpdate } from '../models/LessonUpdate';
import type { Paging_Lesson_ } from '../models/Paging_Lesson_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonsService {

    /**
     * Read Lessons
     * Retrieve lessons.
     * @param skip 
     * @param limit 
     * @returns Paging_Lesson_ Successful Response
     * @throws ApiError
     */
    public static readLessonsV1LessonsGet(
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Lesson_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/lessons/',
            query: {
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Lesson
     * Create new lesson.
     * @param requestBody 
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static createLessonV1LessonsPost(
requestBody: LessonCreate,
): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/lessons/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Lesson
     * Get lesson by ID.
     * @param id 
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static readLessonV1LessonsIdGet(
id: string,
): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/lessons/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Lesson
     * Update a lesson.
     * @param id 
     * @param requestBody 
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static updateLessonV1LessonsIdPut(
id: string,
requestBody: LessonUpdate,
): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/lessons/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Delete Lesson
     * Delete a lesson.
     * @param id 
     * @returns Lesson Successful Response
     * @throws ApiError
     */
    public static deleteLessonV1LessonsIdDelete(
id: string,
): CancelablePromise<Lesson> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/lessons/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}