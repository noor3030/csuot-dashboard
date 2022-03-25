/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { app__schemas__branch__Branch } from '../models/app__schemas__branch__Branch';
import type { BranchCreate } from '../models/BranchCreate';
import type { BranchUpdate } from '../models/BranchUpdate';
import type { Paging_Branch_ } from '../models/Paging_Branch_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BranchesService {

    /**
     * Read Branches
     * Retrieve branches.
     * @param skip 
     * @param limit 
     * @returns Paging_Branch_ Successful Response
     * @throws ApiError
     */
    public static readBranches(
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Branch_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/branches/',
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
     * Create Branch
     * Create new branch.
     * @param requestBody 
     * @returns app__schemas__branch__Branch Successful Response
     * @throws ApiError
     */
    public static createBranch(
requestBody: BranchCreate,
): CancelablePromise<app__schemas__branch__Branch> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/branches/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Branch
     * Get branch by ID.
     * @param id 
     * @returns app__schemas__branch__Branch Successful Response
     * @throws ApiError
     */
    public static readBranch(
id: string,
): CancelablePromise<app__schemas__branch__Branch> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/branches/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Branch
     * Update a branch.
     * @param id 
     * @param requestBody 
     * @returns app__schemas__branch__Branch Successful Response
     * @throws ApiError
     */
    public static updateBranch(
id: string,
requestBody: BranchUpdate,
): CancelablePromise<app__schemas__branch__Branch> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/branches/{id}',
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
     * Delete Branch
     * Delete a branch.
     * @param id 
     * @returns app__schemas__branch__Branch Successful Response
     * @throws ApiError
     */
    public static deleteBranch(
id: string,
): CancelablePromise<app__schemas__branch__Branch> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/branches/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}