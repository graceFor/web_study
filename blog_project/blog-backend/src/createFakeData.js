import Post from './models/post';

export default function createFakeData() {
  // 0,1,...39로 이루어진 배열울 생성한 후 포스트 데이터로 변환
  const posts = [...Array(40).keys()].map((i) => ({
    title: `포스트 #${i}`,
    // https://www.iipsum.coin/에서 복사한 200자 이상의 텍스트
    body: 'Lorem ipsum dolor sit amet, consectet니r adipiscing elit, sed do eiusmod tem­per incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostr니d exercitation ullamco laboris nisi ut aliquip ex ea cotmnodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill니m dolore e니fugiat mjlla pariat니r. Excepteur sint occaecat cupidatat non proident, s니rvt in culpa qui officia deserunt mol- lit anim id est laborum.',
    tags: ['가짜', '데이터'],
  }));

  Post.insertMany(posts, (error, docs) => {
    console.log(docs);
  });
}
