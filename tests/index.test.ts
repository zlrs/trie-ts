import TrieNode from '../src/index'
const fs = require('fs');
const readline = require('readline');

// import jest from 'jest'

async function wordsOfFile(filename: string) : Promise<string[]> {
  let result : Array<string> = [];

  const readInterface = readline.createInterface({
    input: fs.createReadStream(filename),
    output: null,
    terminal: false
  });

  for await (const line of readInterface) {
    result.push(line);
  }
  return result;
}

const main = async () => {
  const words = await wordsOfFile('COCA_17640_unique.txt');
  
  let trie = new TrieNode('');
  
  for (const word of words) {
    trie.insert(word);
  }
  // trie.insert('he');
  // trie.insert('here');
  console.log(words.length);
  let anPrefixResult = trie.wordsOfPrefix('an');
  console.log(anPrefixResult.length);

  let bugPrefixResult = trie.wordsOfPrefix('bug');
  console.log(bugPrefixResult.length);
  // console.log(trie.wordsOfPrefix('h'));
  // console.log(trie.wordsOfPrefix('he'));
  // console.log(trie.wordsOfPrefix('her'));
  // console.log(trie.wordsOfPrefix('here'));
  
  // console.log(trie.children);
  // console.log(trie.children.get('h'));
  // console.log(trie.children.get('h'));

};

main();