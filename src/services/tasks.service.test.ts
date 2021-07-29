import { taskService } from '.';
import { Task } from '../models/task.model';
import { sequelize } from './database';
import '../config';

const testTasks = [
  {task: 'Buy eggs',
  status: 'incomplete'},
  {task: 'Buy milk',
  status: 'complete'},
  {task: 'Buy cheese',
  status: 'incomplete'},
  {task: 'Buy bacon',
  status: 'incomplete'},
];

beforeAll(async ()=>{
  await Task.sync({force: true})
  await Task.destroy({
      truncate: true
  })
  await Task.bulkCreate(testTasks);
});

afterAll(()=>{
  sequelize.close();
});

describe('getTaskByStatus', ()=> {

  test('Should return only incomplete', async() => {        
    const tasks = await taskService.getTaskByStatus('incomplete'); 
    expect(tasks).toHaveLength(3)
    tasks.forEach((task)=>{
      expect(task.get('status')).toBe('incomplete');
      expect(testTasks).toContainEqual({task: task.task, status: task.status});
    });
  });

  test('Should return only complete', async() => {
    const tasks = await taskService.getTaskByStatus('complete'); 
    expect(tasks).toHaveLength(1);
    tasks.forEach((task)=>{
      expect(task.get('status')).toBe('complete');
      expect(testTasks).toContainEqual({task: task.task, status: task.status});
    });
  });
});

describe('getAllTasks', ()=> {

  test('Should return all tasks in the database', async() => {    
    const tasks = await taskService.getAllTasks(); 
    expect(tasks).toHaveLength(4);
    tasks.forEach((task)=>{
      expect(testTasks).toContainEqual({task: task.get('task'), status: task.get('status')});
    });
  });
});
