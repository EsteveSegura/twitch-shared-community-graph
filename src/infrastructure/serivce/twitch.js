import axios from 'axios';

async function getToken() {
  const config = {'Accept': 'application/vnd.twitchtv.v5+json'};
  // eslint-disable-next-line max-len
  const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, null, {headers: config});
  
  return response.data;
}

async function getInfoAboutId(id) {
  const {access_token} = await getToken();
  const headers = {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': process.env.TWITCH_CLIENT_ID,
    'Authorization': `Bearer ${access_token}`,
  };

  const response = await axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
      {headers: headers});
  
  return response.data;
}

async function getFollower(id, cursor = null) {
  const {access_token} = await getToken();
  const headers = {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': process.env.TWITCH_CLIENT_ID,
    'Authorization': `Bearer ${access_token}`,
  };

  // eslint-disable-next-line max-len
  const response = await axios.get(`https://api.twitch.tv/helix/users/follows?to_id=${id}&first=100${!cursor ? '' : '&after=' + cursor}`,
      {headers});

  return response.data;
}

async function getAllFollowers(id) {
  const allFollowers = [];
  let currentCursor = '';

  const getOneFollowerPage = await getFollower(id);
  currentCursor = getOneFollowerPage.pagination.cursor;

  // First page
  for (const followers of getOneFollowerPage.data) {
    allFollowers.push({
      id: followers.from_id,
      nickName: followers.from_login
    });
  }

  // The other pages
  for (let i = 0; i <= Math.floor((getOneFollowerPage.total / 100) - 1); i++) {
    const currentPage = await getFollower(id, currentCursor);

    for (const followers of currentPage.data) {
      allFollowers.push({
        id: followers.from_id,
        nickName: followers.from_login
      });
    }

    currentCursor = currentPage.pagination.cursor;
  }

  const relationShipTo = await getInfoAboutId(id);
  return {followers: allFollowers, streamer: relationShipTo.data[0].broadcaster_name, id: id};
}

export {getAllFollowers};
