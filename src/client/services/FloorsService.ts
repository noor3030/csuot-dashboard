/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Floor } from '../models/Floor';
import type { FloorCreate } from '../models/FloorCreate';
import type { FloorUpdate } from '../models/FloorUpdate';
import type { Paging_Floor_ } from '../models/Paging_Floor_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class FloorsService {

    /**
     * Read Floors
     * Retrieve floors.
     * @param skip 
     * @param limit 
     * @returns Paging_Floor_ Successful Response
     * @throws ApiError
     */
    public static readFloors(
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Floor_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/floors/',
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
     * Create Floor
     * Create new floor.
     * @param requestBody 
     * @returns Floor Successful Response
     * @throws ApiError
     */
    public static createFloor(
requestBody: FloorCreate,
): CancelablePromise<Floor> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/floors/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Floor
     * Get floor by ID.
     * @param id 
     * @returns Floor Successful Response
     * @throws ApiError
     */
    public static readFloor(
id: string,
): CancelablePromise<Floor> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/floors/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Floor
     * Update a floor.
     * @param id 
     * @param requestBody 
     * @returns Floor Successful Response
     * @throws ApiError
     */
    public static updateFloor(
id: string,
requestBody: FloorUpdate,
): CancelablePromise<Floor> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/floors/{id}',
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
     * Delete Floor
     * Delete a floor.
     * @param id 
     * @returns Floor Successful Response
     * @throws ApiError
     */
    public static deleteFloor(
id: string,
): CancelablePromise<Floor> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/floors/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}