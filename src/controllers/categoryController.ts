import { prisma } from '../helpers/utils';
import { Request, RequestHandler } from 'express';
import { AddReqBody, DeleteReqBody, GetReqBody } from '../types/category';

const get: RequestHandler = async (req: Request<{}, {}, GetReqBody>, res) => {
  const { name }: any = req.params;
  const result = await prisma.category.findUnique({
    where: {
      name,
    },
    include: {
      questions: true,
    },
  });

  res.send(result);
};
const all: RequestHandler = async (req: Request<{}, {}, GetReqBody>, res) => {
  const result = await prisma.category.findMany({});

  res.send(result);
};

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { name }: any = req.body;
  const result = await prisma.category.create({
    data: {
      name,
    },
  });
  res.send(result);
};

const deleteCategory: RequestHandler = async (req: Request<{}, {}, DeleteReqBody>, res) => {
  const { name }: any = req.body;
  const result = await prisma.category.delete({
    where: {
      name,
    },
  });
  res.send(result);
};

export default {
  get,
  all,
  add,
  deleteCategory,
};
