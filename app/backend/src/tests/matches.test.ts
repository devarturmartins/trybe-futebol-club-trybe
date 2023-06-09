import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 3,
      homeTeamId: 4,
      homeTeamGoals: 3,
      awayTeamId: 11,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 4,
      homeTeamId: 3,
      homeTeamGoals: 0,
      awayTeamId: 2,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 5,
      homeTeamId: 7,
      homeTeamGoals: 1,
      awayTeamId: 10,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 6,
      homeTeamId: 5,
      homeTeamGoals: 1,
      awayTeamId: 13,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 7,
      homeTeamId: 12,
      homeTeamGoals: 2,
      awayTeamId: 6,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 8,
      homeTeamId: 15,
      homeTeamGoals: 0,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 9,
      homeTeamId: 1,
      homeTeamGoals: 0,
      awayTeamId: 12,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 10,
      homeTeamId: 2,
      homeTeamGoals: 0,
      awayTeamId: 9,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 11,
      homeTeamId: 13,
      homeTeamGoals: 1,
      awayTeamId: 3,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 12,
      homeTeamId: 6,
      homeTeamGoals: 0,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 13,
      homeTeamId: 8,
      homeTeamGoals: 2,
      awayTeamId: 5,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 14,
      homeTeamId: 14,
      homeTeamGoals: 2,
      awayTeamId: 16,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 15,
      homeTeamId: 10,
      homeTeamGoals: 0,
      awayTeamId: 15,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 16,
      homeTeamId: 11,
      homeTeamGoals: 0,
      awayTeamId: 7,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 17,
      homeTeamId: 1,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 18,
      homeTeamId: 12,
      homeTeamGoals: 4,
      awayTeamId: 5,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 19,
      homeTeamId: 11,
      homeTeamGoals: 2,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 20,
      homeTeamId: 7,
      homeTeamGoals: 0,
      awayTeamId: 9,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 21,
      homeTeamId: 6,
      homeTeamGoals: 3,
      awayTeamId: 13,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 22,
      homeTeamId: 4,
      homeTeamGoals: 3,
      awayTeamId: 3,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 23,
      homeTeamId: 15,
      homeTeamGoals: 2,
      awayTeamId: 16,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 24,
      homeTeamId: 10,
      homeTeamGoals: 2,
      awayTeamId: 14,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 25,
      homeTeamId: 2,
      homeTeamGoals: 0,
      awayTeamId: 6,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 26,
      homeTeamId: 13,
      homeTeamGoals: 1,
      awayTeamId: 1,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 27,
      homeTeamId: 5,
      homeTeamGoals: 1,
      awayTeamId: 15,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 28,
      homeTeamId: 16,
      homeTeamGoals: 3,
      awayTeamId: 7,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 29,
      homeTeamId: 9,
      homeTeamGoals: 0,
      awayTeamId: 4,
      awayTeamGoals: 4,
      inProgress: 0,
    },
    {
      id: 30,
      homeTeamId: 3,
      homeTeamGoals: 0,
      awayTeamId: 12,
      awayTeamGoals: 4,
      inProgress: 0,
    },
    {
      id: 31,
      homeTeamId: 8,
      homeTeamGoals: 2,
      awayTeamId: 10,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 32,
      homeTeamId: 14,
      homeTeamGoals: 5,
      awayTeamId: 11,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 33,
      homeTeamId: 1,
      homeTeamGoals: 1,
      awayTeamId: 16,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 34,
      homeTeamId: 9,
      homeTeamGoals: 3,
      awayTeamId: 6,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 35,
      homeTeamId: 10,
      homeTeamGoals: 1,
      awayTeamId: 5,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 36,
      homeTeamId: 2,
      homeTeamGoals: 0,
      awayTeamId: 7,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 37,
      homeTeamId: 15,
      homeTeamGoals: 0,
      awayTeamId: 13,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 38,
      homeTeamId: 14,
      homeTeamGoals: 2,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 39,
      homeTeamId: 3,
      homeTeamGoals: 2,
      awayTeamId: 11,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 40,
      homeTeamId: 12,
      homeTeamGoals: 4,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: 0,
    },
  ];

