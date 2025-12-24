const prisma = require("../prismaClient");

const getTransactionHistory = async (req, res) => {
  const userId = req.userId;

  try {
    const history = await prisma.auditLog.findMany({
      where: {
        OR: [
          { senderId: userId },
          { receiverId: userId }
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({ history });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

module.exports = { getTransactionHistory };
