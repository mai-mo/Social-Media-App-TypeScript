import type { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import { authentication } from '../../middleware/authentication.middleware';
import { cloudFileUpload } from '../../common/utils/multer';
import { fileFieldValidation } from '../../common/utils/multer/validation.multer';
import { successResponse } from '../../common/response';
import * as validators from './comment.validation';
import { validation } from '../../middleware';
import { commentService } from './comment.service';
import { CreateCommentParamsDto, CreateReplyOnCommentParamsDto } from './comment.dto';
import { IComment } from '../../common/interfaces';
const router = Router({mergeParams: true})

// const router = Router();

router.post(
    '/',
    authentication(),
    cloudFileUpload({ validation: fileFieldValidation.image }).array("attachments", 2),
    validation(validators.createComment),
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const data = await commentService.createComment(req.params as CreateCommentParamsDto, { ...req.body, files: req.files }, req.user)
        return successResponse<IComment>({ res, status: 201, data })
    }
)

router.post(
    '/:commentId/reply',
    authentication(),
    cloudFileUpload({ validation: fileFieldValidation.image }).array("attachments", 2),
    validation(validators.replyOnComment),
    async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        const data = await commentService.replayOnComment(req.params as CreateReplyOnCommentParamsDto, { ...req.body, files: req.files }, req.user)
        return successResponse<IComment>({ res, status: 201, data })
    }
)

export default router