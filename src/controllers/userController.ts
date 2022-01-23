import { prisma } from '../helpers/utils';
import { Request, RequestHandler } from 'express';
import { GetReqBody } from '../types/user';

const get: RequestHandler = async (req: Request<{}, {}, GetReqBody>, res) => {
  const { id }: any = req.params;
  const result = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  });

  res.send(result);
};
const all: RequestHandler = async (req: Request<{}, {}, GetReqBody>, res) => {
  const result = await prisma.user.findMany({});

  res.send(result);
};

const top10: RequestHandler = async (req: Request<{}, {}, GetReqBody>, res) => {
  const result = await prisma.user.findMany({
    orderBy: {
      totalPoint: 'desc',
    },
  });

  res.send(result);
};
export default {
  get,
  all,
  top10,
};
