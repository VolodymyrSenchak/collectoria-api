import {Router} from "express";
import serviceFactory from "../services/serviceFactory";
import {validateToken} from "../middlewares/validateToken";
import {getUserId, setResResult} from "../utils/requestUtils";
import {CollectionsService} from "../services/collections.service";

export const useCollectionsRoutes = () => {
  const router = Router();
  const collectionsService = () => serviceFactory.getService(CollectionsService);

  router.get("/", validateToken, async (req, res) => {
    const result = await collectionsService().getCollections(getUserId(req));
    setResResult(res, result);
  });

  router.get("/:id", validateToken, async (req, res) => {
    const result = await collectionsService().getCollection(req.params.id, getUserId(req));
    setResResult(res, result);
  });

  router.post("/", validateToken, async (req, res) => {
    const result = await collectionsService().saveCollection({ ...req.body, userId: getUserId(req) });
    setResResult(res, result);
  });

  router.delete("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const result = await collectionsService().removeCollection(getUserId(req), id);
    setResResult(res, result);
  });

  router.get("/:id/sets", validateToken, async (req, res) => {
    const result = await collectionsService().getCollectionSets(req.params.id, getUserId(req));
    setResResult(res, result);
  });

  router.post("/:id/sets", validateToken, async (req, res) => {
    const result = await collectionsService().saveCollectionSet({ ...req.body, userId: getUserId(req) });
    setResResult(res, result);
  });

  router.delete("/:id/sets/:collectionSetId", validateToken, async (req, res) => {
    const result = await collectionsService().removeCollectionSet(
      getUserId(req),
      req.params.id,
      req.params.collectionSetId
    );
    setResResult(res, result);
  });

  return router;
};