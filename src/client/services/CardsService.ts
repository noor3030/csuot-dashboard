/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Card } from '../models/Card';
import type { CardCreate } from '../models/CardCreate';
import type { CardUpdate } from '../models/CardUpdate';
import type { Paging_Card_ } from '../models/Paging_Card_';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class CardsService {

    /**
     * Read Cards
     * Retrieve cards.
     * @param page 
     * @param perPage 
     * @returns Paging_Card_ Successful Response
     * @throws ApiError
     */
    public static readCards(
page: number = 1,
perPage: number = 15,
): CancelablePromise<Paging_Card_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/cards/',
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
     * Create Card
     * Create new card.
     * @param requestBody 
     * @returns Card Successful Response
     * @throws ApiError
     */
    public static createCard(
requestBody: CardCreate,
): CancelablePromise<Card> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/cards/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Card
     * Get card by ID.
     * @param id 
     * @returns Card Successful Response
     * @throws ApiError
     */
    public static readCard(
id: string,
): CancelablePromise<Card> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/cards/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Card
     * Update a card.
     * @param id 
     * @param requestBody 
     * @returns Card Successful Response
     * @throws ApiError
     */
    public static updateCard(
id: string,
requestBody: CardUpdate,
): CancelablePromise<Card> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/cards/{id}',
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
     * Delete Card
     * Delete a card.
     * @param id 
     * @returns Card Successful Response
     * @throws ApiError
     */
    public static deleteCard(
id: string,
): CancelablePromise<Card> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/cards/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}