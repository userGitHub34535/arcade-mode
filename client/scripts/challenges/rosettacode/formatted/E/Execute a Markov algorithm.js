
/* eslint spaced-comment: 0 */
/* eslint no-redeclare: 0 */
/* eslint no-unused-vars: 0 */

const assert = require('chai').assert;

/// title: Execute a Markov algorithm
/// type: rosetta-code

/// categories:


/// difficulty: 4

/// description:
/// <div class="rosetta">
/// <br/><br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Task:</dt></dl>
/// <p class="rosetta__paragraph">Create an interpreter for a <a class="rosetta__link--wiki" href="https://en.wikipedia.org/wiki/Markov algorithm" title="wp: Markov algorithm">Markov Algorithm</a>.</p><br/><p class="rosetta__paragraph">Rules have the syntax:</p>
/// <p class="rosetta__paragraph"><ruleset> ::= ((<comment> | <rule>) <newline>+)*</p>
/// <p class="rosetta__paragraph"><comment> ::= # {<any character>}</p>
/// <p class="rosetta__paragraph"><rule> ::= <pattern> <whitespace> -> <whitespace> [.] <replacement></p>
/// <p class="rosetta__paragraph"><whitespace> ::= (<tab> | <space>) [<whitespace>]</p>
/// <p class="rosetta__paragraph">There is one rule per line.</p><br/><p class="rosetta__paragraph">If there is a  <b>.</b>  (period)  present before the  <span class="rosetta__text--bold"><replacement></span>,  then this is a terminating rule in which case the interpreter must halt execution.</p><br/><p class="rosetta__paragraph">A ruleset consists of a sequence of rules, with optional comments.</p>
/// <br/><p class="rosetta__paragraph"><big><big> Rulesets </big></big></p><br/><p class="rosetta__paragraph">Use the following tests on entries:</p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Ruleset 1:</dt></dl>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">This rules file is extracted from Wikipedia:</li>
/// <li class="rosetta__list-item--ordered">http://en.wikipedia.org/wiki/Markov_Algorithm</li></ol>A -> apple
/// B -> bag
/// S -> shop
/// T -> the
/// the shop -> my brother
/// a never used -> .terminating rule
/// </pre></div>
/// <p class="rosetta__paragraph">Sample text of:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code> I bought a B of As from T S. </code></span></p>
/// <p class="rosetta__paragraph">Should generate the output:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code> I bought a bag of apples from my brother. </code></span></p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Ruleset 2:</dt></dl>
/// <p class="rosetta__paragraph">A test of the terminating rule</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Slightly modified from the rules on Wikipedia</li></ol>A -> apple
/// B -> bag
/// S -> .shop
/// T -> the
/// the shop -> my brother
/// a never used -> .terminating rule</pre></div>
/// <p class="rosetta__paragraph">Sample text of:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code>I bought a B of As from T S.</code></span></p>
/// <p class="rosetta__paragraph">Should generate:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code>I bought a bag of apples from T shop.</code></span></p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Ruleset 3:</dt></dl>
/// <p class="rosetta__paragraph">This tests for correct substitution order and may trap simple regexp based replacement routines if special regexp characters are not escaped.</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">BNF Syntax testing rules</li></ol>A -> apple
/// WWWW -> with
/// Bgage -> ->.*
/// B -> bag
/// ->.* -> money
/// W -> WW
/// S -> .shop
/// T -> the
/// the shop -> my brother
/// a never used -> .terminating rule
/// </pre></div>
/// <p class="rosetta__paragraph">Sample text of:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code>I bought a B of As W my Bgage from T S.</code></span></p>
/// <p class="rosetta__paragraph">Should generate:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code>I bought a bag of apples with my money from T shop.</code></span></p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Ruleset 4:</dt></dl>
/// <p class="rosetta__paragraph">This tests for correct order of scanning of rules, and may trap replacement routines that scan in the wrong order.  It implements a general unary multiplication engine.  (Note that the input expression must be placed within underscores in this implementation.)</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">## Unary Multiplication Engine, for testing Markov Algorithm implementations</li>
/// <li class="rosetta__list-item--ordered">## By Donal Fellows.</li>
/// <li class="rosetta__list-item--ordered">Unary addition engine</li></ol>_+1 -> _1+
/// 1+1 -> 11+
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Pass for converting from the splitting of multiplication into ordinary</li>
/// <li class="rosetta__list-item--ordered">addition</li></ol>1! -> !1
/// ,! -> !+
/// _! -> _
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Unary multiplication by duplicating left side, right side times</li></ol>1*1 -> x,@y
/// 1x -> xX
/// X, -> 1,1
/// X1 -> 1X
/// _x -> _X
/// ,x -> ,X
/// y1 -> 1y
/// y_ -> _
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Next phase of applying</li></ol>1@1 -> x,@y
/// 1@_ -> @_
/// ,@_ -> !_
/// ++ -> +
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Termination cleanup for addition</li></ol>_1 -> 1
/// 1+_ -> 1
/// _+_ -> 
/// </pre></div>
/// <p class="rosetta__paragraph">Sample text of:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code> _1111*11111_ </code></span></p>
/// <p class="rosetta__paragraph">should generate the output:</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code> 11111111111111111111 </code></span></p>
/// <br/><dl class="rosetta__description-list"><dt class="rosetta__description-title">Ruleset 5:</dt></dl>
/// <p class="rosetta__paragraph">A simple <a class="rosetta__link--wiki" href="http://en.wikipedia.org/wiki/Turing_machine" title="link: http://en.wikipedia.org/wiki/Turing_machine">Turing machine</a>,</p>
/// <p class="rosetta__paragraph">implementing a three-state <a class="rosetta__link--wiki" href="http://en.wikipedia.org/wiki/Busy_beaver" title="link: http://en.wikipedia.org/wiki/Busy_beaver">busy beaver</a>.</p><br/><p class="rosetta__paragraph">The tape consists of <span class="rosetta__text--bold">0</span>s and <span class="rosetta__text--bold">1</span>s,  the states are <span class="rosetta__text--bold">A</span>, <span class="rosetta__text--bold">B</span>, <span class="rosetta__text--bold">C</span> and <span class="rosetta__text--bold">H</span> (for <span class="rosetta__text--bold">H</span>alt), and the head position is indicated by writing the state letter before the character where the head is.</p>
/// <p class="rosetta__paragraph">All parts of the initial tape the machine operates on have to be given in the input.</p><br/><p class="rosetta__paragraph">Besides demonstrating that the Markov algorithm is Turing-complete, it also made me catch a bug in the C++ implementation which wasn't caught by the first four rulesets.</p>
/// <div class="rosetta__pre-wrap"><pre class="rosetta__pre">
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">Turing machine: three-state busy beaver</li>
/// <li class="rosetta__list-item--ordered"># state A, symbol 0 => write 1, move right, new state B</li></ol>A0 -> 1B
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">state A, symbol 1 => write 1, move left, new state C</li></ol>0A1 -> C01
/// 1A1 -> C11
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">state B, symbol 0 => write 1, move left, new state A</li></ol>0B0 -> A01
/// 1B0 -> A11
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">state B, symbol 1 => write 1, move right, new state B</li></ol>B1 -> 1B
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">state C, symbol 0 => write 1, move left, new state B</li></ol>0C0 -> B01
/// 1C0 -> B11
/// <ol class="rosetta__ordered-list"><li class="rosetta__list-item--ordered">state C, symbol 1 => write 1, move left, halt</li></ol>0C1 -> H01
/// 1C1 -> H11
/// </pre></div>
/// <p class="rosetta__paragraph">This ruleset should turn</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code> 000000A000000 </code></span></p>
/// <p class="rosetta__paragraph">into</p>
/// <p class="rosetta__paragraph"><span class="rosetta__text--indented"> <code> 00011H1111000 </code></span></p>
/// <br><br><br/></div>

