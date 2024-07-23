const { expect, request, app } = require('./setup');

describe('Notification API', () => {
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

  it('should create a new notification', async () => {
    const res = await request(app)
      .post('/api/notifications')
      .set('Authorization', `Bearer ${token}`)
      .send({
        message: 'New Notification',
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should get all notifications', async () => {
    const res = await request(app)
      .get('/api/notifications')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
