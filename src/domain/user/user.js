export default class User {
  constructor({id, nickName}) {
    this.id = id;
    this.nickName = nickName;
    this.relations = [];
  }

  set id(id) {
    if (!id) {
      throw new Error('Field id cannot be empty');
    }

    this._id = parseInt(id);
  }

  get id() {
    return this._id;
  }

  set nickName(nickName) {
    if (!nickName) {
      throw new Error('Field nickName cannot be empty');
    }

    this._nickName = nickName;
  }

  get nickName() {
    return this._nickName;
  }

  addRelationShip(user) {
    this.relations.push(user);
  }
}
