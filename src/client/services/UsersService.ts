/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Body_users_create_user } from "../models/Body_users_create_user";
import type { Body_users_update_user } from "../models/Body_users_update_user";
import type { Message } from "../models/Message";
import type { Paging_User_ } from "../models/Paging_User_";
import type { StaffType } from "../models/StaffType";
import type { User } from "../models/User";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class UsersService {
  /**
   * Read Users
   * Retrieve users.
   * @param searchQuery
   * @param roleId
   * @param userTypes
   * @param jobTitles
   * @param page
   * @param perPage
   * @returns Paging_User_ Successful Response
   * @throws ApiError
   */
  public static readUsers(
    searchQuery?: string,
    roleId?: string,
    userTypes?: Array<StaffType>,
    jobTitles?: Array<string>,
    page: number = 1,
    perPage: number = 15
  ): CancelablePromise<Paging_User_> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/users/",
      query: {
        search_query: searchQuery,
        role_id: roleId,
        user_types: userTypes,
        job_titles: jobTitles,
        page: page,
        per_page: perPage,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Create User
   * Create new user.
   * @param formData
   * @returns User Successful Response
   * @throws ApiError
   */
  public static createUser(
    formData: Body_users_create_user
  ): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/v1/users/",
      formData: formData,
      mediaType: "multipart/form-data",
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
  public static readUser(id: string): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/v1/users/{id}",
      path: {
        id: id,
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
   * @param formData
   * @returns User Successful Response
   * @throws ApiError
   */
  public static updateUser(
    id: string,
    formData: Body_users_update_user
  ): CancelablePromise<User> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/v1/users/{id}",
      path: {
        id: id,
      },
      formData: formData,
      mediaType: "multipart/form-data",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Delete User
   * Delete a user.
   * @param id
   * @returns Message Successful Response
   * @throws ApiError
   */
  public static deleteUser(id: string): CancelablePromise<Message> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/v1/users/{id}",
      path: {
        id: id,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
