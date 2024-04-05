import { Router } from "express";
import { getArchitectureComponents } from "../services/workbench";
import { log } from "@repo/logger";

const router = Router();

router.put("/", async (req, res) => {
  const archDesc = req.body.desc;

  try {
    let components = await getArchitectureComponents(archDesc);
    components = components.replace("```json", "").replace("```", "");

    return res.json({
      components: JSON.parse(components),
    });
  } catch (e) {
    log(`Error: Processing architecture components\n\t ${e}`);
    return res.json({
      error: "Cannot process json.",
    });
  }
});

export default router;
