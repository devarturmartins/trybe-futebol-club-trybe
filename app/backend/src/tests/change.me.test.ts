import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';
// import teamsMock from '../../../../__tests__/expected_results/teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teams = [
  { id: 1, teamName: 'Avaí/Kindermann' },
  { id: 2, teamName: 'Bahia' },
  { id: 3, teamName: 'Botafogo' },
  { id: 4, teamName: 'Corinthians' },
  { id: 5, teamName: 'Cruzeiro' },
  { id: 6, teamName: 'Ferroviária' },
  { id: 7, teamName: 'Flamengo' },
  { id: 8, teamName: 'Grêmio' },
  { id: 9, teamName: 'Internacional' },
  { id: 10, teamName: 'Minas Brasília' },
  { id: 11, teamName: 'Napoli-SC' },
  { id: 12, teamName: 'Palmeiras' },
  { id: 13, teamName: 'Real Brasília' },
  { id: 14, teamName: 'Santos' },
  { id: 15, teamName: 'São José-SP' },
  { id: 16, teamName: 'São Paulo' },
];


describe('Testa a model Teams', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('Find All', async () => {
    sinon.stub(Teams, 'findAll').resolves(teams as Teams[]);

    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body).to.be.deep.equal(teams);
    expect(chaiHttpResponse.status).to.be.deep.equal(200);

  });

  it('Find One', async () => {
    sinon.stub(Teams, 'findOne').resolves(teams[0] as Teams);

    chaiHttpResponse = await chai.request(app).get('/teams');

    expect(chaiHttpResponse.body[0]).to.be.deep.equal(teams[0]);
    expect(chaiHttpResponse.status).to.be.equal(200);

  });

});
