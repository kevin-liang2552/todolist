import request from 'supertest';
import app from '../src/app';
//import { ETaskStatus } from '../src/models/share';
import {Task} from '../src/models/task.model';

/*
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
*/

describe('GET', () => {

  const testGetStatus = async (status:string, expectedNo:number) => {
    const req = await request(app).get(`/tasks/${status}`)
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200);
    
    expect(req.body.length).toBe(expectedNo);
    expect(req.body.every( (t:Task) => t.status === status)).toBeTruthy();
  }

  test('/tasks', async ()=> {
    const req = await request(app).get('/tasks')
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
})