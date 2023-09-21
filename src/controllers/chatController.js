class ChatController {
  constructor(chatModel) {
    this.chatModel = chatModel
  }
  async createChat(chatData) {}
  async saveMessage(chatId, messageData) {}
  async getAllMessages(chatId) {}
  async deleteChat(chatId) {}
}
module.exports = ChatController
