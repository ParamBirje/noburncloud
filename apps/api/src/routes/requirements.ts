import { Router } from "express";
import { getRequirements } from "../services/workbench";

const router = Router();

router.get("/", async (req, res) => {
  const textData = await getRequirements();
  return res.json({
    text: textData,
  });
});

export default router;
