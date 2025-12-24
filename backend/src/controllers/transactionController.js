const prisma = require("../prismaClient");

const transferFunds = async (req, res) => {
  const senderId = req.userId;
  const { receiverId, amount } = req.body;

  if (!receiverId || !amount || amount <= 0) {
    return res.status(400).json({ message: "Invalid transfer details" });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      const sender = await tx.user.findUnique({
        where: { id: senderId }
      });

      if (!sender || sender.balance < amount) {
        throw new Error("Insufficient balance");
      }

      const receiver = await tx.user.findUnique({
        where: { id: receiverId }
      });

      if (!receiver) {
        throw new Error("Receiver not found");
      }

      const updatedSender = await tx.user.update({
        where: { id: senderId },
        data: { balance: sender.balance - amount }
      });

      const updatedReceiver = await tx.user.update({
        where: { id: receiverId },
        data: { balance: receiver.balance + amount }
      });

      const transaction = await tx.transaction.create({
        data: {
          senderId,
          receiverId,
          amount
        }
      });

      await tx.auditLog.create({
        data: {
          transactionId: transaction.id,
          senderId,
          receiverId,
          amount,
          status: "SUCCESS"
        }
      });

      return {
        senderBalance: updatedSender.balance,
        receiverBalance: updatedReceiver.balance
      };
    });

    res.json({
      message: "Transfer successful",
      balance: result.senderBalance
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { transferFunds };
