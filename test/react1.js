import chai from "chai"
import React from 'react'
import equalJSX from 'chai-equal-jsx'
import { createRenderer } from 'react-test-renderer/shallow';
import './reactComponent/reactComponent';
import './reactContainer/reactContainer';


chai.should()
chai.use(equalJSX)

// describe('Fake react test', function(){
//   it('works', function(){
//     const renderer = createRenderer()
//     renderer.render(React.createElement(Tetris))
//     const output = renderer.getRenderOutput()
//     output.should.equalJSX(<Board/>)
//   })
// })
