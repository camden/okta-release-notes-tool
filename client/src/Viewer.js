import React from 'react';

import config from './config.json';

export default class Viewer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      submissions: [],
      allContentString: ""
    }

    this.fetchSubmissions();
    this.fetchAllContent();
  }

  fetchSubmissions() {
    const url = config.baseUrl + '/submissions';
    // const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url, {
      method: 'GET'
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw err;
        });
      }
      return res.json();
    }).then((submissions) => {
      this.setState({
        submissions: submissions
      });
    }).catch((err) => {
      throw err;
    });
  }

  fetchAllContent() {
    const url = config.baseUrl + '/utils/getAllContent';
    // const url = 'https://jsonplaceholder.typicode.com/posts';
    fetch(url, {
      method: 'GET'
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => {
          throw err;
        });
      }
      return res.json();
    }).then((allContentString) => {
      this.setState({
        allContentString: allContentString
      });
    }).catch((err) => {
      throw err;
    });
  }

  getSubmissions() {
    const subs = this.state.submissions.map((sub) => {
      return (
        <li key={sub.id}>
          <div>Author: {sub.authorName}</div>
          <div>Category: {sub.category}</div>
          <pre>{sub.content}</pre>
        </li>
      );
    });

    return (
      <ul>
        {subs}
      </ul>
    )
  }

  getAllContent() {
    return (
      <div>
        <pre className="output">
          {this.state.allContentString}
        </pre>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.getAllContent()}
        <hr />
        {this.getSubmissions()}
      </div>
    );
  }

}
