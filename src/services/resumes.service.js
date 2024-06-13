import { ResumesRepository } from '../repositories/resumes.repository.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesService {
  resumesRepository = new ResumesRepository();

  /** 이력서 생성 API **/
  createResume = async (authorId, title, content) => {
    const createdResume = await this.resumesRepository.createResume(
      authorId,
      title,
      content,
    );

    return {
      id: createdResume.id,
      authorId: createdResume.authorId,
      title: createdResume.title,
      content: createdResume.content,
      status: createdResume.status,
      createdAt: createdResume.createdAt,
      updatedAt: createdResume.updatedAt,
    };
  };

  /** 이력서 목록 조회 API **/
  findAllResumes = async (authorId, sort) => {
    sort = sort?.toLowerCase();

    if (sort !== 'desc' && sort !== 'asc') {
      sort = 'desc';
    }

    const resumes = await this.resumesRepository.findAllResumes(authorId, sort);

    return resumes.map((resume) => {
      return {
        id: resume.id,
        authorName: resume.author.name,
        title: resume.title,
        content: resume.content,
        createdAt: resume.createdAt,
        updatedAt: resume.updatedAt,
      };
    });
  };

  /** 이력서 상세 조회 API **/
  findResumeById = async (authorId, id) => {
    const resume = await this.resumesRepository.findResumeById(authorId, id);

    return {
      id: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };

  /** 이력서 수정 API **/
  updateResume = async (authorId, id, title, content) => {
    const resume = await this.resumesRepository.findResumeById(authorId, id);

    if (!resume) {
      throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }

    await this.resumesRepository.updateResume(authorId, id, title, content);

    const updatedResume = await this.resumesRepository.findResumeById(
      authorId,
      id,
    );

    return {
      id: updatedResume.id,
      authorName: updatedResume.author.name,
      title: updatedResume.title,
      content: updatedResume.content,
      status: updatedResume.status,
      createdAt: updatedResume.createdAt,
      updatedAt: updatedResume.updatedAt,
    };
  };

  /** 이력서 삭제 API **/
  deleteResume = async (authorId, id) => {
    const resume = await this.resumesRepository.findResumeById(authorId, id);

    if (!resume) {
      throw new Error(MESSAGES.RESUMES.COMMON.NOT_FOUND);
    }

    await this.resumesRepository.deleteResume(authorId, id);

    return {
      id: resume.id,
      authorName: resume.author.name,
      title: resume.title,
      content: resume.content,
      status: resume.status,
      createdAt: resume.createdAt,
      updatedAt: resume.updatedAt,
    };
  };
}
