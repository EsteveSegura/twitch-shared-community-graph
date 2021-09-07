// ToDo: Use functional programming for replace the for loops
function adjacencyList(arr) {
  const fullList = [];

  for (const userFollowers of arr) {
    for (const user of userFollowers) {
      const alreadyIn = fullList.find((el) => el.id == user.id);

      if (alreadyIn) {
        alreadyIn.addRelationShip(user.relations[0]);
      }

      if (!alreadyIn) {
        fullList.push(user);
      }
    }
  }

  return fullList;
}

export {adjacencyList};
