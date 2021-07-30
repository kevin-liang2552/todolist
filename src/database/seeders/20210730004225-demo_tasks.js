const testTasks = [
  {id:'9281e078-b02e-424b-88bb-4db02788f6fa',
  task: 'Buy eggs',
  status: 'Incomplete'},
  {id:'e38ab769-11ad-47b8-8170-3757f7f67b22',
  task: 'Buy milk',
  status: 'Complete'},
  {id:'14c9c229-5e39-47a0-b139-7244afa56582',
  task: 'Buy cheese',
  status: 'Incomplete'},
  {id:'6e8ac306-af7e-4d06-9e87-b302a5612651',
  task: 'Buy bacon',
  status: 'Complete'},
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tasks', testTasks);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tasks', {}, {});
  }
};
