import {getAllFollowers} from '../../../application/getAllFollowers/';

import User from '../../../domain/user/user';
import {getAllFollowers as getAllFollowersMock} from '../../../infrastructure/serivce/twitch';
jest.mock('../../../infrastructure/serivce/twitch');

describe('getAllFollowers', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test('Sucessfull call service', async () => {
    getAllFollowersMock.mockReturnValue({
      id: '11111', streamer: 'Me_quede_virolo', followers: [
        {
          display_name: 'Virolo_follower',
          _id: 22222,
        },
      ],
    });

    const streamerResponse = new User({
      id: 11111,
      nickName: 'Me_quede_virolo',
      relations: [],
    });

    const followerResponse = new User({
      id: 22222,
      nickName: 'Virolo_follower',
    });
    followerResponse.addRelationShip(streamerResponse);

    const expectedResponse = [
      followerResponse,
      streamerResponse,
    ];

    const res = await getAllFollowers(11111);
    expect(res).toEqual(expectedResponse);
    expect(getAllFollowersMock).toHaveBeenCalledTimes(1);
    expect(getAllFollowersMock).toHaveBeenCalledWith(11111);
  });
});
