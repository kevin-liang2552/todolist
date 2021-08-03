import { taskService } from '.';
import { Task } from '../database/models/task.model';
import { sequelize } from '../database/database';
import { ETaskStatus } from '../database/models/share';
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

// Known Jest async bug:
// https://github.com/facebook/jest/issues/6619
// Setting longer timeout to encourage tests to work.
// Sometimes tests will fail due to async issues. Running again makes them work.

jest.setTimeout(10000);

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
    const newCreatedTask = await taskService.addTask(newTask); 
    const data = await taskService.getTaskByID(newCreatedTask.id);
    
    if (data === null) {
      throw new Error("Found task is null");
    }

    const foundTask = {id: data.id, task: data.task, status: data.status}

    expect(foundTask).toStrictEqual({id: newCreatedTask.id, task:newCreatedTask.task, status: newCreatedTask.status});

  });

  test('Should return with null for non-existing IDs', async() => {    
    const data = await taskService.getTaskByID('asdf');
    expect(data).toBeNull();
  });

});

describe('addTask', ()=> {

  test('Should add a task to the database', async() => {    
    const newCreatedTask = await taskService.addTask(newTask); 
    const allTasks = await taskService.getAllTasks();

    expect(allTasks.length).toBe(5);

    const data = await taskService.getTaskByID(newCreatedTask.id);
    if (data === null) {
      throw new Error("Found task is null");
    }

    const foundTask = {id: data.id, task: data.task, status: data.status}

    expect(foundTask).toStrictEqual({id: newCreatedTask.id, task:newCreatedTask.task, status: newCreatedTask.status})

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

    await taskService.deleteTaskByID(newTaskID.id);
    const newAllTasks = await taskService.getAllTasks();

    expect(newAllTasks.length).toBe(4);
    newAllTasks.forEach((task)=>{
      expect(testTasks).toContainEqual({task: task.task, status: task.status});
    });
  });
  
  test('Should return with an error message', async() => {    
    await expect(taskService.deleteTaskByID('asdf')).rejects.toThrowError(`Could not find task asdf in database`);
  });
  
});

describe('updateTask', ()=> {

  test('Should update the status of a task from "incomplete" to "complete"', async() => {    
    const newCreatedTask = await taskService.addTask(newTask); 
    const data = await taskService.getTaskByID(newCreatedTask.id);
    if (data === null) {
      throw new Error("Found task is null");
    }

    const foundTask = {id: data.id, task: data.task, status: ETaskStatus.Incomplete};
    expect(foundTask).toStrictEqual({id: newCreatedTask.id, task: newCreatedTask.task, status: ETaskStatus.Incomplete});

    await taskService.updateTask(foundTask.id, ETaskStatus.Complete);
    const newData = await taskService.getTaskByID(newCreatedTask.id);
    if (newData === null) {
      throw new Error("Found task is null");
    }

    const updatedTask = {id: newData.id, task: newData.task, status: ETaskStatus.Complete};
    expect(updatedTask).toStrictEqual({id: newCreatedTask.id, task: newCreatedTask.task, status: ETaskStatus.Complete});

  });

  
  test('Should return with an error message', async() => {    
    await expect(taskService.updateTask('asdf', 'complete')).rejects.toThrowError(`Could not find task asdf in database`);
  });
  
});
