import {Request, Response} from "express";
import {User} from "@supabase/supabase-js";
import {ErrorStatus, Result} from "../models";

export interface RequestContext {
  user?: User;
}

export function setReqContext(req: Request, contextParts: Partial<RequestContext>): void {
  (req as any).context = { ...(req as any).context, ...contextParts };
}

export function getReqContext(req: Request): RequestContext {
  return (req as any).context as RequestContext;
}

export function getUserId(req: Request): string {
  return getReqContext(req).user?.id;
}

export function setResResult<T>(
  res: Response,
  result: Result<T>,
  mapper?: (result: T) => any,
  fixedErrorStatus?: number
): Response {
  const status = result.isSuccess
    ? 200
    : fixedErrorStatus ? fixedErrorStatus : getStatusCode(result.errorStatus);
  const json = result.isSuccess
    ? mapper ? mapper(result.result) : result.result
    : result.error;
  res.status(status).json(json);
  return res;
}

function getStatusCode(errorStatus: ErrorStatus): number {
  switch (errorStatus) {
    case "unauthorized": return 401;
    case "forbidden": return 403;
    case "not-found": return 404;
    case "bad-request": return 400;
    default: return 500;
  }
}

