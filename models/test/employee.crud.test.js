const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

	before(async () => {

		try {
			await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
		} catch(err) {
			console.error(err);
		}
	});

	describe('Reading data', () => {

		before(async () => {

			const testDepOne = new Department({ name: 'Department #1' });
			await testDepOne.save();

			const testDepTwo = new Department({ name: 'Department #2' });
			await testDepTwo.save();

			const testEmpOne = new Employee({
				firstName: 'John',
				lastName: 'Doe',
				department: testDepOne._id,
			});

			await testEmpOne.save();

			const testEmpTwo = new Employee({
				firstName: 'Amanda',
				lastName: 'Doe',
				department: testDepTwo._id,
			});

			await testEmpTwo.save();

		});

		it('should return all the data with find method', async() => {
			const employees = await Employee.find();
			const expectedLength = 2;
			expect(employees.length).to.be.equal(expectedLength);
		});

		it('should return proper document by various params with findOne method', async() => {
			const employeeFirstName = await Employee.findOne({ firstName: 'John' });
			expect(employeeFirstName.firstName).to.be.equal('John');

			const employeeLastName = await Employee.findOne({ lastName: 'Doe' });
			expect(employeeLastName.lastName).to.be.equal('Doe');
    });

		// additional test dla chętnych

		it('should return documents with populate methd', async() => {
			const employees = await Employee.find().populate('department');
			for(employee of employees){
				expect(employee.department._id).to.exist;
				expect(employee.department.name).to.exist;
			};
		});

		after(async () => {
			await Employee.deleteMany();
			await Department.deleteMany();
		});
	});

	describe('Creating data', () => {

		it('should insert new document with insertOne method', async() => {
			const employee = new Employee({
				firstName: 'John',
				lastName: 'Doe',
				department: 'Department #1'
			});

      await employee.save();
			expect(employee.isNew).to.be.false;
		});

		after(async () => {
			await Employee.deleteMany();
		});
	});

	describe('Updating data', () => {

    beforeEach(async () => {
      const testEmpOne = new Employee({
				firstName: 'John',
				lastName: 'Doe',
				department: 'Department #1'
			});

			await testEmpOne.save();

      const testEmpTwo = new Employee({
				firstName: 'Amanda',
				lastName: 'Doe',
				department: 'Department #2' 
			});

      await testEmpTwo.save();
    });

    it('should properly update one document with updateOne method', async () => {
      await Employee.updateOne({ firstName: 'John' }, { $set: { department: '=Department #1=' }});
      const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with save method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      employee.department = '=Department #1=';
      await employee.save();

      const updatedEmployee = await Employee.findOne({ department: '=Department #1=' });
      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with updateMany method', async () => {
      await Employee.updateMany({}, { $set: { firstName: 'updated' }});
      const employees = await Employee.find({ firstName: 'updated' });
      expect(employees.length).to.be.equal(2);
    });

		afterEach(async () => {
			await Employee.deleteMany();
		});

	});

  describe('Removing data', () => {

		beforeEach(async () => {
			const testEmpOne = new Employee({
				firstName: 'John',
				lastName: 'Doe',
				department: 'Department #1'
			});

			await testEmpOne.save();

			const testEmpTwo = new Employee({
				firstName: 'Amanda',
				lastName: 'Doe',
				department: 'Department #2'
			});

			await testEmpTwo.save();
		});

		it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({ firstName: 'John' });
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
		});

	it('should properly remove one document with "remove" method', async () => {
      const employee = await Employee.findOne({ firstName: 'John' });
      await employee.remove();
      const removedEmployee = await Employee.findOne({ firstName: 'John' });
      expect(removedEmployee).to.be.null;
		});

	it('should properly remove multiple documents with "deleteMany" method', async () => {
			await Employee.deleteMany();
      const removedEmployee = await Employee.find();
      expect(removedEmployee.length).to.be.equal(0);
		});

		afterEach(async () => {
			await Employee.deleteMany();
		});
  });

});