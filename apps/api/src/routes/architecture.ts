import { Router } from "express";

const router = Router();

router.put("/", async (req, res) => {
  return res.json({
    text: "",
  });
});

export default router;
