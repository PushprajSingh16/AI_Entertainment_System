/**
 * Chat History Manager - Handle localStorage operations for chat persistence
 */

const STORAGE_KEY = "chat_history";
const RECENT_CHATS_KEY = "recent_chats";

export const chatHistory = {
  // Save a complete conversation
  saveConversation: (id, messages, title) => {
    try {
      const history = chatHistory.getAllConversations();
      const conversation = {
        id,
        title: title || `Chat ${new Date().toLocaleDateString()}`,
        messages,
        timestamp: new Date().toISOString(),
        preview: messages.length > 0 ? messages[messages.length - 1].content.substring(0, 50) : "No messages",
      };
      history[id] = conversation;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      chatHistory.updateRecentChats(id, conversation.title);
      return conversation;
    } catch (error) {
      console.error("Failed to save conversation:", error);
    }
  },

  // Get all conversations
  getAllConversations: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error("Failed to retrieve conversations:", error);
      return {};
    }
  },

  // Get a specific conversation
  getConversation: (id) => {
    try {
      const history = chatHistory.getAllConversations();
      return history[id] || null;
    } catch (error) {
      console.error("Failed to retrieve conversation:", error);
      return null;
    }
  },

  // Delete a conversation
  deleteConversation: (id) => {
    try {
      const history = chatHistory.getAllConversations();
      delete history[id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
      chatHistory.removeFromRecentChats(id);
    } catch (error) {
      console.error("Failed to delete conversation:", error);
    }
  },

  // Update recent chats list (max 5)
  updateRecentChats: (id, title) => {
    try {
      const recents = chatHistory.getRecentChats();
      const updated = recents.filter((chat) => chat.id !== id);
      updated.unshift({ id, title, timestamp: new Date().toISOString() });
      localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(updated.slice(0, 5)));
    } catch (error) {
      console.error("Failed to update recent chats:", error);
    }
  },

  // Get recent chats
  getRecentChats: () => {
    try {
      const data = localStorage.getItem(RECENT_CHATS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to retrieve recent chats:", error);
      return [];
    }
  },

  // Remove from recent chats
  removeFromRecentChats: (id) => {
    try {
      const recents = chatHistory.getRecentChats();
      const updated = recents.filter((chat) => chat.id !== id);
      localStorage.setItem(RECENT_CHATS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to remove from recent chats:", error);
    }
  },

  // Clear all history
  clearAll: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(RECENT_CHATS_KEY);
    } catch (error) {
      console.error("Failed to clear history:", error);
    }
  },
};
