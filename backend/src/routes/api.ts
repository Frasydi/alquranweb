import { Router } from 'express';
import jetValidator from 'jet-validator';

import HttpStatusCodes from '@src/constants/HttpStatusCodes';
import { deleteBookmard, getAllSurah, getBookmark, getSurah, postbookmark } from '@src/services/UserService';


// **** Variables **** //

const apiRouter = Router(),
  validate = jetValidator();


apiRouter.get("/", async(req, res) => {
  const result = await getAllSurah()
  res.status(result.code).json(result)
})

apiRouter.get("/surah/:no", async(req,res) => {
  const result = await getSurah(parseInt(req.params.no))
  res.status(result.code).json(result)
})

apiRouter.post("/bookmark/:surah/:ayat", async(req,res) => {
  const result = await postbookmark(parseInt(req.params.surah), parseInt(req.params.ayat))
  res.status(result.code).json(result)
})
apiRouter.get("/bookmark", async(req,res) => {
  const result = await getBookmark()
  res.status(result.code).json(result)
})
apiRouter.delete("/bookmark/:id", async(req,res) => {
  const result = await deleteBookmard(parseInt(req.params.id))
  res.status(result.code).json(result)
})



// **** Export default **** //

export default apiRouter;
