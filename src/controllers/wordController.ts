import { prisma } from '../helpers/utils';
import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { AddReqBody, EditReqBody } from '../types/word';

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { title, definition, type } = req.body;

  const result = await prisma.word.create({
    data: {
      title,
      definition,
      type,
    },
  });

  res.send(result);
};

const edit: RequestHandler = async (req: Request<{}, {}, EditReqBody>, res) => {
  const { id, title, definition, type } = req.body;

  const result = await prisma.word.update({
    where: {
      id,
    },
    data: {
      title,
      type,
      definition,
    },
  });

  res.send(result);
};

const random: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const questionCount = await prisma.word.count({
    select: {
      _all: true, // Count all records
    },
  });

  const result = await prisma.word.findUnique({
    where: {
      id: Math.floor(Math.random() * (questionCount._all + 1)),
    },
  });

  res.send(result);
};

const all: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const result = await prisma.word.findMany({});

  res.send(result);
};

const deleteAll: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const result = await prisma.word.deleteMany({});

  res.send(result);
};

export default {
  add,
  edit,
  random,
  all,
  deleteAll,
};