/// challengeSeed:
function markov (rules,test) {
  // Good luck!
}

/// solutions:
function markov(rules,test) {
    let pattern = new RegExp("^([^#]*?)\\s+->\\s+(\\.?)(.*)");
    let origTest = test;

    let captures = [];
    
    rules.forEach(function(rule){
		let m = pattern.exec(rule);
		for (let j = 0; j < m.length; j++)
		    m[j] = m[j + 1];
		captures.push(m);
    });

    test = origTest;
    let copy = test;
    for (let j = 0; j < captures.length; j++) {
        let c = captures[j];
        test = test.replace(c[0], c[2]);
        if (c[1]==".")
            break;
        if (test!=copy) {
            j = -1;
            copy = test;
        }
    }
    return test;
}

// tail:
let rules=[["A -> apple","B -> bag","S -> shop","T -> the","the shop -> my brother","a never used -> .terminating rule"],
			["A -> apple","B -> bag","S -> .shop","T -> the","the shop -> my brother","a never used -> .terminating rule"],
			["A -> apple","WWWW -> with","Bgage -> ->.*","B -> bag","->.* -> money","W -> WW","S -> .shop","T -> the","the shop -> my brother","a never used -> .terminating rule"],
			["_+1 -> _1+","1+1 -> 11+","1! -> !1",",! -> !+","_! -> _","1*1 -> x,@y","1x -> xX","X, -> 1,1","X1 -> 1X","_x -> _X",",x -> ,X","y1 -> 1y","y_ -> _","1@1 -> x,@y","1@_ -> @_",",@_ -> !_","++ -> +","_1 -> 1","1+_ -> 1","_+_ -> "],
			["A0 -> 1B","0A1 -> C01","1A1 -> C11","0B0 -> A01","1B0 -> A11","B1 -> 1B","0C0 -> B01","1C0 -> B11","0C1 -> H01","1C1 -> H11"]];
