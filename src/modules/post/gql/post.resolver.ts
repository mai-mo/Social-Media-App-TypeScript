import { postService, PostService } from "../post.service";
import { GQLValidation } from "../../../middleware";
import { PaginateDto, paginationValidationSchema } from "../../../common/validation";
import { IAuthUser } from "../../../common/types/express.types";
import { reactOnPostGQl } from "../post.validation";
import { ReactOnPostArgsDto } from "../post.dto";

export class PostResolver {
    private postService: PostService;

    constructor() {
        this.postService = postService;
    }

    postList = async (parent: unknown, args: PaginateDto, { user, decoded }: IAuthUser) => {
        await GQLValidation<PaginateDto>(paginationValidationSchema.query, args)
        const data = await this.postService.postList(args, user);
        return { message: "Done", data };
    }

    reactOnPost = async (parent: unknown, { postId, react }: ReactOnPostArgsDto, { user }: IAuthUser) => {
        await GQLValidation<ReactOnPostArgsDto>(reactOnPostGQl, { postId, react })
        const data = await this.postService.reactPost({ postId }, { react }, user)
        return { message: 'Done', data }
    }
}

export const postResolver = new PostResolver();