import * as _ from './add_tasks';
import { get_all_tasks } from './get_tasks';
import database, {models} from '../database/index';

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
    await models.task.sync({force: true});
    
    await models.task.destroy({
        truncate: true
    });

    await models.task.bulkCreate(testTasks);
});

afterAll(()=>{
    database.close();
});

describe('add_tasks', async ()=> {
    test('Should create a new task', async () => {

        const newTaskID = await _.add_task('Buy chocolate');
        const tasks = await get_all_tasks();

        expect(tasks.length).toBe(5);

    });

});