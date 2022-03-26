/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging_TelegramUser_ } from '../models/Paging_TelegramUser_';
import type { TelegramUser } from '../models/TelegramUser';
import type { TelegramUserCreate } from '../models/TelegramUserCreate';
import type { TelegramUserUpdate } from '../models/TelegramUserUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TelegramService {

    /**
     * Read Telegram Users
     * Retrieve telegram_users.
     * @param page 
     * @param perPage 
     * @returns Paging_TelegramUser_ Successful Response
     * @throws ApiError
     */
    public static readTelegramUsers(
page: number = 1,
perPage: number = 15,
): CancelablePromise<Paging_TelegramUser_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/telegram/',
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
     * Create Telegram User
     * Create new telegram_user.
     * @param requestBody 
     * @returns TelegramUser Successful Response
     * @throws ApiError
     */
    public static createTelegramUser(
requestBody: TelegramUserCreate,
): CancelablePromise<TelegramUser> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/telegram/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Telegram User
     * Get telegram_user by ID.
     * @param id 
     * @returns TelegramUser Successful Response
     * @throws ApiError
     */
    public static readTelegramUser(
id: string,
): CancelablePromise<TelegramUser> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/telegram/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Telegram User
     * Update a telegram_user.
     * @param id 
     * @param requestBody 
     * @returns TelegramUser Successful Response
     * @throws ApiError
     */
    public static updateTelegramUser(
id: string,
requestBody: TelegramUserUpdate,
): CancelablePromise<TelegramUser> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/telegram/{id}',
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
     * Delete Telegram User
     * Delete a telegram_user.
     * @param id 
     * @returns TelegramUser Successful Response
     * @throws ApiError
     */
    public static deleteTelegramUser(
id: string,
): CancelablePromise<TelegramUser> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/telegram/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}