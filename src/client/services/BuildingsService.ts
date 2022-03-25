/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Building } from '../models/Building';
import type { BuildingCreate } from '../models/BuildingCreate';
import type { BuildingUpdate } from '../models/BuildingUpdate';
import type { Paging_Building_ } from '../models/Paging_Building_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BuildingsService {

    /**
     * Read Buildings
     * Retrieve buildings.
     * @param skip 
     * @param limit 
     * @returns Paging_Building_ Successful Response
     * @throws ApiError
     */
    public static readBuildings(
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Building_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildings/',
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
     * Create Building
     * Create new building.
     * @param requestBody 
     * @returns Building Successful Response
     * @throws ApiError
     */
    public static createBuilding(
requestBody: BuildingCreate,
): CancelablePromise<Building> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/buildings/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Building
     * Get building by ID.
     * @param id 
     * @returns Building Successful Response
     * @throws ApiError
     */
    public static readBuilding(
id: string,
): CancelablePromise<Building> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/buildings/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Building
     * Update a building.
     * @param id 
     * @param requestBody 
     * @returns Building Successful Response
     * @throws ApiError
     */
    public static updateBuilding(
id: string,
requestBody: BuildingUpdate,
): CancelablePromise<Building> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/buildings/{id}',
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
     * Delete Building
     * Delete a building.
     * @param id 
     * @returns Building Successful Response
     * @throws ApiError
     */
    public static deleteBuilding(
id: string,
): CancelablePromise<Building> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/buildings/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}