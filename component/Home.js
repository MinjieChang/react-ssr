const React = require('react');
const Page = require('./Page')

const Home = () => {
  return (
    <div>
      <div>This is home222</div>
      <button onClick={() => {alert('666')}}>click</button>
      <Page></Page>
    </div>
  )
}

module.exports = Home