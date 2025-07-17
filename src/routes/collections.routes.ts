import {Router} from "express";
import serviceFactory from "../services/serviceFactory";
import {validateToken} from "../middlewares/validateToken";
import {getStatusCode, getUserId, setResResult} from "../utils/requestUtils";
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
    const userId = getUserId(req);
    const collectionId = req.params.id;
    const { id, ...payload } = req.body;
    const collectionService = collectionsService();
    const collectionResponse = await collectionService.getCollection(collectionId, userId);

    if (!collectionResponse.isSuccess || !collectionResponse.result) {
      res.status(getStatusCode('bad-request')).json('Collection not found');
      return;
    }

    const result = await collectionService.saveCollectionSet({
      userId,
      collectionId,
      id,
      payload,
    });

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