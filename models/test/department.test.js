const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {

	it('should throw an error if no "name" arg', () => {
		const dep = new Department({}); //nowy dokument w department ale z pustym name

		dep.validate(err => {
			expect(err.errors.name).to.exist; //validate sprawdza kazdy atrybut i bledy zapisuje do errors pod nazwą atrybutu
		});
	});

	it('should throw an error if "name" is not a string', () => {

		const cases = [{}, []];
		for(let name of cases) {
			const dep = new Department({ name });

			dep.validate(err => {
				expect(err.errors.name).to.exist;
			});
		}
	});

	it('should throw an error if "name" is too short or too long', () => {

		const cases = ['Dev', 'de', 'Developers Department'];
		for(let name of cases) {
			const dep = new Department({ name });

			dep.validate(err => {
				expect(err.errors.name).to.exist;
			});
		}
	});

	it('shouldnt throw an error if "name" is correct', () => {

	const cases = ['Testers Department', 'Distribution Dept'];
		for(let name of cases) {
		const dep = new Department({ name });

		dep.validate(err => {
			expect(err).to.not.exist;
		});
	}
	});

	after(() => {
		mongoose.models = {};
	});
});