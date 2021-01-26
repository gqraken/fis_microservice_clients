import React from 'react';
import ClientApi from './ClientApi';
import '../../../server';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      errorInfo: null,
      clients: [client],
      client: {username, password, firstName, lastName, address, email, phone}
      
    };
    this.selectClients = this.selectClients.bind(this);
    this.createClient = this.createClient.bind(this);
    this.editClient = this.editClient.bind(this);
    this.removeClient = this.removeClient.bind(this);
  }

  componentDidMount() {
    ClientApi.getAllClients()
      .then(
        (result) => {
          this.setState({
            clients: result
          })
        },
        (error) => {
          this.setState({
            errorInfo: "Problem while trying to connect to server"
          })
        }
      )
  }
  //leer los clientes
  selectClients() {
    ClientApi.getAllClients() = result;
    this.setState({clients : result});
  }
  //añadir un cliente
  createClient(client) {
    ClientApi.postClient(client);
    this.setState({clients : result});
  }
  //modificar un cliente
  editClient(client) {
    ClientApi.putClient(client);
    this.setState({clients : result});
  }
  //eliminar un cliente
  removeClient(client) {
    ClientApi.deleteClient(client);
    this.setState({clients : result});
  }
  render(){
  return (
  <div className="client">
    <header>
      <a href="/">Client</a>
    </header>
    <main>
      <div className= "content">
        <div className= "main">
          <form onSubmit={this.selectClients}>
            <label>
              Añadir un cliente :
              <input type="text" value={this.state.client.username} onChange={this.createClient}/>
              <input type="text" value={this.state.client.password} onChange={this.createClient}/>
              <input type="text" value={this.state.client.firstName} onChange={this.createClient}/>
              <input type="text" value={this.state.client.lastName} onChange={this.createClient}/>
              <input type="text" value={this.state.client.address} onChange={this.createClient}/>
              <input type="text" value={this.state.client.email} onChange={this.createClient}/>
              <input type="text" value={this.state.client.phone} onChange={this.createClient}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
          <form onSubmit={this.selectClients}>
            <label>
              Modificar un cliente :
              <input type="text" value={this.state.client.username} onChange={this.editClient}/>
              <input type="text" value={this.state.client.password} onChange={this.editClient}/>
              <input type="text" value={this.state.client.firstName} onChange={this.editClient}/>
              <input type="text" value={this.state.client.lastName} onChange={this.editClient}/>
              <input type="text" value={this.state.client.address} onChange={this.editClient}/>
              <input type="text" value={this.state.client.email} onChange={this.editClient}/>
              <input type="text" value={this.state.client.phone} onChange={this.editClient}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
          <form onSubmit={this.selectClients}>
            <label>
              Eliminar un cliente :
              <input type="text" value={this.state.client.username} onChange={this.removeClient}/>
              <input type="text" value={this.state.client.password} onChange={this.removeClient}/>
              <input type="text" value={this.state.client.firstName} onChange={this.removeClient}/>
              <input type="text" value={this.state.client.lastName} onChange={this.removeClient}/>
              <input type="text" value={this.state.client.address} onChange={this.removeClient}/>
              <input type="text" value={this.state.client.email} onChange={this.removeClient}/>
              <input type="text" value={this.state.client.phone} onChange={this.removeClient}/>
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </main>
  </div>);
  }
}

export default App;
