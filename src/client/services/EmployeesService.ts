/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging_User_ } from '../models/Paging_User_';
import type { StaffType } from '../models/StaffType';
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';
import type { UserUpdate } from '../models/UserUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class EmployeesService {

    /**
     * Read Users
     * Retrieve users.
     * @param query 
     * @param roleId 
     * @param userType 
     * @param skip 
     * @param limit 
     * @returns Paging_User_ Successful Response
     * @throws ApiError
     */
    public static readUsersV1UsersGet(
query?: string,
roleId?: string,
userType?: Array<StaffType>,
skip?: number,
limit: number = 50,
): CancelablePromise<Paging_User_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/',
            query: {
                'query': query,
                'role_id': roleId,
                'user_type': userType,
                'skip': skip,
                'limit': limit,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create User
     * Create new user.
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static createUserV1UsersPost(
requestBody: UserCreate,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/users/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read User
     * Get user by ID.
     * @param id 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static readUserV1UsersIdGet(
id: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update User
     * Update a user.
     * @param id 
     * @param requestBody 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static updateUserV1UsersIdPut(
id: string,
requestBody: UserUpdate,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/users/{id}',
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
     * Delete User
     * Delete a user.
     * @param id 
     * @returns User Successful Response
     * @throws ApiError
     */
    public static deleteUserV1UsersIdDelete(
id: string,
): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/users/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}