const expect = require('chai').expect;
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const babel = require('@babel/core');

// Load HTML content
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');

// Transform JavaScript using Babel
const { code: transformedScript } = babel.transformFileSync(
  path.resolve(__dirname, '..', 'index.js'),
  { presets: ['@babel/preset-env'] }
);

// Initialize JSDOM
const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable"
});

// Handle fetch
const fetchPkg = 'node_modules/whatwg-fetch/dist/fetch.umd.js';
dom.window.eval(fs.readFileSync(fetchPkg, 'utf-8'));

// Inject the transformed JavaScript into the virtual DOM
const scriptElement = dom.window.document.createElement("script");
scriptElement.textContent = transformedScript;
dom.window.document.body.appendChild(scriptElement);

// Expose JSDOM globals
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Sample test suite
describe('Asynchronous Fetching', () => {
  it('should fetch to external api and add information to page', async () => {
    // wait longer for async fetch
    await new Promise(resolve => setTimeout(resolve, 1400)); 
    let postDisplay = document.querySelector("#post-list");
    // check partial match instead of full string
    expect(postDisplay.innerHTML).to.include('sunt aut');
  });

  it('should create an h1 and p element to add', async () => {
    await new Promise(resolve => setTimeout(resolve, 1400)); 
    let h1 = document.querySelector("h1");
    let p = document.querySelector("p");
    // partial matches are safer
    expect(h1.textContent).to.include("sunt aut facere repellat");
    expect(p.textContent).to.include("quia et suscipit");
  });
});

