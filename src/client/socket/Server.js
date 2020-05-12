export default class Server {
  constructor(serverSocket) {
    this._socket = serverSocket;
  }

  // ###########################################################################
  //  public
  // ###########################################################################

  // async createRoom(roomName) {
    
  // }

  async getMap(mapName) {
    const mapData = await this._getData('map', mapName);
    return mapData;
  }

  // ###########################################################################
  //  private
  // ###########################################################################

  /**
   * @param {string} dataName 
   */
  async _getData(dataName, props) {
    const call = new Promise((resolve, reject) => {
      this._socket.emit(`getRequest`, dataName, props);
      this._socket.on(`getResponse.${dataName}`, (data) => {
        resolve(data);
      });
    });

    const result = await call;
    return result;
  }
}