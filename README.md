# DramaBoard_Express

- Express를 기반으로 현재 방영되고 있는 한국 드라마를 소개해주는 게시판
- MongoDB를 사용하여 데이터 관리

## How to launch server

```shell
npm install
npm start
```

## Environment files

### .env

- PORT (optional): port number of GraphQL Server / Playground
- MongoDB URI(required): MongoDB connection URI used to connect to a MongoDB deployment

#### Example .env file

```text
PORT=4000
MongoDB URI="{ mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]] }"
```

## User stories

- Normal users

### Normal users

- [x] See drama info
- [x] Create drama info
- [x] Update drama info
- [x] Delete drama info
