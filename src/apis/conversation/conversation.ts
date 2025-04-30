import { http } from '@/utils/interceptor'

export class ConversationApi {
  public static async getConversation() {
    return http.get(`/conversations`)
  }

  public static async getConversationByUserId(userId: number) {
    return http.get(`/conversations/user/${userId}`)
  }

  public static createConversation(otherUserId: number) {
    return http.post(`/conversations/`, { otherUserId })
  }
}
