import { prisma } from '../helpers/utils';
import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { AddReqBody } from '../types/spot';

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { sentence, answer, categoryName } = req.body;
  if (!categoryName) {
    res.status(404).send('No category name provided.');
  }
  const result = await prisma.spot.create({
    data: {
      sentence,
      answer,
      category: {
        connect: {
          name: categoryName,
        },
      },
    },
  });

  res.send(result);
};
const all: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const result = await prisma.spot.findMany({});

  res.send(result);
};

const random: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const spotCount = await prisma.spot.count({
    select: {
      _all: true, // Count all records
    },
  });
  const oo = Math.floor(Math.random() * (spotCount._all + 1));
  console.log(oo);
  const result = await prisma.spot.findUnique({
    where: {
      id: oo,
    },
  });

  res.send(result);
};

export default { add, random, all };
