const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

	it('should throw an error if any arg is empty', () => {

		const cases = [{
			firstName: 'John',
			lastName: 'Doe'
		},
    {
			firstName: 'John',
			department: 'IT'
		},
    {
			lastName: 'Doe',
			department: 'IT'
    }];

    for(let type of cases) {
		const emp = new Employee({ type });
      emp.validate(err => {
        expect(err.errors).to.exist;
      });
    }
	});

	it('should throw an error if arg is not a string', () => {

		const cases = [{}, []];
		for(let type of cases) {
			const emp = new Employee({ firstName: type, lastName: type });

			emp.validate(err => {
				expect(err.errors).to.exist;
			});
		}
	});

	it('shouldnt throw an error if args are correct', () => {

    const cases = [{
      firstName: 'John',
      lastName: 'Doe',
      department: 'IT'
    },
    {
      firstName: 'Johnatan',
      lastName: 'Wilson',
      department: 'Testing'
    }];

		for(let type of cases) {
		const emp = new Employee(type);

      emp.validate(err => {
      expect(err).to.not.exist;
      });
    }
	});

	after(() => {
		mongoose.models = {};
	});
});