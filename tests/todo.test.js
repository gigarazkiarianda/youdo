const { expect, request, app } = require('./setup');

describe('To-Do API', () => {
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

  it('should create a new to-do', async () => {
    const res = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New To-Do',
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should get all to-dos', async () => {
    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
