/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_login_access_token_v1_auth_login_access_token_post } from '../models/Body_login_access_token_v1_auth_login_access_token_post';
import type { Body_reset_password_v1_auth_reset_password__post } from '../models/Body_reset_password_v1_auth_reset_password__post';
import type { Message } from '../models/Message';
import type { Role } from '../models/Role';
import type { Token } from '../models/Token';
import type { User } from '../models/User';
import type { UserCreate } from '../models/UserCreate';

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
    public static loginAccessTokenV1AuthLoginAccessTokenPost(
formData: Body_login_access_token_v1_auth_login_access_token_post,
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
    public static signUpV1AuthSignupPost(
requestBody: UserCreate,
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
     * Test Token
     * Test access token
     * @returns User Successful Response
     * @throws ApiError
     */
    public static testTokenV1AuthLoginTestJsonTokenPost(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/auth/login/test.json-token',
        });
    }

    /**
     * My Permissions
     * Return my permissions
     * @returns Role Successful Response
     * @throws ApiError
     */
    public static myPermissionsV1AuthPermissionsGet(): CancelablePromise<Role> {
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
    public static resetPasswordV1AuthResetPasswordPost(
requestBody: Body_reset_password_v1_auth_reset_password__post,
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