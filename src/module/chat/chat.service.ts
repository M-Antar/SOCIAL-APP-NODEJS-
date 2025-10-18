import { Request, Response } from "express";
import { ChatRepository } from "../../DB/model/chat/chat.repository";

class ChatService {
  private readonly chatRepository = new ChatRepository();

  getChat = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const userLoginId = req.user?._id;

    const chat = await this.chatRepository.getOne({
      users: { $all: [userId, userLoginId] },
    },{},{populate:"messages"});

    return res.json({
      message: 'done',
      success: true,
      data: { chat },
    });
  };
}

export default new ChatService()
