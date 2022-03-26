/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Paging_Room_ } from '../models/Paging_Room_';
import type { Room } from '../models/Room';
import type { RoomCreate } from '../models/RoomCreate';
import type { RoomUpdate } from '../models/RoomUpdate';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class RoomsService {

    /**
     * Read Rooms
     * Retrieve rooms.
     * @param page 
     * @param perPage 
     * @returns Paging_Room_ Successful Response
     * @throws ApiError
     */
    public static readRooms(
page: number = 1,
perPage: number = 15,
): CancelablePromise<Paging_Room_> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rooms/',
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
     * Create Room
     * Create new room.
     * @param requestBody 
     * @returns Room Successful Response
     * @throws ApiError
     */
    public static createRoom(
requestBody: RoomCreate,
): CancelablePromise<Room> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/rooms/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Read Room
     * Get room by ID.
     * @param id 
     * @returns Room Successful Response
     * @throws ApiError
     */
    public static readRoom(
id: string,
): CancelablePromise<Room> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/rooms/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Room
     * Update a room.
     * @param id 
     * @param requestBody 
     * @returns Room Successful Response
     * @throws ApiError
     */
    public static updateRoom(
id: string,
requestBody: RoomUpdate,
): CancelablePromise<Room> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/rooms/{id}',
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
     * Delete Room
     * Delete a room.
     * @param id 
     * @returns Room Successful Response
     * @throws ApiError
     */
    public static deleteRoom(
id: string,
): CancelablePromise<Room> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/rooms/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

}