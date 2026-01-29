import { type UserIdResolvable } from '@twurple/common';
import { type HelixPollData } from '../../interfaces/endpoints/poll.external.js';
import { type HelixCreatePollData } from '../../interfaces/endpoints/poll.input.js';
import { HelixPaginatedRequest } from '../../utils/pagination/HelixPaginatedRequest.js';
import { type HelixPaginatedResult } from '../../utils/pagination/HelixPaginatedResult.js';
import { type HelixForwardPagination } from '../../utils/pagination/HelixPagination.js';
import { BaseApi } from '../BaseApi.js';
import { HelixPoll } from './HelixPoll.js';
/**
 * The Helix API methods that deal with polls.
 *
 * Can be accessed using `client.polls` on an {@link ApiClient} instance.
 *
 * ## Example
 * ```ts
 * const api = new ApiClient({ authProvider });
 * const { data: polls } = await api.helix.polls.getPolls('61369223');
 * ```
 *
 * @meta category helix
 * @meta categorizedTitle Polls
 */
export declare class HelixPollApi extends BaseApi {
    /**
     * Gets a list of polls for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get polls for.
     * @param pagination
     *
     * @expandParams
     */
    getPolls(broadcaster: UserIdResolvable, pagination?: HelixForwardPagination): Promise<HelixPaginatedResult<HelixPoll>>;
    /**
     * Creates a paginator for polls for the given broadcaster.
     *
     * @param broadcaster The broadcaster to get polls for.
     */
    getPollsPaginated(broadcaster: UserIdResolvable): HelixPaginatedRequest<HelixPollData, HelixPoll>;
    /**
     * Gets polls by IDs.
     *
     * @param broadcaster The broadcaster to get the polls for.
     * @param ids The IDs of the polls.
     */
    getPollsByIds(broadcaster: UserIdResolvable, ids: string[]): Promise<HelixPoll[]>;
    /**
     * Gets a poll by ID.
     *
     * @param broadcaster The broadcaster to get the poll for.
     * @param id The ID of the poll.
     */
    getPollById(broadcaster: UserIdResolvable, id: string): Promise<HelixPoll | null>;
    /**
     * Creates a new poll.
     *
     * @param broadcaster The broadcaster to create the poll for.
     * @param data
     *
     * @expandParams
     */
    createPoll(broadcaster: UserIdResolvable, data: HelixCreatePollData): Promise<HelixPoll>;
    /**
     * Ends a poll.
     *
     * @param broadcaster The broadcaster to end the poll for.
     * @param id The ID of the poll to end.
     * @param showResult Whether to allow the result to be viewed publicly.
     */
    endPoll(broadcaster: UserIdResolvable, id: string, showResult?: boolean): Promise<HelixPoll>;
}
//# sourceMappingURL=HelixPollApi.d.ts.map