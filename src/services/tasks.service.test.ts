import { taskService } from '.';
import { Task } from '../models/task.model';
import { sequelize } from './database';
import { ETaskStatus } from '../models/share';
import '../config';

const testTasks = [
  {task: 'Buy eggs',
  status: ETaskStatus.Incomplete},
  {task: 'Buy milk',
  status: ETaskStatus.Complete},
  {task: 'Buy cheese',
  status: ETaskStatus.Incomplete},
  {task: 'Buy bacon',
  status: ETaskStatus.Incomplete},
];

const newTask = 'Buy chocolate';

beforeEach(async ()=>{
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
    const tasks = await taskService.getTaskByStatus(ETaskStatus.Incomplete); 
    expect(tasks).toHaveLength(3)
    tasks.forEach((task)=>{
      expect(task.status).toBe(ETaskStatus.Incomplete);
      expect(testTasks).toContainEqual({task: task.task, status: task.status});
    });
  });

  test('Should return only complete', async() => {
    const tasks = await taskService.getTaskByStatus(ETaskStatus.Complete); 
    expect(tasks).toHaveLength(1);
    tasks.forEach((task)=>{
      expect(task.status).toBe(ETaskStatus.Complete);
      expect(testTasks).toContainEqual({task: task.task, status: task.status});
    });
  });
});

describe('getAllTasks', ()=> {

  test('Should return all tasks in the database', async() => {    
    const tasks = await taskService.getAllTasks(); 
    expect(tasks).toHaveLength(4);
    tasks.forEach((task)=>{
      expect(testTasks).toContainEqual({task: task.task, status: task.status});
    });
  });
});

describe('getTaskByID', ()=> {

  test('Should return a task of a specific task of an ID in the database', async() => {    
    const newTaskID = await taskService.addTask(newTask); 
    const data = await taskService.getTaskByID(newTaskID);

    const foundTask = {id: data.id, task: data.task, status: data.status}

    expect(foundTask).toStrictEqual({id: newTaskID, task:newTask, status: ETaskStatus.Incomplete});

  });

  test('Should return with an error message', async() => {    
    const data = await taskService.getTaskByID('asdf');
    expect(data).toBe('Could not find task ID in database');
  });

});

describe('addTask', ()=> {

  test('Should add a task to the database', async() => {    
    const newTaskID = await taskService.addTask(newTask); 
    const allTasks = await taskService.getAllTasks();

    expect(allTasks.length).toBe(5);

    const data = await taskService.getTaskByID(newTaskID);

    const foundTask = {id: data.id, task: data.task, status: data.status}

    expect(foundTask).toStrictEqual({id: newTaskID, task:newTask, status: ETaskStatus.Incomplete})

  });

});

describe('deleteTaskByStatus', ()=> {

  test('Should delete all complete tasks in the database', async() => {    
    await taskService.deleteTaskByStatus(ETaskStatus.Complete);
    const allTasks = await taskService.getAllTasks();

    expect(allTasks.length).toBe(3);

  });

  test('Should delete all incomplete tasks in the database', async() => {    
    await taskService.deleteTaskByStatus(ETaskStatus.Incomplete);
    const allTasks = await taskService.getAllTasks();

    expect(allTasks.length).toBe(1);

  });

});

describe('deleteTaskByID', ()=> {

  test('Should delete a specific task in the database', async() => {    
    const newTaskID = await taskService.addTask(newTask); 
    const allTasks = await taskService.getAllTasks();

    expect(allTasks.length).toBe(5);

    await taskService.deleteTaskByID(newTaskID);
    const newAllTasks = await taskService.getAllTasks();

    expect(newAllTasks.length).toBe(4);
    newAllTasks.forEach((task)=>{
      expect(testTasks).toContainEqual({task: task.task, status: task.status});
    });
  });

  test('Should return with an error message', async() => {    
    const data = await taskService.updateTask('asdf');
    expect(data).toBe('Could not find task ID in database');
  });

});

describe('updateTask', ()=> {

  test('Should update the status of a task from "incomplete" to "complete"', async() => {    
    const newTaskID = await taskService.addTask(newTask); 
    const data = await taskService.getTaskByID(newTaskID);

    const foundTask = {id: data.id, task: data.task, status: data.status};
    expect(foundTask).toStrictEqual({id: newTaskID, task:newTask, status: ETaskStatus.Incomplete});

    await taskService.updateTask(foundTask.id);
    const newData = await taskService.getTaskByID(newTaskID);

    const updatedTask = {id: newData.id, task: newData.task, status: newData.status};
    expect(updatedTask).toStrictEqual({id: newTaskID, task:newTask, status: ETaskStatus.Complete});

  });

  test('Should return with an error message', async() => {    
    const data = await taskService.updateTask('asdf');
    expect(data).toBe('Could not find task ID in database');
  });

});
