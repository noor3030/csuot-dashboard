/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Department } from '../models/Department';
import type { DepartmentCreate } from '../models/DepartmentCreate';
import type { DepartmentUpdate } from '../models/DepartmentUpdate';
import type { Paging_Department_ } from '../models/Paging_Department_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DepartmentsService {

    /**
     * Read Departments
     * Retrieve departments.
     * @param page 
     * @param perPage 
     * @returns Paging_Department_ Successful Response
     * @throws ApiError
     */
    public static readDepartments(
page: number = 1,
perPage: number = 15,
): CancelablePromise<Paging_Department_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/departments/',
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
     * Create Department
     * Create new department.
     * @param requestBody 
     * @returns Department Successful Response
     * @throws ApiError
     */
    public static createDepartment(
requestBody: DepartmentCreate,
): CancelablePromise<Department> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/departments/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Department
     * Get department by ID.
     * @param id 
     * @returns Department Successful Response
     * @throws ApiError
     */
    public static readDepartment(
id: string,
): CancelablePromise<Department> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/departments/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Department
     * Update a department.
     * @param id 
     * @param requestBody 
     * @returns Department Successful Response
     * @throws ApiError
     */
    public static updateDepartment(
id: string,
requestBody: DepartmentUpdate,
): CancelablePromise<Department> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/departments/{id}',
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
     * Delete Department
     * Delete a department.
     * @param id 
     * @returns Department Successful Response
     * @throws ApiError
     */
    public static deleteDepartment(
id: string,
): CancelablePromise<Department> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/departments/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}