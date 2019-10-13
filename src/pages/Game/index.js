
import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Icon, PageHeader, Typography, Button } from 'antd';
import { NavLink } from 'react-router-dom';
import { GameArea, PlayersHand, CardsRemaining } from './components';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


let cards = [
  {
    suit: { 
        character: '\u2663'
    },
    cardRank: {
      name: '2',
      character: '2',
      value: 2
    }
  },
  {
    suit: { 
        character: '\u2666',
    },
    cardRank: {
      name: '3',
      character: '3',
      value: 3
    }
  },
  {
    suit: {
        character: '\u2665'
    },
    cardRank: {
      name: '4',
      character: '4',
      value: 4
    }
  },
  {
    suit:{
    character: '\u2660'
    },
    cardRank: {
      name: '5',
      character: '5',
      value: 5
    }
  },
  {
    suit: { 
        character: '\u2663'
    },
    cardRank: {
      name: '2',
      character: '2',
      value: 2
    }
  },
  {
    suit: { 
        character: '\u2666',
    },
    cardRank: {
      name: '3',
      character: '3',
      value: 3
    }
  },
  {
    suit: {
        character: '\u2665'
    },
    cardRank: {
      name: '4',
      character: '4',
      value: 4
    }
  },
  {
    suit:{
    character: '\u2660'
    },
    cardRank: {
      name: '5',
      character: '5',
      value: 5
    }
  },
  {
    suit: { 
        character: '\u2663'
    },
    cardRank: {
      name: '2',
      character: '2',
      value: 2
    }
  },
  {
    suit: { 
        character: '\u2666',
    },
    cardRank: {
      name: '3',
      character: '3',
      value: 3
    }
  },
  {
    suit: {
        character: '\u2665'
    },
    cardRank: {
      name: '4',
      character: '4',
      value: 4
    }
  },
  {
    suit:{
    character: '\u2660'
    },
    cardRank: {
      name: '5',
      character: '5',
      value: 5
    }
  },
  {
    suit: { 
        character: '\u2663'
    },
    cardRank: {
      name: '2',
      character: '2',
      value: 2
    }
  },
  {
    suit: { 
        character: '\u2666',
    },
    cardRank: {
      name: '3',
      character: '3',
      value: 3
    }
  },
  {
    suit: {
        character: '\u2665'
    },
    cardRank: {
      name: '4',
      character: '4',
      value: 4
    }
  },
  {
    suit:{
    character: '\u2660'
    },
    cardRank: {
      name: '5',
      character: '5',
      value: 5
    }
  }
]

