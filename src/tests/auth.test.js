const request = require('supertest');
const { admin, db } = require('../config/firebase');

let app;

beforeAll(async () => {
  app = require('../index');
  // 테스트용 사용자 생성
  try {
    await admin.auth().createUser({
      uid: 'test-user-001',
      email: 'backend-test@example.com',
      password: 'test1234'
    });
  } catch (error) {
    console.log('Test user already exists');
  }
}, 30000);

afterAll(async () => {
  // 테스트 완료 후 정리
  try {
    await admin.auth().deleteUser('test-user-001');
  } catch (error) {
    console.log('Cleanup error:', error.message);
  }
});

describe('Auth API - 회원 접근 제어', () => {
  
  // ✅ 1️⃣ 회원가입 테스트
  test('POST /auth/register - 회원가입 성공', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'newuser@example.com',
        password: 'password123',
        name: 'New User'
      });
    
    expect(res.status).toBe(201);
    expect(res.body.uid).toBeDefined();
    expect(res.body.email).toBe('newuser@example.com');
  }, 15000);


  // ✅ 2️⃣ 회원가입 실패 (이메일 중복)
  test('POST /auth/register - 이메일 중복 시 실패', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        email: 'backend-test@example.com',
        password: 'password123',
        name: 'Duplicate'
      });
    
    expect(res.status).toBe(400);
  }, 15000);


  // ✅ 3️⃣ 로그인 성공
  test('POST /auth/login - 로그인 성공', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'backend-test@example.com',
        password: 'test1234'
      });
    
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.uid).toBe('test-user-001');
  }, 15000);


  // ✅ 4️⃣ 로그인 실패 (없는 이메일)
  test('POST /auth/login - 없는 이메일로 로그인 실패', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'anypassword'
      });
    
    expect(res.status).toBe(401);  // ← 이메일이 없으면 401 반환
  }, 15000);


  // ✅ 5️⃣ 토큰 검증 - 유효한 토큰
  test('POST /auth/validate - 유효한 토큰 검증 성공', async () => {
    // 먼저 로그인
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'backend-test@example.com',
        password: 'test1234'
      });

    const token = loginRes.body.token;

    // 토큰 검증
    const res = await request(app)
      .post('/auth/validate')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);  // ← 변경!
    expect(res.body.data.uid).toBeDefined();  // ← 변경!
  }, 15000);


  // ✅ 6️⃣ 토큰 검증 - 토큰 없음 (비회원 접근)
  test('POST /auth/validate - 토큰 없이 접근 시 401 반환', async () => {
    const res = await request(app)
      .post('/auth/validate');
    
    expect(res.status).toBe(401);
    expect(res.body.error).toBeDefined();
  }, 15000);


  // ✅ 7️⃣ 토큰 검증 - 유효하지 않은 토큰
  test('POST /auth/validate - 유효하지 않은 토큰 401 반환', async () => {
    const res = await request(app)
      .post('/auth/validate')
      .set('Authorization', 'Bearer invalid.token.here');
    
    expect(res.status).toBe(401);
  }, 15000);


  // ✅ 8️⃣ 음료 API - 토큰 없이 접근 불가
  test('GET /drinks - 토큰 없이 접근 시 401 반환', async () => {
    const res = await request(app)
      .get('/drinks');
    
    expect(res.status).toBe(401);
  }, 15000);


  // ✅ 9️⃣ 음료 API - 유효한 토큰으로 접근 가능
  test('GET /drinks - 유효한 토큰으로 접근 성공', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'backend-test@example.com',
        password: 'test1234'
      });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/drinks')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  }, 15000);


  // ✅ 🔟 미들웨어 검증 - 로그인 상태 체크
  test('라우팅 미들웨어 - 로그인 상태 확인', async () => {
    // 토큰 없이
    const noTokenRes = await request(app)
      .post('/drinks')
      .send({ name: 'Test Drink', caffeine_per_serving_mg: 100 });
    
    expect(noTokenRes.status).toBe(401);

    // 토큰으로
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'backend-test@example.com',
        password: 'test1234'
      });

    const token = loginRes.body.token;

    const withTokenRes = await request(app)
      .post('/drinks')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        name: 'Test Coffee', 
        caffeine_per_serving_mg: 95 
      });
    
    expect(withTokenRes.status).toBe(201);
  }, 15000);
});
