
/** A simple trie */ 
class TrieNode {
  value: string
  children: Map<string, TrieNode>
  isWord: boolean  // marks end of a word
  
  constructor(value: string) {
    this.value = value;
    this.children = new Map<string, TrieNode>();
    this.isWord = false;
  }

  insert(word: string) {
    let node: TrieNode = this;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode(ch));
      }
      node = node.children.get(ch);
    }
    node.isWord = true;
  }

  /// return false if word is not exist
  lazyDelete(word: string) : boolean {
    let node = this.find(word);
    if (!node) {
      return false;
    }
    node.isWord = false;
    return true;
  }

  eagerlyDelete(word: string) : boolean {
    let node = this.find(word);
    if (!node) {
      return false;
    } 
    if (node.isWord == false) {
      return false;
    }
    node.isWord = false;  // for now, same as lazy delete

    let stack : Array<TrieNode> = [this];
    while (stack.length) {
      let node = stack.pop();
      if (node.isWord == false && node.children.size == 0) {
        if (stack.length >= 1 && stack[-1]) {
          if (stack[-1].children.has(node.value)) {
            stack[-1].children.delete(node.value);
          } else {
            break;
          }
        }
      }
    }
    
    return true;
  }

  find(prefix: string) : TrieNode {
    let node: TrieNode = this;
    for (const ch of prefix) {
      if (!node.children.has(ch)) {
        return null;
      }
      node = node.children.get(ch);
    }
    return node;
  }
  
  // 手工测试了几个case，都正确
  wordsOfPrefix(prefix: string) : Array<string> {
    function _wordsOfPrefix(node: TrieNode, word: string, result: Array<string>) {
      if (!node) {
        return;
      }
      if (node.isWord) {
        result.push(word);
      }
      node.children.forEach((childNode, ch) => {
        word += ch;
        _wordsOfPrefix(childNode, word, result);
        word = word.slice(0, -1);
      })
    }

    let node = this.find(prefix);
    let result = [];
    _wordsOfPrefix(node, prefix, result);
    return result;
  }
}


export default TrieNode;

