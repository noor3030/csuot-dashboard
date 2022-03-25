/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type TelegramUserUpdate = {
    id: number;
    is_bot: boolean;
    first_name: string;
    last_name: string;
    username: string;
    language_code: string;
    is_blocked?: boolean;
};