const { expect, request, app } = require('./setup');

describe('Social Media API', () => {
  let token;

  before(async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });
    
    token = res.body.token;
  });

  it('should create a new social media post', async () => {
    const res = await request(app)
      .post('/api/social-media-posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        content: 'New Social Media Post',
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should get all social media posts', async () => {
    const res = await request(app)
      .get('/api/social-media-posts')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
