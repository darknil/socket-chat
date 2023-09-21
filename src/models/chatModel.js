class ChatModel {
  async createChat(chatId, chatName) {}
  async saveMessage(chatId, userId, content) {}
  async getChatById(chatId) {}
  async getMessagesByChat(chatId) {}
  async getChatUsers(userId) {}
  async addUserToChat(chatId, userId) {}
  async removeUserFromChat(chatId, userId) {}
  async deleteChat(chatId) {}
}
module.exports = new ChatModel()
