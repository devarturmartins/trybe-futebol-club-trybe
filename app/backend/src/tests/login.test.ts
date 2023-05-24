import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginValid = {
    id: 1,
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

const loginInvalid = {
    id: 1,
    username: 'Admin',
    role: 'undefined',
    email: 'admin@xablau.com',
    password: 'senha_invalida',
};

const secret = process.env.JWT_SECRET;
const jwtConfig: object = {
  expiresIn: '7d',
  algorithm: 'HS256',
};


describe('Testa a model Users', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(async () => {
    sinon.stub(Users, 'findOne').withArgs({ where: { email: loginValid.email } }).resolves({dataValues: loginValid} as Users);
  })

  it('post user', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
        email: loginValid.email,
        password: 'secret_admin',
    });
    console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.body).to.have.property('token');
    
  });

  it('post user', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
        email: loginValid.email,
        password: 'artur',
    });
    expect(chaiHttpResponse.body).to.not.have.property('token');
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
    
  });

});
