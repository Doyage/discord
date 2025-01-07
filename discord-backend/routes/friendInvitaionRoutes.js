import { Router } from 'express';
import Joi from 'joi';
import { createValidator } from 'express-joi-validation';

// Controllers
import { verifyToken } from '../middlewares/auth.js';
import {
  postInvite,
  postAccept,
  postReject,
} from '../controllers/friendInvitation/friendInvitationController.js';

const validator = createValidator();
export const router = Router();

const postFriendInvitationsSchema = Joi.object({
  targetMailAddress: Joi.string().email().required(),
});

const InviteDecisionSchema = Joi.object({
  id: Joi.string().required(),
});

router.post(
  '/invite',
  verifyToken,
  validator.body(postFriendInvitationsSchema),
  postInvite,
);

router.post(
  '/accept',
  verifyToken,
  validator.body(InviteDecisionSchema),
  postAccept,
);

router.post(
  '/reject',
  verifyToken,
  validator.body(InviteDecisionSchema),
  postReject,
);
