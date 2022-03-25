/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_asc_seed_db } from '../models/Body_asc_seed_db';

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
    public static seedDb(
formData: Body_asc_seed_db,
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