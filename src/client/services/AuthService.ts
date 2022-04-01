/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_auth_login_access_token } from '../models/Body_auth_login_access_token';
import type { Body_auth_reset_password } from '../models/Body_auth_reset_password';
import type { Message } from '../models/Message';
import type { Role } from '../models/Role';
import type { Token } from '../models/Token';
import type { UserCreateDB } from '../models/UserCreateDB';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AuthService {

    /**
     * Login Access Token
     * OAuth2 compatible token login, get an access token for future requests
     * @param formData 
     * @returns Token Successful Response
     * @throws ApiError
     */
    public static loginAccessToken(
formData: Body_auth_login_access_token,
): CancelablePromise<Token> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/login/access-token',
            formData: formData,
            mediaType: 'application/x-www-form-urlencoded',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Sign Up
     * User create new account, get an access token for future requests
     * @param requestBody 
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static signUp(
requestBody: UserCreateDB,
): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Get My Permissions
     * Return my permissions
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static getMyPermissions(): CancelablePromise<Role> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/auth/permissions/',
        });
    }

    /**
     * Reset Password
     * Reset password
     * @param requestBody 
     * @returns Message Successful Response
     * @throws ApiError
     */
    public static resetPassword(
requestBody: Body_auth_reset_password,
): CancelablePromise<Message> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/reset-password/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}