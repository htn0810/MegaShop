import { http } from '@/utils/interceptor'

export class ConversationApi {
  public static async getConversation() {
    return http.get(`/conversations/`)
  }

  public static createConversation(otherUserId: number) {
    return http.post(`/conversations/`, { otherUserId })
  }
}
