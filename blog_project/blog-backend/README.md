# blog_project_backend

- Node.js의 프레임워크인 Koa.js를 사용
- MongoDB 기반 ODB 라이브러리인 mongoose를 이용하여 서버에서 직접 데이터를 추가 • 조회 • 삭제 • 수정

  - [x] [MODEL](./src/models/)
  - [x] [API](./src/api/)

### .env

- PORT (optional): port number of local server
- MongoDB URI(required): MongoDB connection URI used to connect to a MongoDB deployment

#### Example .env file

```text
PORT=4000
MongoDB URI="{ mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]] }"
```

## User stories

- Normal users

### Normal users
