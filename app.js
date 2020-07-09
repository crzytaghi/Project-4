class App extends React.Component {
  state = {
    show: true,
    notes: []
  }

  toggleShow = () => {
    this.setState({
      show:!this.state.show
    })
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
    // event.preventDefault();
    axios.post(
      '/notes',
      {
        date:this.state.newDate,
        title:this.state.newTitle,
        body:this.state.newBody
      }
    ).then(
      (response) => {
        this.setState({
          notes:response.data
        })
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

// DELETE ROUTE =============
  deleteNote = (event) => {
    // event.preventDefault();
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
    const { note } = this.props
    return (
      <div className="container">
        <div className="header">
          <h1>Notes</h1>
          <button onClick={this.toggleShow}>Add</button>
        </div>
        <div className="main">
          <div className="nav">
            {(this.state.show) ?
              <form onSubmit={this.createNote}>
                <input onChange={this.newTitle} type="text" placeholder="Title"/><br/>
                <input onChange={this.newDate} type="date"/><br/>
                <textarea onChange={this.newBody}></textarea><br/>
                <input className="button" type="submit"/>
              </form>
            : null}
          </div>
          <div className="notes">
              {this.state.notes.map((note,index) => {
                return(
                  <section key={index}>
                    <div className="title">
                      <h3>{note.title}</h3>
                      <h3>{note.date}</h3>
                    </div>
                    <div className="body">
                      <p>{note.body}</p>
                    </div>
                    <button value={note.id} onClick={this.deleteNote}>Delete</button>
                    <Update index={note}></Update>
                  </section>
                )
              })}
          </div>
        </div>
        <div className="footer">
          <h3>Copywrite...</h3>
        </div>
      </div>
    )
  }
}

class Update extends React.Component {
  state = {
    show:false
  }

  toggleShow = () => {
    this.setState({
      show:!this.state.show
    })
  }

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

  render = () => {
    const { index } = this.props
    return(
      <div>
        <button onClick={this.toggleShow}>Edit</button>
        {(this.state.show) ?
          <form id={index.id} onSubmit={this.updateNote}>
            <input onChange={this.updateTitle} type="text" value={index.title}/>
            <input onChange={this.updateDate} type="date" value={index.date}/>
            <textarea onChange={this.updateBody} defaultValue={index.body}></textarea>
            <input className="button" type="submit"/>
          </form>
        : null}
      </div>
    )
  }
}

ReactDOM.render(
  <App></App>,
  document.querySelector('main')
);
