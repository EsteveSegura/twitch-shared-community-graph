import axios from 'axios';

async function getToken() {
  const config = {'Accept': 'application/vnd.twitchtv.v5+json'};
  // eslint-disable-next-line max-len
  const response = await axios.post(`https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=client_credentials`, null, {headers: config});

  return response.data;
}

async function getInfoAboutId(id) {
  const token = await getToken();
  const headers = {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': process.env.CLIENT_ID,
    'Authorization': `Bearer ${token.access_token}`,
  };

  const response = await axios.get(`https://api.twitch.tv/helix/channels?broadcaster_id=${id}`,
      {headers: headers});

  return response.data;
}

async function getFollower(id, cursor = null) {
  const headers = {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': process.env.CLIENT_ID,
    'Authorization': `Bearer ${await getToken().access_token}`,
  };

  // eslint-disable-next-line max-len
  const response = await axios.get(`https://api.twitch.tv/kraken/channels/${id}/follows?limit=100${!cursor ? '' : '&cursor=' + cursor}`,
      {headers: headers});

  return response.data;
}

async function getAllFollowers(id) {
  const allFollowers = [];
  let currentCursor = '';

  const getOneFollowerPage = await getFollower(id);
  currentCursor = getOneFollowerPage._cursor;

  // First page
  for (const followers of getOneFollowerPage.follows) {
    allFollowers.push(followers.user);
  }

  // The other pages
  for (let i = 0; i <= Math.floor((getOneFollowerPage._total / 100) - 1); i++) {
    const currentPage = await getFollower(id, currentCursor);

    for (const followers of currentPage.follows) {
      allFollowers.push(followers.user);
    }

    currentCursor = currentPage._cursor;
  }

  const relationShipTo = await getInfoAboutId(id);
  return {followers: allFollowers, streamer: relationShipTo.data[0].broadcaster_name, id: id};
}

export {getAllFollowers};
