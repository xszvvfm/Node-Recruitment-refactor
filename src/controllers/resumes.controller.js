import { ResumesService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

export class ResumesController {
  resumesService = new ResumesService();

  /** 이력서 생성 API **/
  createResume = async (req, res, next) => {
    try {
      const user = req.user;
      const { title, content } = req.body;
      const authorId = user.id;

      const createdResume = await this.resumesService.createResume(
        authorId,
        title,
        content,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data: createdResume,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 이력서 목록 조회 API **/
  getResumes = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      let { sort } = req.query;

      const resumes = await this.resumesService.findAllResumes(authorId, sort);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data: resumes,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 이력서 상세 조회 API **/
  getResumeById = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      const resume = await this.resumesService.findResumeById(authorId, id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data: resume,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 이력서 수정 API **/
  updateResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      const { title, content } = req.body;

      const updatedResume = await this.resumesService.updateResume(
        authorId,
        id,
        title,
        content,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data: updatedResume,
      });
    } catch (err) {
      next(err);
    }
  };

  /** 이력서 삭제 API **/
  deleteResume = async (req, res, next) => {
    try {
      const user = req.user;
      const authorId = user.id;

      const { id } = req.params;

      const deletedResume = await this.resumesService.deleteResume(
        authorId,
        id,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: deletedResume,
      });
    } catch (err) {
      next(err);
    }
  };
}