let tests=["I bought a B of As from T S.",
			"I bought a B of As from T S.",
			"I bought a B of As W my Bgage from T S.",
			"_1111*11111_",
			"000000A000000"];
let outputs=["I bought a bag of apples from my brother.",
			"I bought a bag of apples from T shop.",
			"I bought a bag of apples with my money from T shop.",
			"11111111111111111111",
			"00011H1111000"];
/// tests:
assert(typeof markov === 'function', 'message: <code>markov</code> is a function.');
assert.deepEqual(markov(rules[0],tests[0]),outputs[0],'message: <code>markov(["A -> apple","B -> bag","S -> shop","T -> the","the shop -> my brother","a never used -> .terminating rule"],"I bought a B of As from T S.")</code> should return "I bought a bag of apples from my brother.".');
assert.deepEqual(markov(rules[1],tests[1]),outputs[1],'message: <code>markov(["A -> apple","B -> bag","S -> .shop","T -> the","the shop -> my brother","a never used -> .terminating rule"],"I bought a B of As from T S.")</code> should return "I bought a bag of apples from T shop.".');
assert.deepEqual(markov(rules[2],tests[2]),outputs[2],'message: <code>markov(["A -> apple","WWWW -> with","Bgage -> ->.*","B -> bag","->.* -> money","W -> WW","S -> .shop","T -> the","the shop -> my brother","a never used -> .terminating rule"],"I bought a B of As W my Bgage from T S.")</code> should return "I bought a bag of apples with my money from T shop.".');
assert.deepEqual(markov(rules[3],tests[3]),outputs[3],'message: <code>markov(["_+1 -> _1+","1+1 -> 11+","1! -> !1",",! -> !+","_! -> _","1*1 -> x,@y","1x -> xX","X, -> 1,1","X1 -> 1X","_x -> _X",",x -> ,X","y1 -> 1y","y_ -> _","1@1 -> x,@y","1@_ -> @_",",@_ -> !_","++ -> +","_1 -> 1","1+_ -> 1","_+_ -> "],"_1111*11111_")</code> should return "11111111111111111111".');
assert.deepEqual(markov(rules[4],tests[4]),outputs[4],'message: <code>markov(["A0 -> 1B","0A1 -> C01","1A1 -> C11","0B0 -> A01","1B0 -> A11","B1 -> 1B","0C0 -> B01","1C0 -> B11","0C1 -> H01","1C1 -> H11"],"")</code> should return "00011H1111000".');
/// id: 59e09e6d412c5939baa02d16
