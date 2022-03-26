/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Day } from '../models/Day';
import type { DayCreate } from '../models/DayCreate';
import type { DayUpdate } from '../models/DayUpdate';
import type { Paging_Day_ } from '../models/Paging_Day_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DaysService {

    /**
     * Read Days
     * Retrieve days.
     * @param page 
     * @param perPage 
     * @returns Paging_Day_ Successful Response
     * @throws ApiError
     */
    public static readDays(
page: number = 1,
perPage: number = 15,
): CancelablePromise<Paging_Day_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/days/',
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
     * Create Day
     * Create new day.
     * @param requestBody 
     * @returns Day Successful Response
     * @throws ApiError
     */
    public static createDay(
requestBody: DayCreate,
): CancelablePromise<Day> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/days/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Day
     * Get day by ID.
     * @param id 
     * @returns Day Successful Response
     * @throws ApiError
     */
    public static readDay(
id: string,
): CancelablePromise<Day> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/days/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Day
     * Update a day.
     * @param id 
     * @param requestBody 
     * @returns Day Successful Response
     * @throws ApiError
     */
    public static updateDay(
id: string,
requestBody: DayUpdate,
): CancelablePromise<Day> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/days/{id}',
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
     * Delete Day
     * Delete a day.
     * @param id 
     * @returns Day Successful Response
     * @throws ApiError
     */
    public static deleteDay(
id: string,
): CancelablePromise<Day> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/days/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}