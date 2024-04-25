import { Router } from "express";
import {
  checkArchitecture,
  getArchitectureComponents,
} from "../services/workbench";

import { checkConfigWithIteration } from "../services/iterations";

const router = Router();

router.post("/", async (req, res) => {
  const archDesc = await req.body.desc;
  if (!archDesc) {
    return res.json({
      error: "No description provided.",
    });
  }

  try {
    let components = await getArchitectureComponents(archDesc);
    components = components.replace("```json", "").replace("```", "");

    return res.json({
      components: JSON.parse(components),
    });
  } catch (e) {
    console.log(`Error: Processing architecture components\n\t ${e}`);
    return res.json({
      error: "Cannot process json.",
    });
  }
});

router.post("/suggest", async (req, res) => {
  const archDesc = await req.body.archDesc;
  const requirements = await req.body.requirements;
  const users = await req.body.users;

  if (!archDesc || !requirements || !users) {
    return res.json({
      error: "Architecture description, requirements or users empty.",
    });
  }

  let suggestions = await checkArchitecture(archDesc, requirements, users);

  return res.json({
    suggestions: suggestions,
  });
});

// Checks if updated architecture description fulfills the requirements of the feature description
router.post("/check", async (req, res) => {
  const archDesc = await req.body.desc;
  const iterationDesc = await req.body.iteration;

  if (!archDesc || !iterationDesc) {
    return res.json({
      error: "Architecture description or feature description empty.",
    });
  }

  let configValidity = await checkConfigWithIteration(archDesc, iterationDesc);

  return res.json({
    message: configValidity,
  });
});

export default router;
