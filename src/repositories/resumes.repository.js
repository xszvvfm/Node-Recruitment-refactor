import { prisma } from '../utils/prisma.util.js';

export class ResumesRepository {
  /** 이력서 생성 API **/
  createResume = async (authorId, title, content) => {
    const createdResume = await prisma.resume.create({
      data: {
        authorId,
        title,
        content,
      },
    });

    return createdResume;
  };

  /** 이력서 목록 조회 API **/
  findAllResumes = async (authorId, sort) => {
    const resumes = await prisma.resume.findMany({
      where: { authorId },
      orderBy: {
        createdAt: sort,
      },
      include: {
        author: true,
      },
    });

    return resumes;
  };

  /** 이력서 상세 조회 API **/
  findResumeById = async (authorId, id) => {
    const resume = await prisma.resume.findUnique({
      where: { authorId, id: +id },
      include: { author: true },
    });

    return resume;
  };

  /** 이력서 수정 API **/
  updateResume = async (authorId, id, title, content) => {
    const updatedResume = await prisma.resume.update({
      where: { authorId, id: +id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
      },
    });

    return updatedResume;
  };

  /** 이력서 삭제 API **/
  deleteResume = async (authorId, id) => {
    const deletedResume = await prisma.resume.delete({
      where: { authorId, id: +id },
    });

    return deletedResume;
  };
}
