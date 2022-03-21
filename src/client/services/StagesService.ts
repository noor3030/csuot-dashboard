/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging_Stage_ } from '../models/Paging_Stage_';
import type { Stage } from '../models/Stage';
import type { StageCreate } from '../models/StageCreate';
import type { StageUpdate } from '../models/StageUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class StagesService {

    /**
     * Read Stages
     * Retrieve stages.
     * @param branchId 
     * @param branchName 
     * @param skip 
     * @param limit 
     * @returns Paging_Stage_ Successful Response
     * @throws ApiError
     */
    public static readStagesV1StagesGet(
branchId?: string,
branchName?: string,
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Stage_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/stages/',
            query: {
                'branch_id': branchId,
                'branch_name': branchName,
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Stage
     * Create new stage.
     * @param requestBody 
     * @returns Stage Successful Response
     * @throws ApiError
     */
    public static createStageV1StagesPost(
requestBody: StageCreate,
): CancelablePromise<Stage> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/stages/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Stage
     * Get stage by ID.
     * @param id 
     * @returns Stage Successful Response
     * @throws ApiError
     */
    public static readStageV1StagesIdGet(
id: string,
): CancelablePromise<Stage> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/stages/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Stage
     * Update a stage.
     * @param id 
     * @param requestBody 
     * @returns Stage Successful Response
     * @throws ApiError
     */
    public static updateStageV1StagesIdPut(
id: string,
requestBody: StageUpdate,
): CancelablePromise<Stage> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/stages/{id}',
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
     * Delete Stage
     * Delete a stage.
     * @param id 
     * @returns Stage Successful Response
     * @throws ApiError
     */
    public static deleteStageV1StagesIdDelete(
id: string,
): CancelablePromise<Stage> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/stages/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}