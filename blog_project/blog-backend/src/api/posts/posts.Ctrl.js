import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};

/* 포스트 작성
POST /api/posts 
{ 
  title: '제목,
  body: '내용',
  tags:['태그1', '태그2'] 
}
*/
export const write = async (ctx) => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가자고 있음을 검증
    title: Joi.string().required(), // required()가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(), // 문자열로 이루어진 배열
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/* 포스트 목록 조회
GET /api/posts 
*/
export const list = async (ctx) => {
  try {
    const posts = await Post.find().exec();
    ctx.body = posts;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/* 특정 포스트 조회
GET /api/posts/:id
*/
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/* 특정 포스트 제거
DELETE /api/posts/:id
*/
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204; // No Content (성공하기는 했지만 응답할 데이터는 없음)
  } catch (error) {
    ctx.throw(500, error);
  }
};

/* 포스트 수정(특정 필드 변경) 
PUT /api/posts/:id 
{ 
  title: '수정',
  body: '수정 내용',
  tags:['수정', '태그'] 
 }
*/
export const update = async (ctx) => {
  const { id } = ctx.params;

  // write에서 사용한 schema와 비숫한데, required()가 없음
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가자고 있음을 검증
    title: Joi.string(), // required()가 있으면 필수 항목
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()), // 문자열로 이루어진 배열
  });

  // 검증하고 나서 검증 실패인 경우 에러 처리
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  try {
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true, // 이 값을 설정하면 업데이트된 데이터를 반환
      // false일 때는 업데이트되기 존의 데이터를 반환
    }).exec();
    if (!post) {
      ctx.status = 404; // Not Found
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};
