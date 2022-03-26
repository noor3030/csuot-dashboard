/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { app__schemas__job_title__JobTitle } from '../models/app__schemas__job_title__JobTitle';
import type { JobTitleCreate } from '../models/JobTitleCreate';
import type { JobTitleUpdate } from '../models/JobTitleUpdate';
import type { Paging_JobTitle_ } from '../models/Paging_JobTitle_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class JobTitlesService {

    /**
     * Read Job Titles
     * Retrieve job_titles.
     * @param page 
     * @param perPage 
     * @returns Paging_JobTitle_ Successful Response
     * @throws ApiError
     */
    public static readJobTitles(
page: number = 1,
perPage: number = 15,
): CancelablePromise<Paging_JobTitle_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/job_titles/',
            query: {
                'page': page,
                'per_page': perPage,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Job Title
     * Create new job_title.
     * @param requestBody 
     * @returns app__schemas__job_title__JobTitle Successful Response
     * @throws ApiError
     */
    public static createJobTitle(
requestBody: JobTitleCreate,
): CancelablePromise<app__schemas__job_title__JobTitle> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/job_titles/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Job Title
     * Get job_title by ID.
     * @param id 
     * @returns app__schemas__job_title__JobTitle Successful Response
     * @throws ApiError
     */
    public static readJobTitle(
id: string,
): CancelablePromise<app__schemas__job_title__JobTitle> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/job_titles/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Job Title
     * Update a job_title.
     * @param id 
     * @param requestBody 
     * @returns app__schemas__job_title__JobTitle Successful Response
     * @throws ApiError
     */
    public static updateJobTitle(
id: string,
requestBody: JobTitleUpdate,
): CancelablePromise<app__schemas__job_title__JobTitle> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/job_titles/{id}',
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
     * Delete Job Title
     * Delete a job_title.
     * @param id 
     * @returns app__schemas__job_title__JobTitle Successful Response
     * @throws ApiError
     */
    public static deleteJobTitle(
id: string,
): CancelablePromise<app__schemas__job_title__JobTitle> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/job_titles/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}