const matches = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    },
    {
      "id": 3,
      "homeTeamId": 4,
      "homeTeamGoals": 3,
      "awayTeamId": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Corinthians"
      },
      "awayTeam": {
        "teamName": "Napoli-SC"
      }
    },
    {
      "id": 4,
      "homeTeamId": 3,
      "homeTeamGoals": 0,
      "awayTeamId": 2,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Botafogo"
      },
      "awayTeam": {
        "teamName": "Bahia"
      }
    },
    {
      "id": 5,
      "homeTeamId": 7,
      "homeTeamGoals": 1,
      "awayTeamId": 10,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Flamengo"
      },
      "awayTeam": {
        "teamName": "Minas Brasília"
      }
    },
    {
      "id": 6,
      "homeTeamId": 5,
      "homeTeamGoals": 1,
      "awayTeamId": 13,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Cruzeiro"
      },
      "awayTeam": {
        "teamName": "Real Brasília"
      }
    },
    {
      "id": 7,
      "homeTeamId": 12,
      "homeTeamGoals": 2,
      "awayTeamId": 6,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Palmeiras"
      },
      "awayTeam": {
        "teamName": "Ferroviária"
      }
    },
    {
      "id": 8,
      "homeTeamId": 15,
      "homeTeamGoals": 0,
      "awayTeamId": 1,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São José-SP"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    },
    {
      "id": 9,
      "homeTeamId": 1,
      "homeTeamGoals": 0,
      "awayTeamId": 12,
      "awayTeamGoals": 3,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Avaí/Kindermann"
      },
      "awayTeam": {
        "teamName": "Palmeiras"
      }
    },
    {
      "id": 10,
      "homeTeamId": 2,
      "homeTeamGoals": 0,
      "awayTeamId": 9,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Bahia"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 11,
      "homeTeamId": 13,
      "homeTeamGoals": 1,
      "awayTeamId": 3,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Real Brasília"
      },
      "awayTeam": {
        "teamName": "Botafogo"
      }
    },
    {
      "id": 12,
      "homeTeamId": 6,
      "homeTeamGoals": 0,
      "awayTeamId": 4,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Corinthians"
      }
    },
    {
      "id": 13,
      "homeTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamId": 5,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Grêmio"
      },
      "awayTeam": {
        "teamName": "Cruzeiro"
      }
    },
    {
      "id": 14,
      "homeTeamId": 14,
      "homeTeamGoals": 2,
      "awayTeamId": 16,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Santos"
      },
      "awayTeam": {
        "teamName": "São Paulo"
      }
    },
    {
      "id": 15,
      "homeTeamId": 10,
      "homeTeamGoals": 0,
      "awayTeamId": 15,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Minas Brasília"
      },
      "awayTeam": {
        "teamName": "São José-SP"
      }
    },
    {
      "id": 16,
      "homeTeamId": 11,
      "homeTeamGoals": 0,
      "awayTeamId": 7,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Napoli-SC"
      },
      "awayTeam": {
        "teamName": "Flamengo"
      }
    },
    {
      "id": 17,
      "homeTeamId": 1,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 3,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Avaí/Kindermann"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 18,
      "homeTeamId": 12,
      "homeTeamGoals": 4,
      "awayTeamId": 5,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Palmeiras"
      },
      "awayTeam": {
        "teamName": "Cruzeiro"
      }
    },
    {
      "id": 19,
      "homeTeamId": 11,
      "homeTeamGoals": 2,
      "awayTeamId": 2,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Napoli-SC"
      },
      "awayTeam": {
        "teamName": "Bahia"
      }
    },
    {
      "id": 20,
      "homeTeamId": 7,
      "homeTeamGoals": 0,
      "awayTeamId": 9,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Flamengo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 21,
      "homeTeamId": 6,
      "homeTeamGoals": 3,
      "awayTeamId": 13,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Real Brasília"
      }
    },
    {
      "id": 22,
      "homeTeamId": 4,
      "homeTeamGoals": 3,
      "awayTeamId": 3,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Corinthians"
      },
      "awayTeam": {
        "teamName": "Botafogo"
      }
    },
    {
      "id": 23,
      "homeTeamId": 15,
      "homeTeamGoals": 2,
      "awayTeamId": 16,
      "awayTeamGoals": 3,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São José-SP"
      },
      "awayTeam": {
        "teamName": "São Paulo"
      }
    },
    {
      "id": 24,
      "homeTeamId": 10,
      "homeTeamGoals": 2,
      "awayTeamId": 14,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Minas Brasília"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    },
    {
      "id": 25,
      "homeTeamId": 2,
      "homeTeamGoals": 0,
      "awayTeamId": 6,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Bahia"
      },
      "awayTeam": {
        "teamName": "Ferroviária"
      }
    },
    {
      "id": 26,
      "homeTeamId": 13,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Real Brasília"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    },
    {
      "id": 27,
      "homeTeamId": 5,
      "homeTeamGoals": 1,
      "awayTeamId": 15,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Cruzeiro"
      },
      "awayTeam": {
        "teamName": "São José-SP"
      }
    },
    {
      "id": 28,
      "homeTeamId": 16,
      "homeTeamGoals": 3,
      "awayTeamId": 7,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Flamengo"
      }
    },
    {
      "id": 29,
      "homeTeamId": 9,
      "homeTeamGoals": 0,
      "awayTeamId": 4,
      "awayTeamGoals": 4,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Corinthians"
      }
    },
    {
      "id": 30,
      "homeTeamId": 3,
      "homeTeamGoals": 0,
      "awayTeamId": 12,
      "awayTeamGoals": 4,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Botafogo"
      },
      "awayTeam": {
        "teamName": "Palmeiras"
      }
    },
    {
      "id": 31,
      "homeTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamId": 10,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Grêmio"
      },
      "awayTeam": {
        "teamName": "Minas Brasília"
      }
    },
    {
      "id": 32,
      "homeTeamId": 14,
      "homeTeamGoals": 5,
      "awayTeamId": 11,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Santos"
      },
      "awayTeam": {
        "teamName": "Napoli-SC"
      }
    },
    {
      "id": 33,
      "homeTeamId": 1,
      "homeTeamGoals": 1,
      "awayTeamId": 16,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Avaí/Kindermann"
      },
      "awayTeam": {
        "teamName": "São Paulo"
      }
    },
    {
      "id": 34,
      "homeTeamId": 9,
      "homeTeamGoals": 3,
      "awayTeamId": 6,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Ferroviária"
      }
    },
    {
      "id": 35,
      "homeTeamId": 10,
      "homeTeamGoals": 1,
      "awayTeamId": 5,
      "awayTeamGoals": 3,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Minas Brasília"
      },
      "awayTeam": {
        "teamName": "Cruzeiro"
      }
    },
    {
      "id": 36,
      "homeTeamId": 2,
      "homeTeamGoals": 0,
      "awayTeamId": 7,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Bahia"
      },
      "awayTeam": {
        "teamName": "Flamengo"
      }
    },
    {
      "id": 37,
      "homeTeamId": 15,
      "homeTeamGoals": 0,
      "awayTeamId": 13,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São José-SP"
      },
      "awayTeam": {
        "teamName": "Real Brasília"
      }
    },
    {
      "id": 38,
      "homeTeamId": 14,
      "homeTeamGoals": 2,
      "awayTeamId": 4,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Santos"
      },
      "awayTeam": {
        "teamName": "Corinthians"
      }
    },
    {
      "id": 39,
      "homeTeamId": 3,
      "homeTeamGoals": 2,
      "awayTeamId": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Botafogo"
      },
      "awayTeam": {
        "teamName": "Napoli-SC"
      }
    },
    {
      "id": 40,
      "homeTeamId": 12,
      "homeTeamGoals": 4,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Palmeiras"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 41,
      "homeTeamId": 16,
      "homeTeamGoals": 2,
      "awayTeamId": 9,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 42,
      "homeTeamId": 6,
      "homeTeamGoals": 1,
      "awayTeamId": 1,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    },
    {
      "id": 43,
      "homeTeamId": 11,
      "homeTeamGoals": 0,
      "awayTeamId": 10,
      "awayTeamGoals": 0,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Napoli-SC"
      },
      "awayTeam": {
        "teamName": "Minas Brasília"
      }
    },
    {
      "id": 44,
      "homeTeamId": 7,
      "homeTeamGoals": 2,
      "awayTeamId": 15,
      "awayTeamGoals": 2,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Flamengo"
      },
      "awayTeam": {
        "teamName": "São José-SP"
      }
    },
    {
      "id": 45,
      "homeTeamId": 5,
      "homeTeamGoals": 1,
      "awayTeamId": 3,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Cruzeiro"
      },
      "awayTeam": {
        "teamName": "Botafogo"
      }
    },
    {
      "id": 46,
      "homeTeamId": 4,
      "homeTeamGoals": 1,
      "awayTeamId": 12,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Corinthians"
      },
      "awayTeam": {
        "teamName": "Palmeiras"
      }
    },
    {
      "id": 47,
      "homeTeamId": 8,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 2,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Grêmio"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    },
    {
      "id": 48,
      "homeTeamId": 13,
      "homeTeamGoals": 1,
      "awayTeamId": 2,
      "awayTeamGoals": 1,
      "inProgress": true,
      "homeTeam": {
        "teamName": "Real Brasília"
      },
      "awayTeam": {
        "teamName": "Bahia"
      }
    }
  ]


