/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging_Role_ } from '../models/Paging_Role_';
import type { Role } from '../models/Role';
import type { RoleCreate } from '../models/RoleCreate';
import type { RoleUpdate } from '../models/RoleUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RolesService {

    /**
     * Read Roles
     * Retrieve roles.
     * @param skip 
     * @param limit 
     * @returns Paging_Role_ Successful Response
     * @throws ApiError
     */
    public static readRoles(
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_Role_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/roles/',
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
     * Create Role
     * Create new role.
     * @param requestBody 
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static createRole(
requestBody: RoleCreate,
): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/roles/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Role
     * Get role by ID.
     * @param id 
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static readRole(
id: string,
): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Role
     * Update a role.
     * @param id 
     * @param requestBody 
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static updateRole(
id: string,
requestBody: RoleUpdate,
): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/roles/{id}',
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
     * Delete Role
     * Delete a role.
     * @param id 
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static deleteRole(
id: string,
): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/roles/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}