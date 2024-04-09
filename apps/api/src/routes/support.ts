import { Router } from "express";
import { getChatSupportResponse } from "../services/workbench";

const router = Router();

router.post("/", async (req, res) => {
  const { latestMsg, history } = req.body;

  const response = await getChatSupportResponse(latestMsg, history);
  return res.json({ text: response });
});

export default router;
