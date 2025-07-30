import {Router} from "express";
import serviceFactory from "../services/serviceFactory";
import {validateToken} from "../middlewares/validateToken";
import {setResResult} from "../utils/requestUtils";
import {SetsIntegrationService} from "../services/setsIntegration.service";

export const useSetsIntegrationRoutes = () => {
  const router = Router();
  const setsIntegrationService = () => serviceFactory.getService(SetsIntegrationService);

  router.get("/setDetails/:id", validateToken, async (req, res) => {
    const result = await setsIntegrationService().getSetByCode(req.params.id);
    setResResult(res, result);
  });

  router.get("/setDetails/:id/price", validateToken, async (req, res) => {
    const result = await setsIntegrationService().getSetPricesByCode(req.params.id);
    setResResult(res, result);
  });

  return router;
};