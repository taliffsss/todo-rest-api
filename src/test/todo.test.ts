import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app'; // Import your express app

chai.use(chaiHttp);

const { expect } = chai;

describe('Todo API', () => {
  let testToken: string;
  let createdTodoId: number;

  // Generate a token before running tests
  before(async () => {
    // Generate the token by making a POST request to /generate
    const res = await chai.request(app)
      .post('/generate')
      .send({
        username: 'test',
        password: 'test'
      });

    testToken = res.body.token;
  });

  describe('GET /todo', () => {
    it('should get all todos', async () => {
      const res = await chai.request(app)
        .get('/todo')
        .set('Authorization', `Bearer ${testToken}`);
      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('array');
    });
  });

  describe('POST /todo', () => {
    it('should create a todo', async () => {
      const res = await chai.request(app)
        .post('/todo')
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          title: "Test Todo"
        });
      expect(res.status).to.equal(200);
      createdTodoId = res.body.id;
      expect(res.body).to.have.property('id');
      expect(res.body.title).to.equal("Test Todo");
    });
  });

  describe('PUT /todo/:id', () => {
    it('should update a todo', async () => {
      const res = await chai.request(app)
        .put(`/todo/${createdTodoId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send({
          title: "Updated Todo",
          done: true
        });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('id');
      expect(res.body.title).to.equal("Updated Todo");
      expect(res.body.done).to.equal(true);
    });
  });

  describe('GET /todo/:id', () => {
    it('should update a todo', async () => {
      const res = await chai.request(app)
        .put(`/todo/${createdTodoId}`)
        .set('Authorization', `Bearer ${testToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('id');
      expect(res.body.done).to.equal(true);
    });
  });

  describe('DELETE /todo/:id', () => {
    it('should delete a todo', async () => {
      const res = await chai.request(app)
        .delete(`/todo/${createdTodoId}`)
        .set('Authorization', `Bearer ${testToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.deep.equal({ message: 'Todo deleted' });
    });
  });

});
