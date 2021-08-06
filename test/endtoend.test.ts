import request from 'supertest';
import server from '../src';
import { ETaskStatus } from '../src/models/share';
import { Task } from '../src/models/task.model';
import { sequelize } from '../src/services/database';

const testTasks = [
  { id: '180aed45-68cf-4e27-88e0-929e6ccc1400',
    task: 'Buy eggs',
    status: ETaskStatus.Incomplete},
  { id: '5daaa7f0-c4ad-4731-8cca-e370cc07e774',
    task: 'Buy milk',
    status: ETaskStatus.Complete},
  { id: '120ba7bf-1cef-4b0c-8bdd-7cd5a13ad888',
    task: 'Buy cheese',
    status: ETaskStatus.Incomplete},
  { id: '2431c8c0-c3be-42eb-8b19-4c3c33d72789',
    task: 'Buy bacon',
    status: ETaskStatus.Incomplete},
];

const instantiateDB = async () => {
  await Task.sync();
  await Task.destroy({
      truncate: true
  });
  await Task.bulkCreate(testTasks);
}

beforeEach(async ()=>{
  await instantiateDB();
});

afterAll(async ()=>{
  await sequelize.close();
  server.close();
});

describe('GET /tasks', () => {
  const testGetStatus = async (status:string, expectedNo:number) => {
    const req = await request(server).get(`/tasks/${status}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
    
    expect(req.body.length).toBe(expectedNo);
    expect(req.body.every( (t:Task) => t.status === status)).toBeTruthy();
  }

  test('/tasks', async ()=> {
    const req = await request(server).get('/tasks')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);

    expect(req.body.length).toBe(4);
  });

  test('/tasks/complete', async ()=> {
    await testGetStatus('complete', 1);
  });

  test('/tasks/incomplete', async ()=> {
    await testGetStatus('incomplete', 3);
  });
});

describe('DELETE /tasks', () => {

  const testDeleteStatus = async (status: string) => {
    request(server).delete(`/tasks/status/${status}`)
    .expect(200);
  }

  test('/tasks deletes a specific task properly', async () => {
    await request(server).delete('/tasks/180aed45-68cf-4e27-88e0-929e6ccc1400')
    .expect(200);
  });

  test('/tasks deletes tasks of a complete status properly', async () => {
    await testDeleteStatus('complete');
  });

  test('/tasks deletes tasks of an incomplete status properly', async () => {
    await testDeleteStatus('incomplete');
  });

  test('/tasks returns an error with an non-existant id', async () => {
    await request(server).delete('/tasks/fake-task-id')
    .expect(500);
  });

  test('/tasks returns an error with an invalid status', async () => {
    await request(server).delete('/tasks/status/invalid-status')
    .expect(400);
  });

});

describe('POST /tasks', () => {

  test('/tasks adds a task properly', async () => {
    await request(server)
    .post('/tasks')
    .send({task: 'Buy chocolate'})
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
  });

  test('/tasks returns an error with an invalid body', async () => {
    await request(server)
    .post('/tasks')
    .send({asdf: 'Buy chocolate'})
    .expect(400);
  });

});

describe('PATCH /tasks', () => {

  test('/tasks updates a task properly', async () => {
    await request(server)
    .patch('/tasks/180aed45-68cf-4e27-88e0-929e6ccc1400/complete')
    .expect(200);
  });

  test('/tasks returns an error with an invalid status', async () => {
    await request(server)
    .patch('/tasks/180aed45-68cf-4e27-88e0-929e6ccc1400/invalid-status')
    .expect(500);
  });

  test('/tasks returns an error with an non-existant id', async () => {
    await request(server)
    .patch('/tasks/fake-task-id/complete')
    .expect(500);
  });

});