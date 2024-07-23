const { expect, request, app } = require('./setup');

describe('Project API', () => {
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

  it('should create a new project', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Project',
        description: 'Project description',
      });
    
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
  });

  it('should get all projects', async () => {
    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${token}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });
});
