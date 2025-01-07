import FriendInvitation from '../../models/friendInvitation.js';
import User from '../../models/user.js';
import {
  updateFriends,
  updateFriendsPendingInvitations,
} from '../../socketHandlers/updates/friends.js';

export const postAccept = async (req, res) => {
  try {
    const { id } = req.body;

    const invitation = await FriendInvitation.findById(id);

    if (!invitation) {
      return res.status(401).send('Error occured.');
    }

    const { senderId, receiverId } = invitation;

    const senderUser = await User.findById(senderId);
    senderUser.friends = [...senderUser.friends, receiverId];

    const receiverUser = await User.findById(receiverId);
    receiverUser.friends = [...receiverUser.friends, senderId];

    await senderUser.save();
    await receiverUser.save();

    await FriendInvitation.findByIdAndDelete(id);

    updateFriends(senderId.toString());
    updateFriends(receiverId.toString());

    updateFriendsPendingInvitations(receiverId.toString());

    return res.status(200).send('Friend successfully added.');
  } catch (error) {
    console.error('postAccept', error);
    return res.status(500).send('Something went wrong');
  }
};
