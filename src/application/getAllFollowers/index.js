import {getAllFollowers as getAllFollowersService} from '../../infrastructure/serivce/twitch';
import User from '../../domain/user/user';

async function getAllFollowers(id) {
  const getAllFollowersReponse = await getAllFollowersService(id);
  const streamerRelated = new User({id: getAllFollowersReponse.id, nickName: getAllFollowersReponse.streamer});

  const users = getAllFollowersReponse.followers.map((user) => {
    const userDomain = new User({id: user._id, nickName: user.display_name});
    userDomain.addRelationShip(streamerRelated);

    return userDomain;
  });

  users.push(new User({id: id, nickName: getAllFollowersReponse.streamer}));

  return users;
}

export {getAllFollowers};
