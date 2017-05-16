
'use strict';

import React from 'react';
import { mount } from 'enzyme';

import chaiEnzyme from 'chai-enzyme';
import chai, { expect } from 'chai';

import CodeMirror from 'react-codemirror';

import Editor from '../../../../../client/scripts/arcademode/components/Editor';

chai.use(chaiEnzyme());

let editorCode = '';
const props = {
  onCodeChange: code => { editorCode = code; }
};

describe('<Editor />', () => {
  it('Contains one CodeMirror element', () => {
    const wrapper = mount(<Editor {...props} />);
    expect(wrapper.find(CodeMirror)).to.have.length(1);
  });
  it('Changes the code inside it', () => {
    const wrapper = mount(<Editor {...props} />);
    wrapper.props().onCodeChange('// Test');
    expect(editorCode).to.equal('// Test');
  });
});