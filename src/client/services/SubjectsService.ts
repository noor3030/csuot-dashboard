/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging_Subject_ } from '../models/Paging_Subject_';
import type { Subject } from '../models/Subject';
import type { SubjectCreate } from '../models/SubjectCreate';
import type { SubjectUpdate } from '../models/SubjectUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class SubjectsService {

    /**
     * Read Subjects
     * Retrieve subjects.
     * @param skip 
     * @param limit 
     * @returns Paging_Subject_ Successful Response
     * @throws ApiError
     */
    public static readSubjects(
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Subject_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subjects/',
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
     * Create Subject
     * Create new subject.
     * @param requestBody 
     * @returns Subject Successful Response
     * @throws ApiError
     */
    public static createSubject(
requestBody: SubjectCreate,
): CancelablePromise<Subject> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/subjects/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Subject
     * Get subject by ID.
     * @param id 
     * @returns Subject Successful Response
     * @throws ApiError
     */
    public static readSubject(
id: string,
): CancelablePromise<Subject> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/subjects/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Subject
     * Update a subject.
     * @param id 
     * @param requestBody 
     * @returns Subject Successful Response
     * @throws ApiError
     */
    public static updateSubject(
id: string,
requestBody: SubjectUpdate,
): CancelablePromise<Subject> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/subjects/{id}',
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
     * Delete Subject
     * Delete a subject.
     * @param id 
     * @returns Subject Successful Response
     * @throws ApiError
     */
    public static deleteSubject(
id: string,
): CancelablePromise<Subject> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/subjects/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}