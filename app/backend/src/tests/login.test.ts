// import * as sinon from 'sinon';
// import * as chai from 'chai';
// // @ts-ignore
// import chaiHttp = require('chai-http');

// import { app } from '../app';
// import Users from '../database/models/Users';

// import { Response } from 'superagent';

// chai.use(chaiHttp);

// const { expect } = chai;

// const usersToLogin = [
//     {
//         valid: {
//             email: 'admin@admin.com',
//             password: 'secret_admin'
//         }, 
//         invalid: {
//             email: '@artur.com',
//             password: '123456'
//         }
//     }
//   ]


// describe('Testa a model Users', () => {

//   let chaiHttpResponse: Response;

//   afterEach(() => {
//     sinon.restore();
//   });

//   it('post user', async () => {
//     const { valid } = usersToLogin[0];
//     console.log(valid)
//     sinon.stub(Users, 'findOne').resolves(valid as Users);


//     chaiHttpResponse = await chai.request(app).post('/login');
//     // console.log(chaiHttpResponse)

//     expect(chaiHttpResponse.body).to.have.property('token');
//     expect(chaiHttpResponse.status).to.be.equal(200);

//   });

//   it('Role', async () => {
//     sinon.stub(Teams, 'findOne').resolves(teams[0] as Teams);

//     chaiHttpResponse = await chai.request(app).get('/teams');

//     expect(chaiHttpResponse.body).to.be.equal(teams[0]);
//     expect(chaiHttpResponse.status).to.be.equal(200);

//   });

// });
