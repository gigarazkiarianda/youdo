const { expect, request, app } = require('./setup');

describe('Authentication API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'password123',
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'password123',
      });
    
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