describe('Testa a model Matches', () => {

  let chaiHttpResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  it('Find All', async () => {
    sinon.stub(Matches, 'findAll').resolves(matchesMock as any);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body).to.be.deep.equal(matchesMock);
    expect(chaiHttpResponse.status).to.be.deep.equal(200);

  });

  it('Find One', async () => {
    sinon.stub(Matches, 'findOne').resolves(matchesMock[0] as any);

    chaiHttpResponse = await chai.request(app).get('/matches');

    expect(chaiHttpResponse.body[0]).to.be.deep.equal(matches[0]);
    expect(chaiHttpResponse.status).to.be.equal(200);

  });

  it('finishes a match', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(Matches, 'findByPk').resolves({ ...matches[45], update: sinon.stub() } as any);

    chaiHttpResponse = await chai.request(app).patch('/matches/45/finish').set('Authorization', login.body.token);

    expect(chaiHttpResponse.status).to.be.equal(200);

  });

  it('finishes a match invalid', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(Matches, 'findByPk').resolves({ ...matches[1], update: sinon.stub() } as any);

    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish').set('Authorization', login.body.token);
    console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.status).to.be.equal(500);

  });

  it('att a match', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(Matches, 'findByPk').resolves({ ...matches[46], update: sinon.stub() } as any);


    chaiHttpResponse = await chai.request(app).patch('/matches/46').send({
      homeTeamGoals: 15,
      awayTeamGoals: 12,
    }).set('Authorization', login.body.token);

    expect(chaiHttpResponse.status).to.be.equal(200);

  });

  it('att a match invalid', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(Matches, 'findByPk').resolves({ ...matches[4], update: sinon.stub() } as any);


    chaiHttpResponse = await chai.request(app).patch('/matches/4').send({
      homeTeamGoals: 15,
      awayTeamGoals: 12,
    }).set('Authorization', login.body.token);

    expect(chaiHttpResponse.status).to.be.equal(500);

  });

  it('create a match', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });

    sinon.stub(Matches, 'create').resolves({
      homeTeamId: 5,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
    } as any);


    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
      update: sinon.stub()
    }).set('Authorization', login.body.token);
    expect(chaiHttpResponse.status).to.be.equal(201);

  });

  it('token invalid', async () => {

    sinon.stub(Matches, 'create').resolves({
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
    } as any);


    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 3,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
      update: sinon.stub()
    });
    console.log(chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Token not found' });

  });

  it('create a match invalid because idHome = idAway', async () => {
    const login = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });

    sinon.stub(Matches, 'create').resolves({
      homeTeamId: 2,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
    } as any);


    chaiHttpResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 2,
      awayTeamId: 2,
      homeTeamGoals: 20,
      awayTeamGoals: 20,
      update: sinon.stub()
    }).set('Authorization', login.body.token);

    expect(chaiHttpResponse.status).to.be.equal(422);
    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });

  });

});
