/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_seed_db_v1_asc__post } from '../models/Body_seed_db_v1_asc__post';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AscService {

    /**
     * Seed Db
     * @param formData 
     * @returns any Successful Response
     * @throws ApiError
     */
    public static seedDbV1AscPost(
formData: Body_seed_db_v1_asc__post,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/asc/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}