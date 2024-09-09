import { Router } from "express";
import AuthRoutes from "./authRoutes.js";
// import ClashRoutes from "./clashRoutes.js";
// import VerifyRoutes from "./verifyRoutes.js";
const router = Router();

router.use("/api", AuthRoutes);
// router.use("/api/auth", AuthRoutes);
// router.use("/api/verify", VerifyRoutes));

export default router;
