/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging_Period_ } from '../models/Paging_Period_';
import type { Period } from '../models/Period';
import type { PeriodCreate } from '../models/PeriodCreate';
import type { PeriodUpdate } from '../models/PeriodUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PeriodsService {

    /**
     * Read Periods
     * Retrieve periods.
     * @param skip 
     * @param limit 
     * @returns Paging_Period_ Successful Response
     * @throws ApiError
     */
    public static readPeriodsV1PeriodsGet(
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Period_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/periods/',
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
     * Create Period
     * Create new period.
     * @param requestBody 
     * @returns Period Successful Response
     * @throws ApiError
     */
    public static createPeriodV1PeriodsPost(
requestBody: PeriodCreate,
): CancelablePromise<Period> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/periods/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Period
     * Get period by ID.
     * @param id 
     * @returns Period Successful Response
     * @throws ApiError
     */
    public static readPeriodV1PeriodsIdGet(
id: string,
): CancelablePromise<Period> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/periods/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Period
     * Update a period.
     * @param id 
     * @param requestBody 
     * @returns Period Successful Response
     * @throws ApiError
     */
    public static updatePeriodV1PeriodsIdPut(
id: string,
requestBody: PeriodUpdate,
): CancelablePromise<Period> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/periods/{id}',
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
     * Delete Period
     * Delete a period.
     * @param id 
     * @returns Period Successful Response
     * @throws ApiError
     */
    public static deletePeriodV1PeriodsIdDelete(
id: string,
): CancelablePromise<Period> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/periods/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}