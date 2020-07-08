class App extends React.Component {
  state = {

  }

// INDEX GET ROUTE ==========
  componentDidMount = () => {
    axios.get('/notes').then(
      (response) => {
        this.setState({
          notes:response.data
        })
      }
    )
  }
// ==========================

// CREATE ROUTE =============
  createNote = (event) => {
    event.preventDefault();
    axios.post(
      '/notes',
      {
        date:this.state.newDate,
        title:this.state.newTitle,
        body:this.state.newBody
      }
    )
  }

  newTitle = (event) => {
    this.setState({
      newTitle:event.target.value
    })
  }

  newDate = (event) => {
    this.setState({
      newDate:event.target.value
    })
  }

  newBody = (event) => {
    this.setState({
      newBody:event.target.value
    })
  }
// ==========================

// UPDATE ROUTE =============
  updateNote = (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('id');
    axios.put(
      '/notes/' + id,
      {
        date:this.state.updateDate,
        title:this.state.updateTitle,
        body:this.state.updateBody
      }
    ).then(
      (response) => {
        this.setState({
          notes:response.data
        })
      }
    )
    console.log(this.state);
    console.log(event.target.getAttribute('id'));
  }

  updateTitle = (event) => {
    this.setState({
      updateTitle:event.target.value
    })
  }

  updateDate = (event) => {
    this.setState({
      updateDate:event.target.value
    })
  }

  updateBody = (event) => {
    this.setState({
      updateBody:event.target.value
    })
  }
// ==========================

// DELETE ROUTE =============
  deleteNote = (event) => {
    event.preventDefault();
    axios.delete('/notes/' + event.target.value).then(
      (response) => {
        console.log(response.data);
        this.setState({
          notes:response.data
        })
      }
    )
  }
// ==========================

  render = () => {
    return (
      <div className="container">
        <div className="header">
          <h1>Notes</h1>
          <button onClick={this.toggleShow}>Add</button>
        </div>
        <div className="main">
          <div className="nav">
            <form onSubmit={this.createNote}>
              <input onChange={this.newTitle} type="text" placeholder="Title"/>
              <input onChange={this.newDate} type="date"/>
              <textarea onChange={this.newBody}></textarea>
              <input className="button" type="submit"/>
            </form>
          </div>
          <div className="notes">
            <div className="title">
              <h3>Note Title</h3>
              <button onClick={this.updateNote}>Edit</button>
              <button onClick={this.deleteNote}>Delete</button>
            </div>
            <div className="body">
            </div>
          </div>
        </div>
        <div className="footer">
          <h3>Copywrite...</h3>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
);
