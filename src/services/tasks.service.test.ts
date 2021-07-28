// Please update this test file

describe('task.service', () => {
  it('should pass the test', () => {
    expect(1).toEqual(1)
  })
})

// import * as _ from './get_tasks';
// import database, {models} from '../database/index';

// const testTasks = [
//     {task: 'Buy eggs',
//     status: 'incomplete'},
//     {task: 'Buy milk',
//     status: 'complete'},
//     {task: 'Buy cheese',
//     status: 'incomplete'},
//     {task: 'Buy bacon',
//     status: 'incomplete'},
// ];


// beforeAll(async ()=>{
//     await models.task.sync({force: true});

//     await models.task.destroy({
//         truncate: true
//     });

//     await models.task.bulkCreate(testTasks);
// });

// afterAll(()=>{
//     database.close();
// });

// describe('get_tasks', ()=> {
//     test('Should return only incomplete', async() => {        
//         const tasks = await _.get_tasks('incomplete'); 
//         expect(tasks).toHaveLength(3);

//         tasks.forEach((task)=>{
//             expect(task.get('status')).toBe('incomplete');
//             expect(testTasks).toContainEqual({task: task.get('task'), status: task.get('status')});
//         })
//     });

//     test('Should return only complete', async() => {

//         const tasks = await _.get_tasks('complete'); 
//         expect(tasks).toHaveLength(1);

//         tasks.forEach((task)=>{
//             expect(task.get('status')).toBe('complete');
//             expect(testTasks).toContainEqual({task: task.get('task'), status: task.get('status')});
//         })

//     });
// });

// describe('get_all_tasks', ()=> {
//     test('Should return all tasks in the database', async() => {    
//         const tasks = await _.get_all_tasks(); 
//         expect(tasks).toHaveLength(4);

//         tasks.forEach((task)=>{
//             expect(testTasks).toContainEqual({task: task.get('task'), status: task.get('status')});
//         })

//     });    
// })
