# blog_project_backend

- Node.js의 프레임워크인 Koa.js를 사용
- MongoDB 기반 ODB 라이브러리인 mongoose를 이용하여 서버에서 직접 데이터를 추가 • 조회 • 삭제 • 수정
- JWT를 통한 회원 인증

- [x] [MODEL](./src/models/)
- [x] [API](./src/api/)
- [x] [Library](./src/lib/)

### .env

- PORT (optional): port number of local server
- MongoDB URI(required): MongoDB connection URI used to connect to a MongoDB deployment
- JWT_SECRET(required): Secret key to use when creating JWT tokens(Input random string)

#### Example .env file

```text
PORT=4000
MongoDB URI="{ mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]] }"
JWT_SECRET=33e86ac48e993d06bb3afd382863457e6bca79daf983ec4ba783e75999b1f4a000e686223b87f05659f7f85e0d369a596d32d2df6f76c41fca708c23a7c15488(random string)
```

## User stories

- Normal users

### Normal users

- [x] Register
- [x] Login
- [x] Logout
- [x] See Post info
- [x] Create Post info
- [x] Update Post info
- [x] Delete Post info