let cardsRemaining = [
  {
    "_id": "5da126acffbd1930d5f92bf4",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd4",
        "name": "Jack",
        "character": "J",
        "value": 11,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "JHearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf0",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcc",
        "name": "3",
        "character": "3",
        "value": 3,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "3Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bfe",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcb",
        "name": "2",
        "character": "2",
        "value": 2,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "2Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf1",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcb",
        "name": "2",
        "character": "2",
        "value": 2,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "2Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf5",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd1",
        "name": "8",
        "character": "8",
        "value": 8,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "8Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf6",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd0",
        "name": "7",
        "character": "7",
        "value": 7,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "7Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf9",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bce",
        "name": "5",
        "character": "5",
        "value": 5,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "5Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf2",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcd",
        "name": "4",
        "character": "4",
        "value": 4,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "4Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bfa",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd3",
        "name": "10",
        "character": "10",
        "value": 10,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "10Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf3",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcf",
        "name": "6",
        "character": "6",
        "value": 6,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "6Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf7",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd2",
        "name": "9",
        "character": "9",
        "value": 9,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "9Hearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bf8",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd5",
        "name": "Queen",
        "character": "Q",
        "value": 12,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "QHearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bfc",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd7",
        "name": "Ace",
        "character": "A",
        "value": 14,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "AHearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bff",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcd",
        "name": "4",
        "character": "4",
        "value": 4,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "4Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bfb",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd6",
        "name": "King",
        "character": "K",
        "value": 13,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bda",
        "name": "Hearts",
        "color": "Red",
        "character": "♥",
        "value": 2,
        "__v": 0
    },
    "shortHand": "KHearts",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c03",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd0",
        "name": "7",
        "character": "7",
        "value": 7,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "7Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c01",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd4",
        "name": "Jack",
        "character": "J",
        "value": 11,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "JSpades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c07",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd3",
        "name": "10",
        "character": "10",
        "value": 10,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "10Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c04",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd2",
        "name": "9",
        "character": "9",
        "value": 9,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "9Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c00",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcf",
        "name": "6",
        "character": "6",
        "value": 6,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "6Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c02",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd1",
        "name": "8",
        "character": "8",
        "value": 8,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "8Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92bfd",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcc",
        "name": "3",
        "character": "3",
        "value": 3,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "3Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c0d",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcf",
        "name": "6",
        "character": "6",
        "value": 6,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "6Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c12",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd5",
        "name": "Queen",
        "character": "Q",
        "value": 12,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "QDiamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c0b",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcb",
        "name": "2",
        "character": "2",
        "value": 2,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "2Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c0a",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcc",
        "name": "3",
        "character": "3",
        "value": 3,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "3Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c08",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd6",
        "name": "King",
        "character": "K",
        "value": 13,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "KSpades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c0e",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd4",
        "name": "Jack",
        "character": "J",
        "value": 11,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "JDiamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c05",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd5",
        "name": "Queen",
        "character": "Q",
        "value": 12,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "QSpades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c06",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bce",
        "name": "5",
        "character": "5",
        "value": 5,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "5Spades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c1c",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd1",
        "name": "8",
        "character": "8",
        "value": 8,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "8Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c17",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcc",
        "name": "3",
        "character": "3",
        "value": 3,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "3Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c21",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd3",
        "name": "10",
        "character": "10",
        "value": 10,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "10Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c09",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd7",
        "name": "Ace",
        "character": "A",
        "value": 14,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bdb",
        "name": "Spades",
        "color": "Black",
        "character": "♠",
        "value": 3,
        "__v": 0
    },
    "shortHand": "ASpades",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c0f",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd1",
        "name": "8",
        "character": "8",
        "value": 8,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "8Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c16",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd7",
        "name": "Ace",
        "character": "A",
        "value": 14,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "ADiamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c19",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcd",
        "name": "4",
        "character": "4",
        "value": 4,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "4Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c0c",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcd",
        "name": "4",
        "character": "4",
        "value": 4,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "4Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c10",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd0",
        "name": "7",
        "character": "7",
        "value": 7,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "7Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c1b",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd4",
        "name": "Jack",
        "character": "J",
        "value": 11,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "JClubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c23",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd7",
        "name": "Ace",
        "character": "A",
        "value": 14,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "AClubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c15",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd6",
        "name": "King",
        "character": "K",
        "value": 13,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "KDiamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c11",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd2",
        "name": "9",
        "character": "9",
        "value": 9,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "9Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c14",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd3",
        "name": "10",
        "character": "10",
        "value": 10,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "10Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c13",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bce",
        "name": "5",
        "character": "5",
        "value": 5,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd9",
        "name": "Diamonds",
        "color": "Red",
        "character": "♦",
        "value": 1,
        "__v": 0
    },
    "shortHand": "5Diamonds",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c1d",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd0",
        "name": "7",
        "character": "7",
        "value": 7,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "7Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c20",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bce",
        "name": "5",
        "character": "5",
        "value": 5,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "5Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c22",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd6",
        "name": "King",
        "character": "K",
        "value": 13,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "KClubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c1f",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd5",
        "name": "Queen",
        "character": "Q",
        "value": 12,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "QClubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c1e",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bd2",
        "name": "9",
        "character": "9",
        "value": 9,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "9Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c18",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcb",
        "name": "2",
        "character": "2",
        "value": 2,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "2Clubs",
    "__v": 0
},
{
    "_id": "5da126acffbd1930d5f92c1a",
    "cardRank": {
        "_id": "5da126abffbd1930d5f92bcf",
        "name": "6",
        "character": "6",
        "value": 6,
        "__v": 0
    },
    "suit": {
        "_id": "5da126abffbd1930d5f92bd8",
        "name": "Clubs",
        "color": "Black",
        "character": "♣",
        "value": 0,
        "__v": 0
    },
    "shortHand": "6Clubs",
    "__v": 0
}
]


export default class Game extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="0">
          <Icon type="dashboard" />
              <span>
                <NavLink
                  key={`/dashboard`}
                  to={`/dashboard`}
                >
                Home
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="1">
              <Icon type="play-circle" />
              <span>
                <NavLink
                  key={`/game`}
                  to={`/game`}
                >
                  Game Name
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="plus-circle" />
              <span>
                <NavLink
                    key={`/create-game`}
                    to={`/create-game`}
                >
                  New
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="message" />
              <span>
                <NavLink
                    key={`/inbox`}
                    to={`/inbox`}
                >
                  Inbox
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="12">
              <Icon type="team" />
              <span>
                <NavLink
                  key={`/friends`}
                  to={`/friends`}
                >
                  Friends
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="13">
              <Icon type="search" />
              <span>
                <NavLink
                  key={`/search`}
                  to={`/search`}
                >
                  Search
                </NavLink>
              </span>
            </Menu.Item>
          
            <Menu.Item key="9">
              <Icon type="profile" />
              <span>
                <NavLink
                  key={`/profile`}
                  to={`/profile`}>
                    Profile
                </NavLink>
              </span>
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout>

          <PageHeader onBack={() => null} title="Presidents" />

          <Content style={{ margin: '0 16px' }}>

            <div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff', minHeight: 180 }}>
            
              <Typography.Title level={4}>Your Hand</Typography.Title>
              <PlayersHand cards={cards}/>
              <Button type='danger'>Play Cards</Button>


              <div style={{ minHeight: 10 }} />

              <Typography.Title level={4}>Cards Remaining</Typography.Title>
              <CardsRemaining cards={cardsRemaining}/>
              
            </div>

            <div style={{ padding: 24, marginTop: 10, marginBottom: 10, background: '#fff'}}>
            
              <GameArea />
            </div>

          </Content>

        </Layout>
      </Layout>
    );
  }
}
          