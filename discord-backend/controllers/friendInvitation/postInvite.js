import FriendInvitation from '../../models/friendInvitation.js';
import User from '../../models/user.js';
import { updateFriendsPendingInvitations } from '../../socketHandlers/updates/friends.js';

export const postInvite = async (req, res) => {
  const { targetMailAddress } = req.body;
  const { userId, mail } = req.user;

  if (mail.toLowerCase() === targetMailAddress.toLowerCase()) {
    return res.status(409).send('cannot become friend with yourself');
  }

  const targetUser = await User.findOne({
    mail: targetMailAddress.toLowerCase(),
  });

  if (!targetUser) {
    return res.status(404).send(`${targetMailAddress} has not been found.`);
  }

  const invitationAlreadyReceived = await FriendInvitation.findOne({
    senderId: userId,
    receiverId: targetUser._id,
  });

  if (invitationAlreadyReceived) {
    return res.status(409).send(`${targetMailAddress} has been already sent.`);
  }

  const usersAlreadyFrineds = targetUser.friends.find(
    (friendsId) => friendsId.toString() === userId.toString(),
  );

  if (usersAlreadyFrineds) {
    return res.status(409).send(`${targetMailAddress} already added.`);
  }

  const newInvitation = await FriendInvitation.create({
    senderId: userId,
    receiverId: targetUser._id,
  });

  updateFriendsPendingInvitations(targetUser._id.toString());

  return res.status(201).send('Invitation has been sent');
};
