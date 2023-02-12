import { prisma } from '../helpers/utils';
import { Request, RequestHandler } from 'express';
import Joi from '@hapi/joi';
import { AddCategoryReqBody, AddReqBody, AnswerReqBody, EditReqBody } from '../types/question';

export const addQuestionSchema = Joi.object().keys({
  title: Joi.string().required(),
});

const add: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const { title, answers } = req.body;

  const result = await prisma.question.create({
    data: {
      title,
      answers,
      correct: answers[0],
    },
  });

  res.send(result);
};
const edit: RequestHandler = async (req: Request<{}, {}, EditReqBody>, res) => {
  const { id, title, answers } = req.body;

  const result = await prisma.question.update({
    where: {
      id,
    },
    data: {
      title,
      answers,
      correct: answers[0],
    },
  });

  res.send(result);
};

const answer: RequestHandler = async (req: Request<{}, {}, AnswerReqBody>, res) => {
  const { id, answer, userId } = req.body;

  const question = await prisma.question.findUnique({
    where: {
      id,
    },
    select: {
      correct: true,
      point: true,
    },
  });

  if (question.correct == answer) {
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        totalPoint: {
          increment: 50,
        },
      },
    });

    res.send({ correct: question.correct, isCorrect: true });
  } else {
    res.send({ correct: question.correct, isCorrect: false });
    const user = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        totalPoint: {
          decrement: 50,
        },
      },
    });
  }
};

const random: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const questionCount = await prisma.question.count({
    select: {
      _all: true, // Count all records
    },
  });

  const result = await prisma.question.findUnique({
    where: {
      id: Math.floor(Math.random() * (questionCount._all + 1)),
    },
  });
  console.log(result);
  res.send(result);
};

const all: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const result = await prisma.question.findMany({});

  res.send(result);
};
const delete: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
 const {id}=req.body;
  const result = await prisma.question.delete({
    where:{
      id:Number(id)
    }
  });

  res.send(result);
};

const deleteAll: RequestHandler = async (req: Request<{}, {}, AddReqBody>, res) => {
  const result = await prisma.question.deleteMany({});

  res.send(result);
};
const addCategory: RequestHandler = async (req: Request<{}, {}, AddCategoryReqBody>, res) => {
  const { id, name } = req.body;

  const result = await prisma.question.update({
    where: {
      id,
    },
    data: {
      categories: {
        connect: { name },
      },
    },
  });

  res.send(result);
};

export default {
  add,
  answer,
  edit,
  random,
  delete,
  all,
  deleteAll,
  addCategory,
};
