// test/app.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');
const app = require('../index'); // Import the raw express app

const expect = chai.expect;
chai.use(chaiHttp);

describe('GET /api/books', () => {
    it('should return a book list with status 200', (done) => {
      request(app)
        .get('/api/books')
        .end((err, res) => {
          expect(res.status).to.equal(200);
  
          // Check the 'meta' object
          expect(res.body).to.have.property('meta');
          expect(res.body.meta.code).to.equal('200_001');
          expect(res.body.meta.message).to.equal('Success Get Book');
  
          // Check the 'data' array in the response
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equal(5);
  
          // Verify the first book's structure
          expect(res.body.data[0]).to.have.property('code');
          expect(res.body.data[0].code).to.equal('HOB-83');
          expect(res.body.data[0].title).to.equal('The Hobbit, or There and Back Again');
          expect(res.body.data[0].author).to.equal('J.R.R. Tolkien');
          expect(res.body.data[0].stock).to.equal(1);
  
          done();
        });
    });
  });
  


  describe('GET /api/members', () => {
    it('should return a members object with status 200', (done) => {
      request(app)
        .get('/api/members')
        .end((err, res) => {
          expect(res.status).to.equal(200);
  
          // Check the 'meta' object
          expect(res.body).to.have.property('meta');
          expect(res.body.meta.code).to.equal('200_002');
          expect(res.body.meta.message).to.equal('Success Get Member');
  
          // Check the 'data' array in the response
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data.length).to.equal(3);
  
          // Verify the first member's structure
          expect(res.body.data[0]).to.have.property('code');
          expect(res.body.data[0].code).to.equal('M001');
          expect(res.body.data[0].name).to.equal('Angga');
          expect(res.body.data[0].penalty_until).to.be.null;
          expect(res.body.data[0].borrowed_books).to.equal(0);
  
          done();
        });
    });
  });  
  

  describe('POST /api/borrows-book', () => {
    it('should return a borrow book id object with status 200', (done) => {
      request(app)
        .post('/api/borrows-book')
        .send({ member_code: 'M001', book_code: 'HOB-83' })  // Send valid payload
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('meta');
          expect(res.body.meta.code).to.equal('200_003');
          expect(res.body.meta.message).to.equal('Success Get Borrow');
  
          // Check the 'data' array in the response
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.property('id');
          expect(res.body.data[0]).to.have.property('book_code');
          expect(res.body.data[0].book_code).to.equal('HOB-83');
  
          done();
        });
    });
  });
  


  describe('POST /api/returns-book', () => {
    it('should return a success message with the current stock status', (done) => {
      request(app)
        .post('/api/returns-book')
        .send({ member_code: 'M001', book_code: 'HOB-83' })  // Send valid payload for return book
        .end((err, res) => {
          expect(res.status).to.equal(200);  // Expecting HTTP 200
  
          // Check the 'meta' object
          expect(res.body).to.have.property('meta');
          expect(res.body.meta.code).to.equal('200_004');
          expect(res.body.meta.message).to.equal('Success Get Return');
  
          // Check the 'data' array in the response
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body.data[0]).to.have.property('stock_now');
          expect(res.body.data[0].stock_now).to.equal(1);  // Assuming stock_now is 1 after return
  
          done();
        });
    });
  });
  